import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-[calc(20vh-64px)] mt-[300px]'>
        <Image 
        src='/images/error.svg'
        alt='404!'
        width={450}
        height={250}
        className='w-full object-cover'/>
    </div>
  )
}
