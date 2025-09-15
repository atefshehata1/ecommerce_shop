'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({images}: {images:string[]} ) {
  const settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (<>
  
  
   <Slider {...settings}>
    {
        images.map((image) =>{
            return  <div key={image}>  
                <Image src={image} alt='img' width={150} height={50} className='w-full object-cover rounded-4xl' />
            </div>
        })
    }
          </Slider>
  
  </>
  )
}
