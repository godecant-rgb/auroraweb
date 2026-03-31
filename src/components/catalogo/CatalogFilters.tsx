"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/catalogo/ProductCard";
import type { CatalogProductItem } from "@/services/products.service";

type CatalogFiltersProps = {
  products: CatalogProductItem[];
};

export default function CatalogFilters({ products }: CatalogFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filterTag, setFilterTag] = useState("all");

  const categories = useMemo(() => {
    const unique = new Map<string, string>();

    for (const product of products) {
      if (product.category_slug && product.category_name) {
        unique.set(product.category_slug, product.category_name);
      }
    }

    return [...unique.entries()].map(([slug, name]) => ({ slug, name }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.description ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ? true : product.category_slug === category;

      const matchesTag =
        filterTag === "all"
          ? true
          : filterTag === "featured"
            ? product.is_featured
            : filterTag === "new"
              ? product.is_new
              : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [products, search, category, filterTag]);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#E7D8D7] bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="rounded-full border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
          >
            <option value="all">Todos</option>
            <option value="featured">Destacados</option>
            <option value="new">Nuevos</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center text-[#666666]">
          No encontramos productos con esos filtros.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}