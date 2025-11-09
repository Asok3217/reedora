"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BounceLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function CarouselSize({ allPerfumes }) {
  const router = useRouter();
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const textContainer = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.8 },
    },
  };

  return (
    <div>
      {loading ? (
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center w-full"
        >
          <BounceLoader size={50} />
        </motion.div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full max-w-xl mx-auto"
        >
          <CarouselContent>
            {allPerfumes.map((perfume, index) => (
              <CarouselItem key={index} className="w-64 flex-shrink-0">
                <motion.div
                  variants={textContainer}
                  initial="hidden"
                  animate="visible"
                  className="overflow-hidden cursor-pointer"
                  onClick={() => {
                    router.push(`/shop/${perfume.id}`);
                  }}
                >
                  <Card className="border-none">
                    <CardContent className="flex flex-col items-center p-4">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={perfume.image}
                          alt={perfume.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-contain rounded-xl"
                        />
                      </div>

                      <h2 className="text-xl mt-2 text-center">
                        {perfume.name}
                      </h2>
                      <div className="flex gap-5 justify-center">
                        <p className="text-gray-600 text-lg line-through">
                          ${perfume.originalPrice}
                        </p>
                        <p className="text-gray-600 text-lg">
                          ${perfume.discountedPrice}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      )}
    </div>
  );
}
