import React from 'react'
import { DataBrands } from '../../../../types/AllBrands'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface props {
    params : {
        id: string
    }
}
export default async function page({params}: props) {
    const id = params.id
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${id}`,{cache:"no-store"})
    const data: {data: DataBrands} = await res.json()
    const brand = data.data
    
return (
  <div className="flex justify-center mt-5">
    <div className="flex items-center w-3/4 max-w-md bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      {/* الصورة شمال */}
      <div className="w-2/3">
        <Image
          src={brand.image}
          alt={brand.name}
          width={200}
          height={200}
          className="rounded-md w-full h-[150px] object-cover"
        />
      </div>

      {/* النصوص يمين */}
      <div className="w-1/3 pl-4">
        <p className="text-lg font-semibold">{brand.name}</p>
        <p className="text-sm text-gray-500">Slug: {brand.slug}</p>
        <p className="text-xs text-gray-400 mt-2">
          Created: {new Date(brand.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);

}
