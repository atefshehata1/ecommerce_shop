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

export default function ProductCard({product}:{product:product}) {
    const {imageCover,title, ratingsAverage,  price ,category:{name}, _id} = product
  return (
    <>
        <Card >
        <Link href={'/products/'+_id} >
        
        <CardHeader>
        <Image src={imageCover} alt={title} width={80} height={40} className='w-2/3 object-cover mx-auto rounded-2xl' />
    </CardHeader>

    <CardContent>
        <CardTitle >{name}</CardTitle>
        <CardDescription className='my-2'>{title.split(" ", 2)}</CardDescription>
    </CardContent>

    <CardFooter className='flex justify-between items-center'>
        <span> {price} Egp </span>
        <div className='flex'>
          <span>  <HeroStars/> </span>
        <span> {ratingsAverage}</span>
        </div>
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
