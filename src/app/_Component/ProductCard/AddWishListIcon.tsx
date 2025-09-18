'use client'
import { Heart } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { addWishlist } from "../../../WishlistAction/WishlistAction"
import getUserToken from "../../../getUserToken"
import { DataWish } from "../../../types/WishList"

interface Props {
  id: string
}
export default function AddWishListIcon({ id }: Props) {
  const [added, setAdded] = useState(false)

  // ✅ We check first if it is in the wishlist.
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
          const exists = data.data.some((item: DataWish) => item._id === id)
          setAdded(exists)
        }
      } catch (err) {
        console.error("Error checking wishlist:", err)
      }
    }

    checkIfInWishlist()
  }, [id])

  //  Add wishlist
  async function handleAdd() {
    if (added) {
      //  heart is complete request
      toast.info("The product is already in the WishList.", { position: "top-center" })
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
      className={`h-7 w-7 cursor-pointer  transition-colors 
        ${added ? "text-yellow-600" : "text-black"}`}
      fill={added ? "currentColor" : "text-black"}
    />
  )
}
