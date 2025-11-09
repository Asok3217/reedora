import { CarouselSize } from "@/app/components/carousel/Carousel";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import HeroAnim from "./HeroAnim";
import { Link } from "lucide-react";

const Hero = async () => {
  const allPerfumes = await prisma.perfumeModel.findMany({
    where: {
      bestSeller: true,
    },
  });

  const serializedPerfumes = allPerfumes.map((perfume) => ({
    ...perfume,
    id: perfume.id.toString(),
    createdAt: perfume.createdAt?.toISOString(),
    updatedAt: perfume.updatedAt?.toISOString(),
    releaseDate: perfume.releaseDate?.toISOString(),
  }));
  return (
    <div className="h-full w-full px-5">
      <div className="flex flex-col md:flex-row justify-between h-full mt-20">
        {/* Text Section */}
        <div className="text-4xl md:text-7xl flex flex-col text-center md:text-left p-10">
          <div className="w-full text-gray-600 custom-font">
            <div>
              <HeroAnim />
            </div>
            <div className="text-xl mt-5">
              <Link href="/shop">
                <button className="p-6 bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-600 hover:text-white">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-12 w-full flex flex-col items-start">
            {" "}
            <div className="">
              <h1 className="text-2xl text-gray-600 mb-5">BEST SELLERS</h1>
            </div>
            <div className="">
              <CarouselSize allPerfumes={serializedPerfumes} />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex w-full md:w-[50%] gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/sidemodel.png"
                alt="model image"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="rounded-xl object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/model2.jpg"
                alt="model image"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative aspect-[9/16] w-full">
              <Image
                src="/menmodel.png"
                alt="model image"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
