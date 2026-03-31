import Link from "next/link";
import { formatCurrencyUYU } from "@/lib/format";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    category_name?: string | null;
    image_url?: string | null;
    is_featured?: boolean;
    is_new?: boolean;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-[#E9DBDC] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(0,0,0,0.10)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F3F2]">
        {(product.is_new || product.is_featured) && (
          <div className="absolute left-3 top-3 z-10 flex gap-2">
            {product.is_new && (
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#B67F7F] shadow-sm">
                Nuevo
              </span>
            )}
            {product.is_featured && (
              <span className="rounded-full bg-[#1F1F1F] px-3 py-1 text-xs font-medium text-white shadow-sm">
                Destacado
              </span>
            )}
          </div>
        )}

        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#8B7E7E]">
            Sin imagen
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/18 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="space-y-2 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[#C8949D]">
          {product.category_name ?? "Aurora"}
        </p>

        <h3 className="text-lg font-medium text-[#1F1F1F]">{product.name}</h3>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-semibold text-[#1F1F1F]">
            {formatCurrencyUYU(product.price)}
          </p>

          <span className="rounded-full bg-[#F5E3E6] px-3 py-1 text-xs font-medium text-[#B67F7F] transition group-hover:bg-[#EACFD4]">
            Ver más
          </span>
        </div>
      </div>
    </Link>
  );
}