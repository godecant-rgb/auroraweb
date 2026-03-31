import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ProductImage,
  ProductVariant,
  ProductWithRelations,
  Category,
} from "@/types/product";

export type CatalogProductItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  total_stock: number;
  image_url: string | null;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories:
    | {
        id: string;
        name: string;
        slug: string;
        created_at: string;
      }
    | {
        id: string;
        name: string;
        slug: string;
        created_at: string;
      }[]
    | null;
  product_images: ProductImage[] | null;
  product_variants: ProductVariant[] | null;
};

type CatalogRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  categories:
    | {
        name: string;
        slug: string;
      }
    | {
        name: string;
        slug: string;
      }[]
    | null;
  product_images:
    | {
        image_url: string;
        sort_order: number;
      }[]
    | null;
  product_variants:
    | {
        stock: number;
        is_active: boolean;
      }[]
    | null;
};

function normalizeCategory(
  category: ProductRow["categories"],
): Category | null {
  if (!category) return null;
  if (Array.isArray(category)) return category[0] ?? null;
  return category;
}

function normalizeCatalogCategory(category: CatalogRow["categories"]) {
  if (!category) return { name: null, slug: null };

  if (Array.isArray(category)) {
    return {
      name: category[0]?.name ?? null,
      slug: category[0]?.slug ?? null,
    };
  }

  return {
    name: category.name ?? null,
    slug: category.slug ?? null,
  };
}

export async function getCatalogProducts(): Promise<CatalogProductItem[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      category_id,
      is_active,
      is_featured,
      is_new,
      created_at,
      categories (
        name,
        slug
      ),
      product_images (
        image_url,
        sort_order
      ),
      product_variants (
        stock,
        is_active
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener catálogo: ${error.message}`);
  }

  return ((data ?? []) as CatalogRow[])
    .map((product) => {
      const totalStock = (product.product_variants ?? [])
        .filter((variant) => variant.is_active)
        .reduce((acc, variant) => acc + (variant.stock ?? 0), 0);

      const sortedImages = [...(product.product_images ?? [])].sort(
        (a, b) => a.sort_order - b.sort_order,
      );

      const category = normalizeCatalogCategory(product.categories);

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        category_name: category.name,
        category_slug: category.slug,
        is_active: product.is_active,
        is_featured: product.is_featured,
        is_new: product.is_new,
        created_at: product.created_at,
        total_stock: totalStock,
        image_url: sortedImages[0]?.image_url ?? null,
      };
    })
    .filter((product) => product.total_stock > 0);
}

export async function getFeaturedProducts(
  limit = 4,
): Promise<CatalogProductItem[]> {
  const products = await getCatalogProducts();
  const featured = products.filter((product) => product.is_featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithRelations | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      category_id,
      is_active,
      created_at,
      updated_at,
      categories (
        id,
        name,
        slug,
        created_at
      ),
      product_images (
        id,
        product_id,
        image_url,
        sort_order,
        created_at
      ),
      product_variants (
        id,
        product_id,
        color,
        size,
        stock,
        sku,
        is_active,
        created_at,
        updated_at
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Error al obtener producto: ${error.message}`);
  }

  const row = data as ProductRow;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    category_id: row.category_id,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
    category: normalizeCategory(row.categories),
    images: (row.product_images ?? []).sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
    variants: (row.product_variants ?? [])
      .filter((variant) => variant.is_active)
      .sort((a, b) => {
        if (a.color === b.color) return a.size.localeCompare(b.size);
        return a.color.localeCompare(b.color);
      }),
  };
}