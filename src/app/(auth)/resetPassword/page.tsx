"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"

// ✅ Password Schema
export const passwordSchema = z.string()
  .nonempty("Password is Required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*-]/, "Password must contain at least one special character (!@#$%^&*-)")

// 1️⃣ schema
const schemaResetPassword = z.object({
  email: z.string().nonempty("Email is Required"),
  newPassword: passwordSchema,
})

export default function ResetPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const ResetPassword_Form = useForm<z.infer<typeof schemaResetPassword>>({
    defaultValues: { email: "", newPassword: "" },
    resolver: zodResolver(schemaResetPassword)
  })

  async function handleResetPassword(values: z.infer<typeof schemaResetPassword>) {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      })

      if (!response.ok) {
        toast.error("Server error, please try again later", { position: "top-center" })
        return
      }

      const data = await response.json()
      console.log("data is reset password" , data)

      if (data.token) {
        toast.success('Password Reset Successfully!', { position: "top-center" })
        setTimeout(() => { router.push("/login") }, 3000)
      } else {
        toast.error(data.message, { position: "top-center" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen -translate-y-20">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-6">Enter your email and new password</p>

        <Form {...ResetPassword_Form}>
          <form className="space-y-4" onSubmit={ResetPassword_Form.handleSubmit(handleResetPassword)}>

            {/* Email */}
            <FormField
              control={ResetPassword_Form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="osama@gmail.com" className="rounded-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={ResetPassword_Form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Atef2025#" className="rounded-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer text-white font-semibold rounded-full"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
