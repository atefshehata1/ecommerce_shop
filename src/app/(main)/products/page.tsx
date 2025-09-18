

import MainSlider from "@/app/_Component/MainSlider/MainSlider";
import { product, ProductData } from "../../../types/products.type";
import { Suspense } from "react";
import { HomeLoading } from "@/app/_Component/HomeLoading/HomeLoading";
import ProductCard from "@/app/_Component/ProductCard/ProductCard";
import PhotoStatic from "@/app/_Component/ProductCard/PhotoStatic";

export default async function Home() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
    const data:ProductData = await res.json();
    const productsList:product[] =  data.data



  return (
    <div>
      <MainSlider/>
      <PhotoStatic/>
   <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 p-10 mt-5 py-2 ">
    <Suspense fallback={<HomeLoading/>} >

     {
      productsList.map((product)=>{
        return  <ProductCard product={product} key={product._id}/> 
      })
    }

    </Suspense>
   </div>
     
    </div>
  );
}
