'use server'

import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export default async function getUserToken() {
  try {
    const cookiesData = await cookies()
    const encryptToken = cookiesData.get("next-auth.session-token")?.value

    if (!encryptToken) {
      // لو مفيش توكن موجود
      return null
    }

    const data = await decode({ token: encryptToken, secret: process.env.NEXTAUTH_SECRET! })

    // لو محتاج ترجع التوكن نفسه:
    return data?.token

    // لو محتاج بيانات المستخدم بدل التوكن:
    // return decoded
  } catch (error) {
    console.error("Error getting user token:", error)
    return null
  }
}
