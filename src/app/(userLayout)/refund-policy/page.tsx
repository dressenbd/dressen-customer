"use client";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-8">
          <h1 className="text-3xl font-bold text-secondary mb-8 text-center">
            Refund Policy
          </h1>
          
          <div className="space-y-6 text-secondary">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Return Window</h2>
              <p className="text-gray-600 leading-relaxed">
                We offer a 7-day return policy from the date of delivery. Items must be in original condition with tags attached and in original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Eligible Items</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Clothing items in original condition</li>
                <li>Unworn items with original tags</li>
                <li>Items in original packaging</li>
                <li>Non-personalized or customized items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Refund Process</h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Contact our customer service at Dressenmanager@gmail.com</li>
                <li>Provide order number and reason for return</li>
                <li>Receive return authorization and shipping instructions</li>
                <li>Ship items back using provided instructions</li>
                <li>Refund processed within 5-7 business days after receipt</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
              <div className="bg-neutral/30 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Email:</strong> Dressenmanager@gmail.com<br/>
                  <strong>Phone:</strong> +8801909008004<br/>
                  
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}