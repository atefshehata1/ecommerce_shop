'use server'

import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export default async function getUserToken() {
  try {
    const TokenSession = (process.env.NODE_ENV === "production" ?  '__Secure-next-auth.session-token' : "next-auth.session-token" )
    const cookiesData = await cookies()
    const encryptToken = cookiesData.get(TokenSession)?.value
    if (!encryptToken) {
      return null
    }
    const data = await decode({ token: encryptToken, secret: process.env.NEXTAUTH_SECRET! })
    return data?.token
  } catch (error) {
    console.error("Error getting user token:", error)
    return null
  }
}
