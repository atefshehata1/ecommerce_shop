'use client'

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { toast } from "sonner"
import getUserToken from "../../../getUserToken"
import Loading from "@/app/loading"
import { DataWish, Wishlist } from "../../../types/WishList"
import { removeWishlist } from "../../../WishlistAction/WishlistAction"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"



export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<DataWish[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹  call API Get logged user wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = await getUserToken()
        if (!token) throw new Error("token undefined")

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
          headers: { token },
        })

        const data: Wishlist = await res.json()

        if (data.status === "success") {
          setWishlist(data.data)
        } else {
          toast.error(" Wishlist is failled loading")
        }
      } catch (err) {
        console.error(err)
        toast.error(" Wishlist is failled loading")
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])


  
  //  handle remove 
    async function handleRemove(id: string) {
    try {
      const data = await removeWishlist(id)

      if (data.status === "success") {
        toast.success(data.message, { position: "top-center" })
           setWishlist((prev) => prev.filter((item) => item._id !== id))
      
      } else {
        toast.error(data.message, { position: "top-center" })
      }
    } catch (err) {
      toast.error("حصل خطأ أثناء الإضافة", { position: "top-center" })
      console.error(err)
    }
  }

  if (loading) return <Loading/>

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12 mt-5 ">
      {wishlist.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
        WishList empty !!
        </p>
      ) : (
        wishlist.map((item) => (
          <Card key={item._id} className="shadow-md  ">
           

            <CardHeader>
              <CardTitle className="line-clamp-1">{item.title}</CardTitle>
              <CardDescription>{item.brand?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={item.imageCover}
                alt={item.title}
                width={300}
                height={200}
                className="rounded-md h-55  object-cover"
              />
              <p className="mt-2 font-bold text-lg">{item.price} EGP</p>
            </CardContent>
              <CardFooter className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                التقييم: ⭐ {item.ratingsAverage}
              </p>
              <Button
                size="sm"
                onClick={() => handleRemove(item._id)}
              > Remove <Heart/>
              </Button>
            </CardFooter>
      
          </Card>
        ))
      )}
    </div>
  )
}
