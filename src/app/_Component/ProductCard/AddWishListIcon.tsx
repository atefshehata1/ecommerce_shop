// 'use client'
// import { Heart } from "lucide-react"
// import React, { useState } from 'react'

// import { toast } from "sonner"
// import { addWishlist } from "../../../WishlistAction/WishlistAction"

// interface Props {
//   id: string
// }
// export default function AddWishListIcon({ id }: Props) {


//   const [added, setAdded] = useState(false)



//   async function handleAdd() {
//     try {
//       const data = await addWishlist(id)

//       if (data.status === "success") {
//         toast.success(data.message, { position: "top-center" })
//         setAdded(true)
      
//       } else {
//         toast.error(data.message, { position: "top-center" })
//       }
//     } catch (err) {
//       toast.error("حصل خطأ أثناء الإضافة", { position: "top-center" })
//       console.error(err)
//     }
//   }


//   return (
//     <Heart
//       onClick = { handleAdd  }
//       className={`h-7 w-7 cursor-pointer transition-colors  hover:text-yellow-600
//         ${added ? "text-yellow-100" : "text-black"}`}
//       fill={added ? "text-black" : "none"}
//     />
//   )
// }
 

 


// 'use client'
// import { Heart } from "lucide-react"
// import React, { useEffect, useState } from 'react'
// import { toast } from "sonner"
// import { addWishlist } from "../../../WishlistAction/WishlistAction"
// import getUserToken from "../../../getUserToken"

// interface Props {
//   id: string
// }
// export default function AddWishListIcon({ id }: Props) {
//   const [added, setAdded] = useState(false)

//   // ✅ أول ما الكومبوننت يشتغل نشيك هل المنتج موجود في wishlist
//   useEffect(() => {
//     const checkIfInWishlist = async () => {
//       try {
//         const token = await getUserToken()
//         if (!token) return

//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
//           headers: { token },
//         })

//         const data = await res.json()

//         if (data.status === "success") {
//           // لو المنتج موجود في الـ wishlist نخلي القلب مليان
//           const exists = data.data.some((item: any) => item._id === id)
//           setAdded(exists)
//         }
//       } catch (err) {
//         console.error("Error checking wishlist:", err)
//       }
//     }

//     checkIfInWishlist()
//   }, [id])

//   // ✅ إضافة المنتج للـ wishlist
//   async function handleAdd() {
//     try {
//       const data = await addWishlist(id)

//       if (data.status === "success") {
//         toast.success(data.message, { position: "top-center" })
//         setAdded(true)
//       } else {
//         toast.error(data.message, { position: "top-center" })
//       }
//     } catch (err) {
//       toast.error("حصل خطأ أثناء الإضافة", { position: "top-center" })
//       console.error(err)
//     }
//   }

//   return (
//     <Heart
//       onClick={handleAdd}
//       className={`h-7 w-7 cursor-pointer transition-colors hover:text-yellow-600
//         ${added ? "text-yellow-600" : "text-black"}`}
//       fill={added ? "currentColor" : "none"}
//     />
//   )
// }



'use client'
import { Heart } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { addWishlist } from "../../../WishlistAction/WishlistAction"
import getUserToken from "../../../getUserToken"

interface Props {
  id: string
}
export default function AddWishListIcon({ id }: Props) {
  const [added, setAdded] = useState(false)

  // ✅ أول ما الكومبوننت يشتغل نشيك هل المنتج موجود في wishlist
  useEffect(() => {
    const checkIfInWishlist = async () => {
      try {
        const token = await getUserToken()
        if (!token) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
          headers: { token },
        })

        const data = await res.json()

        if (data.status === "success") {
          const exists = data.data.some((item: any) => item._id === id)
          setAdded(exists)
        }
      } catch (err) {
        console.error("Error checking wishlist:", err)
      }
    }

    checkIfInWishlist()
  }, [id])

  // ✅ إضافة المنتج للـ wishlist
  async function handleAdd() {
    if (added) {
      // لو القلب مليان متبعتش request
      toast.info("المنتج موجود بالفعل في Wishlist", { position: "top-center" })
      return
    }

    try {
      const data = await addWishlist(id)

      if (data.status === "success") {
        toast.success(data.message, { position: "top-center" })
        setAdded(true)
      } else {
        toast.error(data.message, { position: "top-center" })
      }
    } catch (err) {
      toast.error("حصل خطأ أثناء الإضافة", { position: "top-center" })
      console.error(err)
    }
  }

  return (
    <Heart
      onClick={handleAdd}
      className={`h-7 w-7 cursor-pointer transition-colors hover:text-yellow-600
        ${added ? "text-yellow-600" : "text-black"}`}
      fill={added ? "currentColor" : "none"}
    />
  )
}
