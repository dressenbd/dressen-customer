import { ArrowUpRight, ChevronRight } from "lucide-react";
import SmartImage from "@/components/shared/SmartImage";

const Promo = () => {
  return (
    <section className="grid grid-cols-1 gap-2 md:gap-4">
      {/* top collage */}
      <div className="grid grid-cols-12 gap-2 md:gap-4 h-28 md:h-[196px] xl:h-60">
        {/* left */}
        <div className="col-span-7 h-full relative bg-gradient-to-r from-primary/20 to-accent rounded-[20px]">
          <div className="z-10 absolute left-4 top-4 md:top-10 md:left-10">
            <p className="text-[8px] md:text-sm lg:text-base xl:text-lg">Picked Every item With Care</p>
            <h2 className="text-xs md:text-2xl xl:text-3xl font-semibold mt-1">Your Must try</h2>
            <button className="mt-4 bg-accent p-2 rounded-full shadow-md">
              <ArrowUpRight className="w-5 h-5 lg:w-8 lg:h-8" />
            </button>
          </div>

          <div className="w-1/2 ml-auto h-full relative">
            <SmartImage
              src="https://res.cloudinary.com/dvbnagad5/image/upload/v1757584103/model_alvk2k.png"
              alt="Picked Everyday With Care"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>

        {/* right Men Shirt */}
        <div className="col-span-5 h-full relative bg-gradient-to-r from-accent to-primary/20 rounded-[20px]">
          <div className="z-10 absolute top-2 left-2 md:top-4 md:left-4">
            <span className="bg-secondary text-accent text-[10px] md:text-xs xl:text-base px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              Men Shirt
            </span>
            <h2 className="text-base md:text-3xl xl:text-[40px] font-bold mt-2">60% Off</h2>
            <button className="mt-2 md:mt-4 bg-accent p-2 rounded-full shadow">
              <ArrowUpRight className="w-5 h-5 lg:w-8 lg:h-8" />
            </button>
          </div>

          <div className="w-9/12 ml-auto h-full relative">
            <SmartImage
              src="https://res.cloudinary.com/dvbnagad5/image/upload/v1757584102/man-model_eygmbw.png"
              alt="Men Shirt"
              fill
              className="object-contain object-bottom object-right"
              priority
            />
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 h-48 md:h-[410px] xl:h-[450px]">
        {/* left */}
        <div className="h-full relative rounded-[20px] bg-neutral">
          <SmartImage
            src="https://res.cloudinary.com/dvbnagad5/image/upload/v1757584100/girl_ksuyq4.png"
            alt="Girl"
            fill
            className="object-contain"
            priority
          />
          <button className="absolute bottom-4 left-2 md:left-4 bg-accent p-2 rounded-full shadow">
            <ArrowUpRight className="w-5 h-5 lg:w-8 lg:h-8" />
          </button>
        </div>

        {/* middle */}
        <div className="flex flex-col h-full gap-2 md:gap-4">
          <div className="h-1/2 relative rounded-[20px] bg-neutral">
            <SmartImage
              src="https://res.cloudinary.com/dvbnagad5/image/upload/v1757584096/watch_dazrn2.png"
              alt="Watch"
              fill
              className="object-contain object-top md:mt-5"
              priority
            />
            <button className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 bg-accent/60 px-2 py-1 md:px-6 md:py-3 rounded-md md:rounded-[12px] flex items-center gap-2 text-[10px] md:text-sm font-medium shadow whitespace-nowrap">
              See Watch <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-1/2 relative rounded-[20px] bg-gradient-to-br from-primary via-primary to-accent">
            <SmartImage
              src="https://res.cloudinary.com/dvbnagad5/image/upload/v1757584099/Footwear_tifpdg.png"
              alt="Shoes"
              fill
              className="object-contain object-top md:mt-5"
              priority
            />
            <button className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 bg-accent/60 px-2 py-1 md:px-6 md:py-3 rounded-md md:rounded-[12px] flex items-center gap-2 text-[10px] md:text-sm font-medium shadow whitespace-nowrap">
              See Shoe <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* right */}
        <div className="h-full relative rounded-[20px] bg-neutral">
          <SmartImage
            src="https://res.cloudinary.com/dvbnagad5/image/upload/v1757584097/women_grubfg.png"
            alt="Woman"
            fill
            className="object-contain"
            priority
          />
          <button className="absolute bottom-4 left-2 md:left-4 bg-accent p-2 rounded-full shadow">
            <ArrowUpRight className="w-5 h-5 lg:w-8 lg:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promo;
