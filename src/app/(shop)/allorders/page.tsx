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

        setAllOrders(allData.data || [])   // ✅ All orders
         setUserOrders(userData || [])      // ✅ User Orders

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
    // Cash payment function
  const handleCashOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const order = await CashOrder(cartId, { details: "det", phone: "01044345807", city: "cairo" })

      toast.success(`✅ Order Created! Order ID: ${order.data._id}`, { duration: 3000 })

      // Add the new order to all orders and user orders
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

  // Request Visa
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
  <div className="px-4">
    <h2 className="text-2xl font-bold text-center mb-6">All Orders</h2>

    {/* أزرار الدفع */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
      <Button onClick={handleCashOrder} className="w-full sm:w-auto">
        Cash
      </Button>
      <Button onClick={handleVisaOrder} className="w-full sm:w-auto">
        Visa
      </Button>
    </div>

    {/* User Orders */}
    <h3 className="text-lg font-semibold text-center mt-8 mb-3">User Orders</h3>
    {userOrders.length === 0 ? (
      <p className="text-center mb-4">No user orders found.</p>
    ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {userOrders.map(order => (
          <li
            key={order._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
            <p><strong>Payment:</strong> {order.paymentMethodType}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    )}

    {/* All Orders */}
    <h3 className="text-lg font-semibold text-center mt-10 mb-3">All Orders</h3>
    {allOrders.length === 0 ? (
      <p className="text-center mb-4">No orders found.</p>
    ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allOrders.map(order => (
          <li
            key={order._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
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
