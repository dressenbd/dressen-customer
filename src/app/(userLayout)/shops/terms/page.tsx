import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <Card className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-orange-500 mb-2">
          1. Introduction
        </h2>
        <p className="text-sm text-gray-700 mb-2">
          Welcome to Marny Rose. These Terms and Conditions `Terms` govern
          your use of our website, mobile application, and services
          collectively, the `Service` operated by Marny Rose (us, we, or
          our).
        </p>
        <p className="text-sm text-gray-700 mb-2">
          By accessing or using our Service, you agree to be bound by these
          Terms. If you disagree with any part of these terms, then you may not
          access the Service.
        </p>
        <p className="text-sm text-gray-700">
          These Terms apply to all visitors, users, and others who access or use
          the Service.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-orange-500 mb-2">
          2. Acceptance of Terms
        </h2>
        <p className="text-sm text-gray-700 mb-2">
          By accessing and using this website, you accept and agree to be bound
          by the terms and provision of this agreement.
        </p>
        <p className="text-sm text-gray-700">
          If you do not agree to abide by the above, please do not use this
          service.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-orange-500 mb-2">
          3. Use License
        </h2>
        <p className="text-sm text-gray-700 mb-2">
          Permission is granted to temporarily download one copy of the
          materials on Marny Roses website for personal, non-commercial
          transitory viewing only.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          This is the grant of a license, not a transfer of title, and under
          this license you may not:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>modify or copy the materials</li>
          <li>
            use the materials for any commercial purpose or for any public
            display
          </li>
          <li>
            attempt to decompile or reverse engineer any software contained on
            the website
          </li>
        </ul>
      </section>
    </Card>
  );
}
