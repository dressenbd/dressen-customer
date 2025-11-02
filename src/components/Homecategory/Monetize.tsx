import { Button } from "@/components/ui/button"
import Image from "next/image"
import phone from '../../../public/phone.png'

export default function MonetizePage() {
  return (
    <div style={{
      background: "linear-gradient(99.98deg, #F1ECD7 0.42%, #9747FF 210.2%)",
    }} className="min-h-screen bg-gradient-to-r from-[#F1ECD7] via-[#9747FF] to-[#9747FF]">
      <div className=" px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight">
                Monetize user with <span className="block">Chawkbazar Dashboard</span>
              </h1>

              <p className="text-sm sm:text-base md:text-base text-gray-800 leading-relaxed max-w-md">
                We offer high-quality films and the best documentary selection, and the ability to browse
                alphabetically and by genre
              </p>
            </div>

            <Button className="bg-gray-900 hover:bg-gray-800 text-[#2e2e2e] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-medium flex items-center gap-2">
              See Our Admin Panel
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>


          {/* Right Content - Dashboard Mockup */}
          <div className="relative flex justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <Image
                src={phone}
                alt="Megamart Dashboard Interface showing mobile and desktop views"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
