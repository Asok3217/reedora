"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CollectionItem {
  category: string;
  image: string;
  link: string;
}

const CollectionCard = ({ collection }: { collection: CollectionItem }) => {
  return (
    <Link href={collection.link} className="block transform transition-all duration-300 hover:-translate-y-1">
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            fill
            src={collection.image}
            alt={collection.category}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center justify-between text-white">
            <span className="text-lg md:text-xl font-medium uppercase tracking-wide">
              {collection.category}
            </span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2 text-xl">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
