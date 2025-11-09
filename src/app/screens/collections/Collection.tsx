import CollectionCard from "@/app/components/collectioncard/CollectionCard";
import React from "react";

const Collection = () => {
  const collection = [
    {
      category: "Men",
      image: "/mencollection.png",
      link: "/shop?category=men",
    },
    {
      category: "Women",
      image: "/womencollection.png",
      link: "/shop?category=women",
    },
    {
      category: "Unisex",
      image: "/unisexcollection.png",
      link: "/shop?category=unisex",
    },
    {
      category: "Luxury",
      image: "/luxurycollection.png",
      link: "/shop?category=luxury",
    },
  ];

  return (
    <section className="container mx-auto py-24 px-4">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 strokeme tracking-tight">
          Collection
        </h1>
      </div>

      {/* Collection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {collection.map((item, index) => (
          <CollectionCard collection={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Collection;
