'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000
  };
  return (
  
      <div className="grid grid-cols-12 my-6 ">
        <div className="col-span-10">
          <Slider className="cursor-pointer" {...settings}>
            <div> <Image src="/images/keagan-henman-e6BkcrbCvzs-unsplash.jpg" alt="img-1" width={750} height={500 } className="w-full object-cover h-80"/></div>
            <div> <Image src="/images/kenny-eliason-mlZzMow-CQw-unsplash.jpg" alt="img-2" width={750} height={500 } className="w-full object-cover h-80"/></div>
            <div> <Image src="/images/pexels-vie-studio-4439456.jpg" alt="img-3" width={750} height={500 } className="w-full object-cover h-80"/></div>
          </Slider>
        </div>
        <div className="col-span-2">
          <div className="row-span-1">
            <Image src='/images/pexels-tamanna-rumee-52377920-7957746.jpg' alt="img-1" width={350} height={500} className="w-full object-cover h-50"/>
          </div>
          <div className="row-span-1">
            <Image src='/images/mr-lee-888HU1GauzY-unsplash.jpg' alt="img-2" width={350} height={500} className="w-full object-cover h-30"/>
          </div>
        
        </div>
       
      </div>
  );
}