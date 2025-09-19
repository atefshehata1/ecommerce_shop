"use client"

import React from "react"
import { StarHalfIcon } from "lucide-react"

export default function HeroStars() {
  return (
    <div className="flex flex-wrap items-center gap-0.5 text-yellow-400">
      {/* Full stars */}
      {[...Array(4)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 
               2.424 0l2.082 5.006 5.404.434c1.164.093 
               1.636 1.545.749 2.305l-4.117 3.527 
               1.257 5.273c.271 1.136-.964 2.033-1.96 
               1.425L12 18.354 7.373 21.18c-.996.608-2.231
               -.29-1.96-1.425l1.257-5.273-4.117-3.527c
               -.887-.76-.415-2.212.749-2.305l5.404-.434 
               2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      ))}

      {/* Half star */}
      <StarHalfIcon className="shrink-0 text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
    </div>
  )
}
