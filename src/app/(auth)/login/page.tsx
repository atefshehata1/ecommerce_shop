"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"
import getUserToken from '../../../getUserToken'
import { getCartData } from '../../../CartAction/CartAction'
import { CartData } from '../../../types/cartData'
import { CountContext } from '../../../CountProvider'

// ✅ Password Schema
export const passwordSchema = z.string()
  .nonempty("Password is Required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*-]/, "Password must contain at least one special character (!@#$%^&*-)")

// ✅ Schema
const schemaLogin = z.object({
  email: z.string().nonempty("Email is Required").email("Invalid email format"),
  password: passwordSchema,
})

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const countContext = useContext(CountContext)

  if (!countContext) {
    throw new Error("CountContext is not available. Make sure CountProvider wraps your app.")
  }

  const { setCount } = countContext

  const Login_Form = useForm<z.infer<typeof schemaLogin>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schemaLogin)
  })

  async function handleLogin(values: z.infer<typeof schemaLogin>) {
    try {
      setLoading(true)
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (data?.ok) {
        toast.success('Access Login', { position: "top-center" })

        const token = await getUserToken()
        if (token) {
          const cartData: CartData = await getCartData()
          const sum = cartData.data.products.reduce(
            (total, item) => total + item.count,
            0
          )
          setCount(sum)
        }

        setTimeout(() => router.push("/"), 2000)
      } else {
        toast.error(data?.error || "Invalid credentials", { position: "top-center" })
      }

    } catch (err) {
      console.error("Login error:", err)
      toast.error("Something went wrong. Please try again.", { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full flex items-center justify-center bg-gradient-to-b from-purple-900 to-pink-600">
        <div className="bg-white/90 w-full max-w-md p-8 rounded-2xl shadow-2xl">
          {/* Title */}
          <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-700">
            Welcome Back 👋
          </h2>

          <Form {...Login_Form}>
            <form className="space-y-5" onSubmit={Login_Form.handleSubmit(handleLogin)}>
              {/* Email */}
              <FormField
                control={Login_Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="osama@gmail.com"
                        className="rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={Login_Form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Atef2025#"
                        className="rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Links */}
              <div className="flex justify-between items-center my-2 text-sm">
                <Link href='/forgetPassword' className="text-pink-600 font-medium hover:underline">
                  Forgot Password?
                </Link>
                <Link href='/register' className="text-pink-600 font-medium hover:underline">
                  Sign Up
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full cursor-pointer bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 rounded-full shadow-lg transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
