import AppPromo from "@/components/modules/home/app-promo/AppPromo";
import ProductListing from "@/components/ProductList/ProductList";
import SaveMore from "@/components/SaveMore/SaveMore";


export default function Home() {
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
