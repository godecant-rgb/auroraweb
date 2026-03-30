import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const firstImage = images[0]?.image_url;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border border-[#EFE5E6] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <div className="aspect-[4/5] bg-[#F8F3F1]">
          {firstImage ? (
            <img
              src={firstImage}
              alt={productName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#8B7E7E]">
              Sin imagen
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border border-[#EFE5E6] bg-white shadow-sm"
            >
              <div className="aspect-square bg-[#F8F3F1]">
                <img
                  src={image.image_url}
                  alt={productName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
