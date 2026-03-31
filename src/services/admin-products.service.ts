import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminProducts() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      is_active,
      category_id,
      created_at,
      categories (
        id,
        name,
        slug
      ),
      product_variants (
        id,
        color,
        size,
        stock,
        is_active
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener productos: ${error.message}`);
  }

  return data ?? [];
}

export async function getAdminProductById(productId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      is_active,
      category_id,
      created_at,
      updated_at,
      product_variants (
        id,
        product_id,
        color,
        size,
        stock,
        is_active,
        created_at,
        updated_at
      )
    `)
    .eq("id", productId)
    .single();

  if (error) {
    throw new Error(`Error al obtener producto: ${error.message}`);
  }

  return data;
}

export async function getAdminCategories() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Error al obtener categorías: ${error.message}`);
  }

  return data ?? [];
}

type UpsertProductInput = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string | null;
  isActive: boolean;
};

export async function createAdminProduct(input: UpsertProductInput) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: input.name,
      slug: input.slug,
      description: input.description || null,
      price: input.price,
      category_id: input.categoryId,
      is_active: input.isActive,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Error al crear producto: ${error.message}`);
  }

  return data;
}

export async function updateAdminProduct(input: UpsertProductInput) {
  const supabase = getSupabaseAdminClient();

  if (!input.id) {
    throw new Error("Falta el id del producto.");
  }

  const { error } = await supabase
    .from("products")
    .update({
      name: input.name,
      slug: input.slug,
      description: input.description || null,
      price: input.price,
      category_id: input.categoryId,
      is_active: input.isActive,
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(`Error al actualizar producto: ${error.message}`);
  }
}

type VariantInput = {
  id?: string;
  productId: string;
  color: string;
  size: string;
  stock: number;
  isActive: boolean;
};

export async function createAdminVariant(input: VariantInput) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("product_variants")
    .insert({
      product_id: input.productId,
      color: input.color,
      size: input.size,
      stock: input.stock,
      is_active: input.isActive,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Error al crear variante: ${error.message}`);
  }

  return data;
}

export async function updateAdminVariant(input: VariantInput) {
  const supabase = getSupabaseAdminClient();

  if (!input.id) {
    throw new Error("Falta el id de la variante.");
  }

  const { error } = await supabase
    .from("product_variants")
    .update({
      color: input.color,
      size: input.size,
      stock: input.stock,
      is_active: input.isActive,
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(`Error al actualizar variante: ${error.message}`);
  }
}

export async function deleteAdminVariant(variantId: string) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", variantId);

  if (error) {
    throw new Error(`Error al eliminar variante: ${error.message}`);
  }
}