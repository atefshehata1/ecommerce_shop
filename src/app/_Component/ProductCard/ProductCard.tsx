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

export default function ProductCard({product}:{product:product}) {
    const {imageCover,title, ratingsAverage,  price ,category:{name}, _id} = product
  return (
    <>
        <Card>
        <Link href={'/products/'+_id} >
        
        <CardHeader>
        <Image src={imageCover} alt={title} width={150} height={50} className='w-full object-cover rounded-2xl' />
    </CardHeader>

    <CardContent>
        <CardTitle className='text-main my-1'>{name}</CardTitle>
        <CardDescription>{title.split(" ").slice(0,2).join(" ")}</CardDescription>
    </CardContent>

    <CardFooter className='flex justify-between items-center'>
    
        <span> {price} Egp </span>
        <span> <i className='rating-color fa-solid fa-star'> </i>{ratingsAverage}</span>

    </CardFooter>
        </Link>
        <div className='flex justify-center items-center gap-2'>
      <AddCartBtn  id={_id} />
      <AddWishListIcon id={_id} />
        </div>

    </Card>    
    </>
  )
}
