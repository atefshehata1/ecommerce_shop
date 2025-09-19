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
  
  // 🔵 loading عام مع تمييز نوع البروسيس
  const [loading, setLoading] = useState<null | "cash" | "visa">(null)

  const handleCashOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading("cash")

      const order = await CashOrder(cartId, { details, phone, city })

      toast.success(
        `✅ Order Created!\nOrder ID: ${order.data._id}\nTotal: ${order.data.totalOrderPrice} EGP\nPayment: ${order.data.paymentMethodType.toUpperCase()}`,
        { position: "top-center", duration: 4000 }
      )

      await ClearProducts()
      onOrderComplete?.() // تحديث الكارت
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err)
        toast.error(`❌ Error: ${err.message}`, { position: "top-center" })
      } else {
        console.error(err)
        toast.error("❌ Unknown error occurred", { position: "top-center" })
      }
    } finally {
      setLoading(null)
    }
  }

  const handleVisaOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading("visa")

      const order = await VisaOrder(cartId, { details, phone, city })
      if (order.session?.url) {
        window.location.href = order.session.url
      } else {
        toast.error("No payment session returned")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err)
        toast.error(`❌ Error: ${err.message}`, { position: "top-center" })
      } else {
        console.error(err)
        toast.error("❌ Unknown error occurred", { position: "top-center" })
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">Check Payment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] space-y-2">
        <form>
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription className="my-3">
              Please enter the shipping address
            </DialogDescription>
          </DialogHeader>

          {/* 📝 Address Inputs */}
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

          {/* 🟢 Payment Buttons */}
          <DialogFooter className="my-3 mx-3 flex gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              type="button"
              onClick={handleCashOrder}
              disabled={loading !== null}
              className="cursor-pointer"
            >
              {loading === "cash" ? "Processing..." : "Cash"}
            </Button>

            <Button
              type="button"
              onClick={handleVisaOrder}
              disabled={loading !== null}
              className="cursor-pointer"
            >
              {loading === "visa" ? "Processing..." : "Visa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
