'use client'
import React, { createContext, useEffect, useState } from 'react'
import { getCartData } from './CartAction/CartAction'
import getUserToken from './getUserToken'
import { CartData } from './types/cartData'

// ✅ Context Type
interface CountContextType {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}

// ✅ Create Context with default value (null)
export const CountContext = createContext<CountContextType | null>(null)

export default function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number>(0)

  async function getCountCart() {
    const token = await getUserToken()
    if (token) {
      const data: CartData = await getCartData()
      const sum = data.data.products.reduce(
        (total, item) => total + item.count,
        0
      )
      setCount(sum)
    }
  }

  useEffect(() => {
    getCountCart()
  }, [])

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  )
}
