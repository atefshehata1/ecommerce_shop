import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[38vh] text-center px-4  ">
      <h1 className="text-3xl font-bold mb-4 animate-fade-in-up">Welcome to Shop Mart</h1>
      <p className="mb-2 animate-fade-in-up [animation-delay:200ms]">
        Discover the Latest Technology, Fashion and Life Style Products.
      </p>
      <p className="mb-6 animate-fade-in-up [animation-delay:400ms]">
        Quality guaranteed with Fast Shipping and excellent Customer Service.
      </p>
      <div className="flex gap-4 animate-fade-in-up [animation-delay:600ms]">
        <Button asChild className="text-white!">
          <Link href="/products">Shop Now</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/category">Browse Categories</Link>
        </Button>
      </div>
    </div>
  )
}
