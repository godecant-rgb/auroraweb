export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  color: string;
  size: string;
  stock: number;
  sku: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductCatalogItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  is_active: boolean;
  created_at: string;
  total_stock: number;
};

export type ProductWithRelations = Product & {
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
};
