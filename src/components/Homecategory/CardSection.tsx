import signup from '../../../public/Signup.png'
import Product from '../../../public/Product.png'
import Money from '../../../public/Money.png'
import Business from '../../../public/Business.png'
import Image from 'next/image'

export default function Home() {
    const steps = [
        {
            image: signup,
            title: "Signup for free",
            description: "Discover all the necessary steps to successfully create your account here.",
        },
        {
            image: Product,
            title: "Sell Product",
            description: "Unlock profitable opportunities and begin selling your products today.",
        },
        {
            image: Money,
            title: "Earn Money",
            description: "Monetize your potential and start earning today.",
        },
        {
            image: Business,
            title: "Grow Business",
            description: "Elevate your enterprise and empower your business growth with us.",
        },
    ]

    return (
        <main className="min-h-screen mt-0 md:-mt-40 bg-white">
            <div className="px-4 py-12 sm:py-16 md:py-20 lg:py-24 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Start Selling In 4 Simple Steps
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                        Launching your online business with MegaMart is a breeze. Join the 10 million sellers who already trust us
                        with their success.
                    </p>
                </div>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`text-center flex flex-col items-center ${
                                index % 2 !== 0 ? "sm:mt-10 lg:mt-16" : "mt-0"
                            }`}
                        >
                            {/* Illustration */}
                            <div className="mb-6 flex justify-center">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={128}
                                    height={128}
                                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
