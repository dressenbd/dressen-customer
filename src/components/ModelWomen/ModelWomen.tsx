"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

// If you keep images in /public, this import style is ideal:
import modelWomen1 from "../../../public/modelWomen1.png"
import modelWomen2 from "../../../public/modelWomen2.png"

export default function ModelWomen() {
  return (
    <section className="bg-gray-50 mt-8">
      <div className="mx-auto max-w-screen-xl ">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-200 via-purple-100 to-yellow-100 p-4 sm:p-6 lg:p-8">
          {/* Layout: mobile = stacked; md+ = 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 lg:gap-8">
            {/* Left Model */}
            <div className="flex justify-center md:justify-start">
              <div className="w-28 xs:w-32 sm:w-36 md:w-40 lg:w-48">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={modelWomen1}
                    alt="Fashion model in patterned top"
                    fill
                    sizes="(max-width: 768px) 35vw, (max-width: 1024px) 20vw, 15vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="text-center px-2">
              <p className="text-gray-600 text-xs sm:text-sm mb-1">Get Up to</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-1">55% OFF</h1>
              <p className="text-gray-600 text-xs sm:text-sm mb-5 sm:mb-6">Holiday Bit</p>

              <Button
                className="bg-gray-900 hover:bg-gray-800 text-[#2e2e2e] px-5 py-2 sm:px-7 sm:py-2.5 rounded-md"
                aria-label="Get discount"
              >
                Get Discount
              </Button>
            </div>

            {/* Right Model */}
            <div className="flex justify-center md:justify-end">
              <div className="w-28 xs:w-32 sm:w-36 md:w-40 lg:w-48">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={modelWomen2}
                    alt="Fashion model in black leather jacket"
                    fill
                    sizes="(max-width: 768px) 35vw, (max-width: 1024px) 20vw, 15vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Optional: subtle decorative blur in background (disabled on prefers-reduced-motion) */}
          <div className="pointer-events-none absolute -z-10 inset-0 [mask-image:radial-gradient(closest-side,white,transparent)] motion-safe:animate-pulse opacity-40" />
        </div>
      </div>
    </section>
  )
}
