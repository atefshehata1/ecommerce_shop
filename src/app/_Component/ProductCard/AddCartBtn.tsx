'use client'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { AddCartToBtn } from '../../../CartAction/CartAction'
import { toast } from 'sonner'
import { CountContext } from '../../../CountProvider'

export default function AddCartBtn({ id }: { id: string }) {
  const context = useContext(CountContext)

  if (!context) {
    throw new Error("AddCartBtn must be used inside CountProvider")
  }

  const { setCount } = context

  async function addCardBtn(id: string) {
    try {
      const data = await AddCartToBtn(id)
      console.log("data is return addCardBtn:", data)

      if (data.status === "success") {
        toast.success(data.message, { position: 'top-center' })

        const sum = data.data.products.reduce(
          (total: number, item: { count: number }) => total + item.count,
          0
        )
        setCount(sum) // ✅ هنا الـ type مضبوط (React.Dispatch<React.SetStateAction<number>>)
      } else {
        toast.error("Incorrect id!")
      }
    }catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err)
    toast.error("Can't add product to cart without login.")
    toast.error(`❌ Error: ${err.message}`, { position: 'top-center' })
  } else {
    console.error(err)
    toast.error("❌ Unknown error occurred", { position: 'top-center' })
  }
}
  }

  return (
    <Button
      onClick={() => addCardBtn(id)}
      className="rounded-2xl w-3/4 ml-6  mt-3 cursor-pointer"
    >
      Add to cart
    </Button>
  )
}


