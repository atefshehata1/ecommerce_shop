import React from "react";
import { ProductData, productItem } from "../../../../types/productsDetails.type";
import DetailsCard from "../DetailsCard";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return <p className="text-center my-10">Product not found.</p>;
    }

    const data: ProductData = await res.json();
    const product: productItem | null = data.data || null;

    return <DetailsCard product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p className="text-center my-10">Failed to load product.</p>;
  }
}
