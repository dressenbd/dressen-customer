"use client";

import FAQSection from "@/components/modules/ContactSection/FAQSection";
import OrdersTable from "@/components/modules/ContactSection/OrdersTable";
import Sidebar from "@/components/modules/ContactSection/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function ContactPage() {
    useScrollToTop();
    return (
        <div className="  p-4 md:p-8 lg:p-16">
            <div className="grid grid-cols-4 gap-4">
                <div className="md:col-span-1 ">
                    <Sidebar />
                </div>
                <div className="col-span-4 mt-10 md:mt-0 md:col-span-3">
                    <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
                    <OrdersTable />
                </div>
            </div>
      
      <main className=" p-8">
        
        
        <FAQSection />
      </main>
      <div className="bg-background flex items-center justify-center p-4">
  <div className="w-full max-w-lg space-y-4">
    <div className="text-center space-y-2">
      <h2 className="text-xl font-medium text-foreground">Have any other questions?</h2>
      <p className="text-sm text-muted-foreground">
        Don’t hesitate to send us an email with your enquiry or statement at
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Input
        placeholder="What's on Your Mind?"
        className="flex-1 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
      />
      <Button className="bg-foreground text-background hover:bg-foreground/90 px-6 mt-2 sm:mt-0">
        Send Us
      </Button>
    </div>
  </div>
</div>

    </div>
    );
}