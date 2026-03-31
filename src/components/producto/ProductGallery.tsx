"use client";

import { useState } from "react";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const initialImage = images[0]?.image_url ?? null;
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2.2rem] border border-[#E9DBDC] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
        <div className="aspect-[4/5] bg-[#F8F3F2]">
          {selectedImage ? (
            <img
              src={selectedImage}
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
          {images.map((image) => {
            const isActive = selectedImage === image.image_url;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(image.image_url)}
                className={`overflow-hidden rounded-2xl border bg-white transition ${
                  isActive
                    ? "border-[#D9A8AF] shadow-[0_8px_20px_rgba(217,168,175,0.22)]"
                    : "border-[#E9DBDC] hover:border-[#D9A8AF]"
                }`}
              >
                <div className="aspect-square bg-[#F8F3F2]">
                  <img
                    src={image.image_url}
                    alt={productName}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
