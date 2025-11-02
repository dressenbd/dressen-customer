import { Users, UserPlus, Truck, Clock, Megaphone, GraduationCap } from "lucide-react"

const features = [
    {
        icon: Users,
        title: "Reach Customer",
        description:
            "Strategically engage and connect with your target audience to foster meaningful relationships and drive business growth.",
    },
    {
        icon: UserPlus,
        title: "Free Registration",
        description: "Unlock exclusive benefits and join our community with hassle-free registration.",
    },
    {
        icon: Truck,
        title: "Reliable Shipping",
        description: "Fast, reliable, and hassle free delivery through Chawkbazar logistic network",
    },
    {
        icon: Clock,
        title: "Timely Payments",
        description: "Funds are safely deposited directly to your bank account on a weekly basis.",
    },
    {
        icon: Megaphone,
        title: "Marketing Tools",
        description: "Find new customers & grow more with advertising and our whole range of marketing tools.",
    },
    {
        icon: GraduationCap,
        title: "Support & Training",
        description: "Learn all about e-commerce for free and get help with seller support.",
    },
]

export function WhySellSection() {
    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Why Sell with Chawkbazar</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Embarking on your digital entrepreneurship journey with Chawkbazar is a breeze. Over 1.4 million sellers have
                    trusted us to nurture their businesses.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
