import React from 'react'
import { DataBrands } from '../../../../types/AllBrands'
import Image from 'next/image'

interface props {
  params: {
    id: string
  }
}

export default async function page({ params }: props) {
  const id = params.id

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${id}`,
    { cache: "no-store" }
  )
  const data: { data: DataBrands } = await res.json()
  const brand = data.data

  return (
    <div className="flex justify-center mt-5 px-4">
      {/* Responsive card */}
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-3/4 md:max-w-2xl bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 gap-4">
        
        {/* Image Section */}
        <div className="w-full sm:w-2/3">
          <Image
            src={brand.image}
            alt={brand.name}
            width={300}
            height={200}
            className="rounded-md w-full h-40 sm:h-48 object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full sm:w-1/3 text-center sm:text-left">
          <p className="text-base sm:text-lg font-semibold">{brand.name}</p>
          <p className="text-sm text-gray-500">Slug: {brand.slug}</p>
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(brand.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
