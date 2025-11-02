"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-[#d3410c]/70">404</h1>
          <h2 className="text-2xl font-semibold text-[#facf35]">Page Not Found</h2>
          <p className="text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="w-full sm:w-auto bg-[#facf35] hover:bg-[#facf35]/90 text-[#2e2e2e]">
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to Homeapage
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto border-[#facf35] text-[#facf35] hover:bg-[#facf35] hover:text-[#2e2e2e]">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
