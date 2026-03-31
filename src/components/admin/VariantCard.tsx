import { deleteVariantAction, updateVariantAction } from "@/app/admin/productos/actions";
import VariantForm from "@/components/admin/VariantForm";

type VariantCardProps = {
  productId: string;
  variant: {
    id: string;
    color: string;
    size: string;
    stock: number;
    is_active: boolean;
  };
};

export default function VariantCard({ productId, variant }: VariantCardProps) {
  return (
    <div className="space-y-4 rounded-[2rem] border border-[#EFE5E6] bg-[#FCF9F8] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-[#1F1F1F]">
            {variant.color} / {variant.size}
          </h3>
          <p className="text-sm text-[#666666]">
            Stock: {variant.stock} · {variant.is_active ? "Activa" : "Inactiva"}
          </p>
        </div>

        <form action={deleteVariantAction}>
          <input type="hidden" name="variantId" value={variant.id} />
          <input type="hidden" name="productId" value={productId} />
          <button
            type="submit"
            className="rounded-full border border-[#E7C9CD] bg-white px-4 py-2 text-sm font-medium text-[#B67F7F] transition hover:bg-[#FFF7F7]"
          >
            Eliminar
          </button>
        </form>
      </div>

      <VariantForm
        productId={productId}
        mode="edit"
        action={updateVariantAction}
        initialValues={{
          id: variant.id,
          color: variant.color,
          size: variant.size,
          stock: variant.stock,
          isActive: variant.is_active,
        }}
      />
    </div>
  );
}