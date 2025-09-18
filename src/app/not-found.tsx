import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-[calc(50vh-64px)] mt-[60px]'>
        <Image 
        src='/images/error.svg'
        alt='404!'
        width={250}
        height={150}
        className='w-1/2 object-cover'/>
    </div>
  )
}
