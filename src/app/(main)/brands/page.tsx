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
    <div className="flex flex-wrap">
      {brandsData.map((brand) => (
        <div key={brand._id} className="w-1/4 p-7">
          <Link href={`/brands/${brand._id}`}>
            <Card className="cursor-pointer shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{brand.name}</CardTitle>
                <CardDescription>Slug: {brand.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={300}
                  height={350}
                  className="rounded-md w-full h-[200px] object-cover"
                />
              </CardContent>
              <CardFooter>
                <p>Created: {new Date(brand.updatedAt).toLocaleDateString()}</p>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
}
