import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type ProductCardProps = {
  id: string; 
  title: string;
  subtitle?: string;
  price: number;
  image: string;
};

const NewArrivalsCard = ({
  id,
  title,
  subtitle,
  price,
  image,
}: ProductCardProps) => {
  return (
    <Card
      className="group rounded-[12px] lg:rounded-3xl overflow-hidden bg-neutral/70 
    lg:p-2 gap-0 py-0"
    >
      <div
        className="relative w-full h-[150px] sm:h-[235px] lg:h-[200px]  
      lg:rounded-3xl bg-neutral"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-300 
          group-hover:scale-105 pt-3"
        />
      </div>

      <CardContent className="p-3">
        <div className="font-medium line-clamp-1 text-sm md:text-base">
          {title}
        </div>
        {subtitle && (
          <div className="text-[8px] md:text-xs text-muted-foreground line-clamp-1">
            {subtitle}
          </div>
        )}
        <div className="flex justify-between items-center md:mt-4">
          <div className="mt-1 md:text-2xl font-semibold">
            £{price.toFixed(2)}
          </div>
          {/* btn */}
          <Link
            href={`/product-details/${id}`} 
            className="bg-secondary text-accent md:bg-neutral md:text-secondary
              p-0.5 md:p-2 rounded-full shadow"
          >
            <ArrowUpRight className="w-4 h-4 lg:w-6 lg:h-6" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewArrivalsCard;
