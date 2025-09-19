// CartAction.ts
"use client" // لازم عشان نقدر نستخدم localStorage وwindow

import getUserToken from "../getUserToken"
import { CartData } from "../types/cartData"

 // Function to retrieve card data
export async function getCartData() {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    headers: { token: token },
  })

  const data: CartData = await res.json()

  // ✅ نحفظ userId بس لو احنا على client
  if (typeof window !== "undefined" && data?.data?.cartOwner) {
    localStorage.setItem("userId", data.data.cartOwner)
  }

  return data
}
// ✅ Add a product to the card
export async function AddCartToBtn(id: string) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: { token: token, "content-type": "application/json" },
  })
  const data = await res.json()
  return data
}
// ✅ Delete a product from the card
export async function RemoveProductToTrash(id: string) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: { token: token },
  })
  const data = await res.json()
  return data
}
// ✅ Clear all products
export async function ClearProducts() {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "DELETE",
    headers: { token: token },
  })
  const data = await res.json()
  return data
}
// ✅ Update product quantity
export async function UpdateQuantity(count: number, id: string) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify({ count }),
    headers: { token: token, "content-type": "application/json" },
  })
  const data = await res.json()
  return data
}
// ✅ Request cash
export async function CashOrder(id: string, shippingAddress: { details: string; phone: string; city: string }) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${id}`, {
    method: "POST",
    headers: { token: token, "content-type": "application/json" },
    body: JSON.stringify({ shippingAddress }),
  })

  const data = await res.json()
  return data
}
// ✅ Request Visa 
export async function VisaOrder(id: string, shippingAddress: { details: string; phone: string; city: string }) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

    console.log("🌍 Redirect URL:", process.env.NEXT_PUBLIC_URL)


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${id}?url=${process.env.NEXT_PUBLIC_URL}`,
    {
      method: "POST",
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
    }
  )

  const data = await res.json()
  console.log("VisaOrder response:", data)
  return data
}
// ✅ Get all orders
export async function getAllOrders() {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/`, {
    method: "GET",
    headers: { token: token, "content-type": "application/json" },
  })

  if (!res.ok) throw new Error("Failed to fetch orders")
  const data = await res.json()
  return data
}
// ✅ Get user orders
export async function getUserOrders() {
  if (typeof window === "undefined") return [] // لو على السيرفر متعملش fetch على localStorage

  try {
    const userId = localStorage.getItem("userId")
    if (!userId) throw new Error("UserId not found")

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`)
    if (!res.ok) throw new Error("Failed to fetch orders")

    const data = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching user orders:", err)
    return []
  }
}
