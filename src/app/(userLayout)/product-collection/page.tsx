import BestSellingProducts from "@/components/BestSellingProducts/BestSellingProducts";
import ModelWomen from "@/components/ModelWomen/ModelWomen";
import { ProductCollection } from "@/components/ProductCollection/ProductCollection";


export default function Home() {
  return <div>
    <ProductCollection />
    <BestSellingProducts />
    <ModelWomen />
  </div>
}
