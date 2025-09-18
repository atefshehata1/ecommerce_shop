import Image from 'next/image'
import React from 'react'

export default function PhotoStatic() {
  return (
    <div className="flex justify-center items-center w-3/4 mx-auto my-10 gap-6">
      <Image
        src="/images/keagan-henman-e6BkcrbCvzs-unsplash.jpg"
        alt="adriana-beckova"
        width={200}
        height={150}
        className="object-cover rounded-lg shadow-md animate-sideways"
      />
      <Image
        src="/images/pexels-tamanna-rumee-52377920-7957746.jpg"
        alt="tamanna-rumee"
        width={200}
        height={150}
        className="object-cover rounded-lg shadow-md animate-sideways [animation-delay:0.3s]"
      />
      <Image
        src="/images/pexels-tamanna-rumee-52377920-7986993.jpg"
        alt="tamanna-rumee"
        width={200}
        height={150}
        className="object-cover rounded-lg shadow-md animate-sideways [animation-delay:0.6s]"
      />
      <Image
        src="/images/mr-lee-888HU1GauzY-unsplash.jpg"
        alt="mr-lee"
        width={200}
        height={150}
        className="object-cover rounded-lg shadow-md animate-sideways [animation-delay:0.9s]"
      />
    </div>
  )
}
