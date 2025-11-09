"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PerfumeCardProps {
  id: number;
  name: string;
  brand: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
}

const Card: React.FC<{ perfume: PerfumeCardProps }> = ({ perfume }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/shop/${perfume.id}`)}
      className="border rounded-lg shadow-md w-80 h-[420px] flex flex-col justify-between group cursor-pointer overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-square w-full">
        <Image
          src={perfume.image}
          alt={perfume.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col justify-between h-2/5">
        <h2 className="text-lg font-semibold group-hover:underline">
          {perfume.name}
        </h2>
        <p className="text-gray-500">{perfume.brand}</p>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-lg font-bold text-green-600">
            ${perfume.discountedPrice}
          </p>
          {perfume.originalPrice !== perfume.discountedPrice && (
            <p className="text-sm text-gray-400 line-through">
              ${perfume.originalPrice}
            </p>
          )}
        </div>

        <p className="text-yellow-500 mt-1">⭐ {perfume.rating}</p>
      </div>
    </div>
  );
};

export default Card;
