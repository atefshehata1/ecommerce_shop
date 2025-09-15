"use client"

import React, { useEffect, useState } from "react"
import { getAllOrders, getUserOrders, CashOrder, ClearProducts, VisaOrder } from "../../../CartAction/CartAction"
import Loading from "@/app/loading"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DataOrder } from "../../../types/allOrders"


export default function OrdersPage({ cartId }: { cartId: string }) {
  const [allOrders, setAllOrders] = useState<DataOrder[]>([])    
  const [userOrders, setUserOrders] = useState<DataOrder[]>([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [allData, userData] = await Promise.all([
          getAllOrders(),
          getUserOrders()
        ])

        setAllOrders(allData.data || [])   // ✅ كل الأوردرز
         setUserOrders(userData || [])      // ✅ أوردرز اليوزر

        console.log(allData);
        console.log(userData);
        
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // دالة الدفع كاش
  const handleCashOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const order = await CashOrder(cartId, { details: "det", phone: "01044345807", city: "cairo" })

      toast.success(`✅ Order Created! Order ID: ${order.data._id}`, { duration: 3000 })

      // إضافة الأوردر الجديد لكل الأوردرز و أوردرز اليوزر
      setAllOrders(prev => [order.data, ...prev])
      setUserOrders(prev => [order.data, ...prev])

      await ClearProducts()
    }catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(`❌ Error: ${err.message}`)
    console.error(err)
  } else {
    toast.error("❌ Unknown error occurred")
    console.error(err)
  }
}
 finally {
      setLoading(false)
    }
  }

  // دالة الدفع Visa
  const handleVisaOrder = async () => {
    try {
      setLoading(true)
      const order = await VisaOrder(cartId, { details: "det", phone: "01044345807", city: "cairo" })

      if (order.session?.url) {
        window.location.href = order.session.url
      } else {
        toast.error("No payment session returned")
      }
    }catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(`❌ Error: ${err.message}`)
    console.error(err)
  } else {
    toast.error("❌ Unknown error occurred")
    console.error(err)
  }
}
 finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading/>

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">All Orders</h2>

      <div className="flex justify-center gap-2 mb-4">
        <Button onClick={handleCashOrder} className="mx-3">Cash</Button>
        <Button onClick={handleVisaOrder} >Visa</Button>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">User Orders</h3>
      {userOrders.length === 0 ? (
        <p className="text-center mb-4">No user orders found.</p>
      ) : (
        <ul className="mb-6">
          {userOrders.map(order => (
            <li key={order._id} className="border p-2 my-2 rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
              <p><strong>Payment:</strong> {order.paymentMethodType}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-2">All Orders</h3>
      {allOrders.length === 0 ? (
        <p className="text-center mb-4">No orders found.</p>
      ) : (
        <ul>
          {allOrders.map(order => (
            <li key={order._id} className="border p-2 my-2 rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
              <p><strong>Payment:</strong> {order.paymentMethodType}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
