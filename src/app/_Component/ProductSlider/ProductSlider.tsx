'use client'

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({ images }: { images: string[] }) {
  // Slider settings (react-slick)
  const settings = {
    dots: true, // show navigation dots
    arrows: false, // hide arrows
    infinite: true, // infinite loop
    speed: 500, // transition speed
    slidesToShow: 1, // show one slide at a time
    slidesToScroll: 1, // scroll one slide at a time
    adaptiveHeight: true, // auto adjust height based on content
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image} className="px-2">
          {/* Responsive image with different height for each screen size */}
          <Image
            src={image}
            alt="product image"
            width={800}
            height={600}
            className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-2xl"
          />
        </div>
      ))}
    </Slider>
  );
}
