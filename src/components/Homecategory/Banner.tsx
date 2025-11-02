// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
import bennar from "../../../public/banner.png";
// import Image from "next/image";

// export default function BannerPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main content */}
//       <div className="px-4 py-12 sm:py-16 lg:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//           {/* Right content - Hero image (mobile first: on top) */}
//           <div className="relative flex justify-center mt-0 lg:mt-0 order-1 lg:order-2">
//             <div className="relative w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96">
//               {/* Optional soft green glow background */}
//               <div className="absolute inset-0 rounded-full bg-green-100/60 blur-2xl -z-10" />

//               {/* Person image */}
//               <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full ring-1 ring-green-200/60">
//                 <Image
//                   src={bennar}
//                   alt="Banner Image"
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Left content (mobile: below image, desktop: left) */}
//           <div className="space-y-6 text-start order-2 lg:order-1">
//             <div className="text-[#2e2e2e]">
//               <div className="flex bg-[#F7F7F7] text-black items-center gap-2 text-xs sm:text-sm md:text-base rounded-full px-2 py-1 w-fit">
//                 <span className="bg-black px-3 sm:px-4 py-1 rounded-full text-[#2e2e2e] text-xs sm:text-sm">
//                   News
//                 </span>
//                 <span className="text-xs sm:text-sm md:text-base">
//                   Have a look at our updated terms and conditions policy
//                 </span>
//                 <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
//               </div>
//             </div>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//               Launch your online store effortlessly with{" "}
//               <span className="text-green-500">MegaMart</span> and start
//               selling today.
//             </h1>

//             <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
//               Transform your business with Chawkbazar&apos;s seamless platform
//               and kickstart your online sales instantly. Enjoy a hassle-free
//               setup and reach your customers quickly and efficiently.
//             </p>

//             <Button className="bg-black hover:bg-gray-800 text-[#2e2e2e] px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium flex items-center gap-2 text-sm sm:text-base w-fit">
//               Sign Up Here
//               <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/home/sections/Hero.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
             Trendy Clothing
          </h1>
          <p className="mt-4 text-muted-foreground">
            Quality products at great prices—fast delivery across Bangladesh.
          </p>
          <div className="mt-6">
            <Button asChild>
              <a href="/shop">Shop Now</a>
            </Button>
          </div>
        </div>
        <div className="relative h-[280px] md:h-[420px]">
          <Image src={bennar} alt="Hero banner" fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
}
