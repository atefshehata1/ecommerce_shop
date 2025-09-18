'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { ClearProducts, getCartData, RemoveProductToTrash, UpdateQuantity } from '../../../CartAction/CartAction'
import { cart, CartData } from '../../../types/cartData'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CountContext } from '../../../CountProvider'
import CheckOut from '@/app/_Component/CheckOut/CheckOut'
import { Skeleton } from '@/components/ui/skeleton'

export default function CartPage() {
  const context = useContext(CountContext)
  if (!context) throw new Error("CountContext must be used within a CountProvider")
  const { setCount } = context

  const [cart, setCart] = useState<cart>()
  const [cartLoading, setCartLoading] = useState(true)
  const [LoadingCount, setLoadingCount] = useState(false)
  const [CountDisabled, setCountDisabled] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)

  const gatAllCartData = useCallback(async () => {
    try {
      setCartLoading(true)
      const data: CartData = await getCartData()
      setCart(data.data)

      const sum = data.data.products.reduce((total, item) => total + item.count, 0)
      setCount(sum)
      setCartLoading(false)
    } catch (error) {
      console.error("Error fetching cart:", error)
      setCartLoading(false)
    }
  }, [setCount])

  useEffect(() => {
    gatAllCartData()
  }, [gatAllCartData])

  const removeProduct = async (id: string) => {
    const data = await RemoveProductToTrash(id)
    if (data.status === "success") {
      toast.success("Product removed", { position: 'top-center' })
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: { count: number }) => total + item.count, 0)
      setCount(sum)
    }
  }

  const clearProducts = async () => {
    const data = await ClearProducts()
    if (data.message === "success") {
      toast.success("All products cleared! ", { position: 'top-center' })
      setCart(undefined)
      setCount(0)
    }
  }

  const updateQuantity = async (count: number, id: string) => {
    setCurrentId(id)
    setLoadingCount(true)
    setCountDisabled(true)
    const data = await UpdateQuantity(count, id)

    if (data.status === "success") {
      toast.success("Quantity updated", { position: 'top-center' })
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: { count: number }) => total + item.count, 0)
      setCount(sum)
    }

    setLoadingCount(false)
    setCountDisabled(false)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Shopping Cart</h1>

      {cartLoading ? (
         <div className="space-y-4">
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
      ) : (
        <>
          {cart?.products.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Table left */}
              <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.products.map((item) => (
                        <tr key={item._id} className="border-t">
                          <td className="px-4 py-3">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={70}
                              height={70}
                              className="rounded-md object-cover"
                            />
                          </td>
                          <td className="px-4 py-3 font-semibold">{item.product.title}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                disabled={CountDisabled}
                                onClick={() => updateQuantity(item.count - 1, item.product._id)}
                                className="p-2 h-8 w-8 flex items-center justify-center cursor-pointer"
                              >
                                {item.count === 1 ? <i className="fa-solid fa-trash"></i> : "-"}
                              </Button>

                              {LoadingCount && currentId === item.product._id ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                <span>{item.count}</span>
                              )}

                              <Button
                                disabled={CountDisabled}
                                onClick={() => updateQuantity(item.count + 1, item.product._id)}
                                className="p-2 h-8 w-8 flex items-center justify-center  cursor-pointer"
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="px-4 py-3">${item.price}</td>
                          <td className="px-4 py-3">
                            <Button
                              disabled={CountDisabled}
                              onClick={() => removeProduct(item.product._id)}
                              className="text-red-600  cursor-pointer"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table right */}
              <div className="bg-gray-50 shadow-md rounded-lg p-6 flex flex-col gap-6 self-start sticky top-20">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <p className="text-lg mb-2">
                    Total Price: <span className="font-bold">${cart?.totalCartPrice}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={clearProducts} className="bg-red-500 hover:bg-red-600 text-white  cursor-pointer">
                    Clear Cart
                  </Button>
                  {cart && <CheckOut cartId={cart._id} onOrderComplete={gatAllCartData} />}
                </div>
              </div>
            </div>
          ) : (
            // empty shop 
            <div className="flex justify-center mt-15 items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50">
              <i className="fa-solid fa-circle-info mr-2"></i>
              <span>Your cart is currently empty</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
