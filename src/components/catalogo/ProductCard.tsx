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
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-[#EFE5E6] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[4/5] bg-[#F8F3F1]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#8B7E7E]">
            Sin imagen
          </div>
        )}
      </div>

      <div className="space-y-2 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#C8949D]">
          {product.category_name ?? "Aurora"}
        </p>

        <h3 className="text-lg font-medium text-[#1F1F1F]">{product.name}</h3>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-semibold text-[#1F1F1F]">
            {formatCurrencyUYU(product.price)}
          </p>

          <span className="rounded-full bg-[#F5E3E6] px-3 py-1 text-xs font-medium text-[#B67F7F] transition group-hover:bg-[#EED4D8]">
            Ver más
          </span>
        </div>
      </div>
    </Link>
  );
}