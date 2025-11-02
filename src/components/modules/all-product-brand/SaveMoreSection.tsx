import { Wallet, HandHeart, Truck, BadgeCheck } from "lucide-react";

export default function SaveMoreSection() {
  return (
    <section className="py-12 px-6 text-center">
      <h2 className="text-3xl text-left font-bold mb-10">Save More Risk Nothing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 max-w-6xl mx-auto rounded-lg overflow-hidden">
        <div className="flex flex-col items-center text-center gap-3 p-6 border-r">
          <Wallet className="w-10 h-10" />
          <h3 className="font-semibold text-lg">Guaranteed Savings</h3>
          <p className="text-sm text-gray-600">
            If you don`t make your membership fee in savings, we`ll refund the difference
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 p-6 border-r ">
          <HandHeart className="w-10 h-10" />
          <h3 className="font-semibold text-lg">Try it risk-free</h3>
          <p className="text-sm text-gray-600">
            If you don`t make your membership fee in savings, we`ll refund the difference
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 p-6 border-r">
          <Truck className="w-10 h-10" />
          <h3 className="font-semibold text-lg">Super Fast Delivery</h3>
          <p className="text-sm text-gray-600">
            If you don`t make your membership fee in savings, we`ll refund the difference
          </p>
        </div>

        <div className="flex flex-col items-center  border-r text-center gap-3 p-6">
          <BadgeCheck className="w-10 h-10 text-indigo-600" />
          <h3 className="font-semibold text-lg">1K+Products Priced at cost</h3>
          <p className="text-sm text-gray-600">
            If you don`t make your membership fee in savings, we`ll refund the difference
          </p>
        </div>
      </div>
    </section>
  );
}