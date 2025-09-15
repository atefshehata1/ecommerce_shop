// CartAction.ts
"use client" // لازم عشان نقدر نستخدم localStorage وwindow

import getUserToken from "../getUserToken"
import { CartData } from "../types/cartData"

// ✅ دالة جلب بيانات الكارت
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

// ✅ إضافة منتج للكارت
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

// ✅ حذف منتج من الكارت
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

// ✅ مسح كل المنتجات
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

// ✅ تحديث كمية منتج
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

// ✅ طلب كاش
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

// ✅ طلب فيزا
export async function VisaOrder(id: string, shippingAddress: { details: string; phone: string; city: string }) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${id}?url=${process.env.NEXT_URL}`,
    {
      method: "POST",
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
    }
  )

  const data = await res.json()
  return data
}

// ✅ جلب كل الأوردرز
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

// ✅ جلب أوردرات المستخدم
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
