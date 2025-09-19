import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { Brands, DataBrands } from "../../../types/AllBrands"

export default async function Brands() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`, {
    cache: "no-store",
  })
  const data: Brands = await res.json()
  const brandsData: DataBrands[] = data.data

  return (
    // Responsive grid for brands
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {brandsData.map((brand) => (
        <Link key={brand._id} href={`/brands/${brand._id}`}>
          <Card className="cursor-pointer shadow-md hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">{brand.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Slug: {brand.slug}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={brand.image}
                alt={brand.name}
                width={300}
                height={350}
                className="rounded-md w-full h-40 sm:h-48 md:h-56 object-cover"
              />
            </CardContent>
            <CardFooter>
              <p className="text-xs sm:text-sm text-gray-600">
                Created: {new Date(brand.updatedAt).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
