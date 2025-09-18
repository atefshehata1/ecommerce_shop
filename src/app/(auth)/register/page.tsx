"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"
import { User, Lock } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {  Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

// ✅ Password Schema
export const passwordSchema = z.string()
  .nonempty("Password is Required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*-]/, "Password must contain at least one special character (!@#$%^&*-)")

// 1️⃣ Schema
const schemaRegister = z.object({
  name: z.string().nonempty("Name is Required").min(2, "Min char 2").max(15, "Max char 15"),
  email: z.string().nonempty("Email is Required"),
  password: passwordSchema,
  rePassword: z.string().nonempty("Re-password is Required"),
  phone: z.string().nonempty("Phone is Required").regex(/^(\+2)?01[0125][0-9]{8}$/, "Enter Valid Phone")
}).refine((obj) => obj.password === obj.rePassword, {
  path: ["rePassword"],
  message: "Confirm Password Not Match"
})

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const Register_Form = useForm<z.infer<typeof schemaRegister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(schemaRegister)
  })

  async function handleRegister(values: z.infer<typeof schemaRegister>) {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      })
      if (!response.ok) {
        toast.error("Server error, please try again later", { position: "top-center" })
        return
      }
      const data = await response.json()
      if (data.message == "success") {
        toast.success('Account Created!', { position: "top-center" })
        setTimeout(() => router.push("/login"), 3000)
      } else {
        toast.error(data.message, { position: "top-center" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/90 rounded-2xl shadow-2xl overflow-hidden w-[420px] p-8">
        

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">WELCOME</h2>

        <Form {...Register_Form}>
          <form className="space-y-4" onSubmit={Register_Form.handleSubmit(handleRegister)}>

            {/* Name */}
            <FormField
              control={Register_Form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center  text-white rounded-full px-3">
                    <User className="w-5 h-5 mr-2" />
                    <FormControl>
                      <Input
                        placeholder="Full name"
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-white"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-600 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={Register_Form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center text-white rounded-full px-3">
                    <User className="w-5 h-5 mr-2" />
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-white"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-600 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={Register_Form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center  text-white rounded-full px-3">
                    <Lock className="w-5 h-5 mr-2" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-white"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-600 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Re-Password */}
            <FormField
              control={Register_Form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center  text-white rounded-full px-3">
                    <Lock className="w-5 h-5 mr-2" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-white"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-600 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={Register_Form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center  text-white rounded-full px-3">
                    <User className="w-5 h-5 mr-2" />
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-white"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-600 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white rounded-full py-2 mt-4 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

      
      </div>
    </div>
  )
}
