import React from "react"
import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { DataCategory } from "../../../../types/AllCategory"

interface Props {
  params: {
    id: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${params.id}`,
    { cache: "no-store" }
  )
  const data: { data: DataCategory } = await res.json()
  const category = data.data

  return (
    <div className="p-6 flex justify-center mt-6 gap-6">
      <Card className="w-1/2 flex justify-center items-center shadow-md">
        <CardContent>
          <Image
            src={category.image}
            alt={category.name}
            width={400}
            height={300}
            className="rounded-md w-full h-[250px] object-cover"
          />
        </CardContent>
      </Card>

      <div className="w-1/2 flex flex-col justify-center">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription className="my-3">
            Slug: {category.slug}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-1">
          <p>Created: {new Date(category.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(category.updatedAt).toLocaleDateString()}</p>
        </CardFooter>
      </div>
    </div>
  )
}
