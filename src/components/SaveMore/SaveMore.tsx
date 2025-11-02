import { Camera, Heart, Truck, Shield } from "lucide-react";

export default function SaveMore() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16 text-foreground">
          Save More Risk Nothing
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Guaranteed Savings */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Camera className="w-12 h-12 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Guaranteed Savings
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you don&apos;t make your membership fee in savings, we&apos;ll
              refund the difference
            </p>
          </div>

          {/* Try it risk-free */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Heart className="w-12 h-12 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Try it risk-free
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you don&apos;t make your membership fee in savings, we&apos;ll
              refund the difference
            </p>
          </div>

          {/* Super Fast Delivery */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Truck className="w-12 h-12 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Super Fast Delivery
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you don&apos;t make your membership fee in savings, we&apos;ll
              refund the difference
            </p>
          </div>

          {/* 1K+Products Priced at cost */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="w-12 h-12 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              1K+Products Priced at cost
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you don&apos;t make your membership fee in savings, we&apos;ll
              refund the difference
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
