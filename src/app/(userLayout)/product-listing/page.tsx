"use client";

import { useEffect } from "react";
import AppPromo from "@/components/modules/home/app-promo/AppPromo";
import ProductListing from "@/components/ProductList/ProductList";
import SaveMore from "@/components/SaveMore/SaveMore";

export default function Home() {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <ProductListing />
            <SaveMore />
           <div className="md:-mt-38">
             <AppPromo />
           </div>
        </div>
    )
}
