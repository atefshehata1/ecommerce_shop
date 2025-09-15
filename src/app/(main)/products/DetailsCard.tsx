"use client";

import AddCartBtn from "@/app/_Component/ProductCard/AddCartBtn";
import ProductSlider from "@/app/_Component/ProductSlider/ProductSlider";
import React from "react";
import { productItem } from "../../../types/productsDetails.type";

interface DetailsCardProps {
  product: productItem | null;
}

export default function DetailsCard({ product }: DetailsCardProps) {
  if (!product) {
    return <p className="text-center my-10">Product not found.</p>;
  }

  return (
    <div className="w-3/4 m-auto">
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-4">
          <ProductSlider images={product.images || []} />
        </div>

        <div className="col-span-8">
          <p>{product.title}</p>
          <p className="my-5">{product.description}</p>
          <h2 className="text-main">{product.category?.name}</h2>

          <div className="flex justify-between items-center my-5">
            <span>{product.price} Egp</span>
            <span>
              <i className="rating-color fa-solid fa-star"></i>
              {product.ratingsAverage}
            </span>
          </div>

          <AddCartBtn id={product._id} />
        </div>
      </div>
    </div>
  );
}
