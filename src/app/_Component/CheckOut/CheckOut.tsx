"use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CashOrder, ClearProducts, VisaOrder } from "../../../CartAction/CartAction"
import { toast } from "sonner"


export default function CheckOut({ cartId, onOrderComplete }: { cartId: string, onOrderComplete?: () => void }) {
  const [details, setDetails] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)

const handleCashOrder = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    setLoading(true)

    const order = await CashOrder(cartId, { details, phone, city })

    toast.success(
      `✅ Order Created!\nOrder ID: ${order.data._id}\nTotal: ${order.data.totalOrderPrice} EGP\nPayment: ${order.data.paymentMethodType.toUpperCase()}`,
      { position: "top-center", duration: 4000 }
    )

    await ClearProducts()

    // 🔵 التعديل الجديد: إعادة تحميل بيانات الكارت بدون refresh
    onOrderComplete?.()

  }catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err)
    toast.error("Can't add product to cart without login.")
    toast.error(`❌ Error: ${err.message}`, { position: 'top-center' })
  } else {
    console.error(err)
    toast.error("❌ Unknown error occurred", { position: 'top-center' })
  }
}finally {
    setLoading(false)
  }
}
  const handleVisaOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        setLoading(true)
        const order = await VisaOrder(cartId, { details, phone, city })
          if (order.session?.url) {
      // 🟢 redirect للـ checkout page
         window.location.href = order.session.url
       } else {
        toast.error("No payment session returned")
       }

    } catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err)
    toast.error("Can't add product to cart without login.")
    toast.error(`❌ Error: ${err.message}`, { position: 'top-center' })
  } else {
    console.error(err)
    toast.error("❌ Unknown error occurred", { position: 'top-center' })
  }
} finally{
        setLoading(false)
    }

}





  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" cursor-pointer">Check Payment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] space-y-2">
        <form onSubmit={handleCashOrder}>
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription className="my-3">
              Please enter the shipping address
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="my-3 mx-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>

            <Button className=" cursor-pointer" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Cash"}
            </Button>

            <Button
            className=" cursor-pointer"
            type="button"
            onClick={handleVisaOrder}
            disabled={loading}
            >
            {loading ? "Processing..." : "Visa"}
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
