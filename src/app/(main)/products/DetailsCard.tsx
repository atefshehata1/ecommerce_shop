"use client";

import AddCartBtn from "@/app/_Component/ProductCard/AddCartBtn";
import ProductSlider from "@/app/_Component/ProductSlider/ProductSlider";
import React from "react";
import { productItem } from "../../../types/productsDetails.type";
import HeroStars from "@/app/_Component/ProductCard/StarsIcon";

interface DetailsCardProps {
  product: productItem | null;
}

export default function DetailsCard({ product }: DetailsCardProps) {
  if (!product) {
    return <p className="text-center my-10">Product not found.</p>;
  }

  return (
    <div className="w-full sm:w-11/12 md:w-5/6 lg:w-3/4 m-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Photos */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <ProductSlider images={product.images || []} />
        </div>

        {/* Details */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">{product.title}</p>
          <p className="text-sm sm:text-base text-gray-700">{product.description}</p>
          <h2 className="text-main text-sm sm:text-base md:text-lg font-medium">
            {product.category?.name}
          </h2>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center my-4 gap-2 sm:gap-0">
            <span className="text-lg sm:text-xl font-bold">{product.price} Egp</span>
            <div className="flex items-center gap-1 text-sm sm:text-base">
              <HeroStars />
              <span>{product.ratingsAverage}</span>
            </div>
          </div>

          <AddCartBtn id={product._id} />
        </div>
      </div>
    </div>
  );
}
