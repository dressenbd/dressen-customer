"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import MobileBottomNav from "@/components/home/MobileBottomNav";
import FacebookMessenger from "@/components/shared/FacebookMessenger";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      
      <div className="max-w-7xl mx-auto min-h-screen px-2 md:px-4 lg:px-6 pt-4">
        {children}
      </div>
      <Footer />
      <FacebookMessenger />
      <MobileBottomNav />
    </div>
  );
};

export default DashboardLayout;
