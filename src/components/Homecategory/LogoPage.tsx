import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import Image from "next/image";
import { IProduct } from "@/types/product"; // আপনার existing type import করুন

type Brand = {
  _id: string;
  name?: string;
  icon?: { url?: string };
  createdAt: string;
  image?: string;
};

// Existing IProduct type ব্যবহার করুন, নতুন type define করবেন না
type Product = IProduct;

export default function LogoPage() {
  const { data } = useGetAllProductsQuery();

  // Extract unique brands from products data
  const getBrands = () => {
    if (!data?.length) return [];

    // Create a map to store unique brands
    const brandMap = new Map<string, Brand>();

    data.forEach((product: Product) => {
      // brand টা string হতে পারে, তাই type check করুন
      const brand = product?.brandAndCategories?.brand;
      
      // যদি brand string হয়, তাহলে simple object বানান
      if (typeof brand === 'string') {
        const brandId = brand; // বা unique ID generate করুন
        if (!brandMap.has(brandId)) {
          brandMap.set(brandId, {
            _id: brandId,
            name: brand,
            image: product.featuredImg,
            createdAt: new Date().toISOString()
          });
        }
      } 
      // যদি brand object হয় (আপনার Product type অনুযায়ী)
      else if (brand && typeof brand === 'object' && '_id' in brand) {
        const brandObj = brand as Brand;
        if (!brandMap.has(brandObj._id)) {
          brandMap.set(brandObj._id, {
            _id: brandObj._id,
            name: brandObj.name,
            image: brandObj.icon?.url || product.featuredImg,
            createdAt: brandObj.createdAt
          });
        }
      }
    });

    // Convert map to array and sort by creation date or name
    return Array.from(brandMap.values());
  };

  const brands = getBrands();

  return (
    <main className="min-h-screen bg-background">
      <div className="px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
            Our Top Brand&apos;s
          </h2>

          {/* Brands row */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-7">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="flex items-center justify-center flex-shrink-0 rounded-lg relative w-[140px] h-[170px] p-4 sm:p-5 md:p-6"
              >
                <Image
                  src={brand.image || "/placeholder.png"}
                  alt={brand.name || "Brand"}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Pagination dot */}
          <div className="flex justify-center mt-8">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}