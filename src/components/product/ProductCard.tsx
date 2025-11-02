"use client";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import SmartImage from "@/components/shared/SmartImage";

/** আমরা যেটুকু ফিল্ড ইউজ করছি, শুধু সেটারই টাইপ দিচ্ছি  */
type RemoteProduct = {
  _id?: string;
  id?: string;
  slug?: string;

  name?: string;
  title?: string;
  label?: string;

  /** backend থেকে string বা string[]—দুটোই আসতে পারে */
  featuredImg?: string | string[];

  /** fallback ইমেজ (থাকলে) */
  image?: string;

  /** দামের ফিল্ড—number বা string */
  price?: number | string;
  mrp?: number | string;
  sale?: number | string;
};

type ProductCardProps = { product: RemoteProduct };

const ProductCard = ({ product }: ProductCardProps) => {
  // featuredImg: string | string[] | undefined
  const featured = product?.featuredImg;
  const imgSrc =
    (Array.isArray(featured) ? featured[0] : featured) ||
    product?.image ||
    "/placeholder.png";

  // price: number | string | undefined -> number
  const numericPrice =
    typeof product?.price === "number"
      ? product.price
      : typeof product?.price === "string"
      ? Number(product.price)
      : undefined;

  return (
    <Card className="p-3 group h-full flex flex-col">
      <div className="relative aspect-square">
        <SmartImage
          src={imgSrc}
          alt={product?.name || product?.title || product?.label || "Product image"}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 20vw"
          quality={80}
          placeholder="empty"
        />
      </div>

      <div className="mt-3 flex-1">
        <div className="text-sm line-clamp-2">
          {product?.name || product?.title || product?.label || "Product"}
        </div>
        <div className="mt-1 font-semibold">
          ৳ {typeof numericPrice === "number" && Number.isFinite(numericPrice) ? Math.round(numericPrice) : 0}
        </div>
      </div>

      <Button className="mt-3 w-full">Add to cart</Button>
    </Card>
  );
};

export default ProductCard;
