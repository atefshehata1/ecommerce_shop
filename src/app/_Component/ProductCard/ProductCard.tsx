import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { product } from '../../../types/products.type'
import AddCartBtn from './AddCartBtn'
import AddWishListIcon from './AddWishListIcon'
import HeroStars from './StarsIcon'

export default function ProductCard({ product }: { product: product }) {
  const { imageCover, title, ratingsAverage, price, category: { name }, _id } = product

  return (
    <Card className="flex flex-col justify-between h-full shadow-md rounded-2xl hover:shadow-lg transition">
      <Link href={'/products/' + _id} className="flex flex-col h-full">
        
        {/* Image */}
        <CardHeader className="p-2 sm:p-4">
          <Image
            src={imageCover}
            alt={title}
            width={300}
            height={200}
            className="w-full h-40 sm:h-52 md:h-60 lg:h-64 object-cover rounded-2xl"
          />
        </CardHeader>

        {/* Content */}
        <CardContent className="px-2 sm:px-4 text-center sm:text-left">
          <CardTitle className="text-sm sm:text-base md:text-lg font-semibold truncate">
            {name}
          </CardTitle>
          <CardDescription className="my-2 text-xs sm:text-sm text-gray-600 truncate">
            {title.split(" ", 2).join(" ")}
          </CardDescription>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-2 sm:px-4">
          <span className="text-sm sm:text-base font-bold">{price} Egp</span>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <HeroStars />
            <span>{ratingsAverage}</span>
          </div>
        </CardFooter>
      </Link>

      {/* Buttons */}
      <div className="flex justify-center items-center gap-2 p-2 sm:p-4">
        <AddCartBtn id={_id} />
        <AddWishListIcon id={_id} />
      </div>
    </Card>
  )
}
