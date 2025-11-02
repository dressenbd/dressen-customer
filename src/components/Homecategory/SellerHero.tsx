import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import r from "../../../public/r.png"
import Image from "next/image"

export default function SellerHero() {
    return (
        <section className="min-h-screen  flex items-center px-4 py-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-5 text-center lg:text-left">
                    <p className="text-black text-sm md:text-base font-medium tracking-wide uppercase">
                        Grab your slot
                    </p>
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-black leading-snug">
                        Unlock the universe of{" "}
                        <span className="block text-black drop-shadow-md">
                            Seller Opportunity
                        </span>
                    </h1>
                    <p className="text-sm md:text-base text-black max-w-md mx-auto lg:mx-0">
                        Start your journey today with exclusive seller benefits.
                        Be part of the future marketplace and grow your business with us.
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <Button className="bg-black hover:bg-gray-800 text-[#2e2e2e] px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold rounded-lg shadow-lg group transition-all duration-300">
                            Register Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>


                {/* Right Content - Image */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative w-full sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 ">
                        <Image
                            src={r}
                            alt="Decorative floating box"
                            fill
                            className="object-cover animate-float"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
