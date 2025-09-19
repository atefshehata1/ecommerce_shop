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
    <div className="flex flex-wrap">
      {allCategories.map((category) => (
        <div key={category._id} className="w-1/4 p-5">
          <Link href={`/category/${category._id}`} className="cursor-pointer">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>Slug: {category.slug}</CardDescription>
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
                <p>Created: {new Date(category.createdAt).toLocaleDateString()}</p>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
}
