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
import { CategoryResponse, DataCategory } from "../../../types/AllCategory"
import Link from "next/link"

export default async function CategoryList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
    cache: "no-store",
  })
  const data: CategoryResponse = await res.json()
  const allCategories: DataCategory[] = data.data

  return (
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
  {allCategories.map((category) => (
    <Link key={category._id} href={`/category/${category._id}`} className="cursor-pointer">
      <Card className="h-full shadow-md hover:shadow-lg transition-shadow flex flex-col">
        <CardHeader className="flex-grow">
          <CardTitle className="truncate">{category.name}</CardTitle>
          <CardDescription className="truncate">Slug: {category.slug}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={350}
            className="rounded-md w-full h-[200px] object-cover"
          />
        </CardContent>
        <CardFooter>
          <p className="text-sm">Created: {new Date(category.createdAt).toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    </Link>
  ))}
</div>

  )
}
