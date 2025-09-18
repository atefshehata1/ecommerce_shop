"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"

// 1️⃣ schema
const schemaforgetPasswords = z.object({
  email: z.string().nonempty("Email is Required")
})

export default function ForgetPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const forgetPasswords_Form = useForm<z.infer<typeof schemaforgetPasswords>>({
    defaultValues: { email: "" },
    resolver: zodResolver(schemaforgetPasswords)
  })

  async function handleforgetPasswords(values: z.infer<typeof schemaforgetPasswords>) {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      })

      if (!response.ok) {
        toast.error("Server error, please try again later", { position: "top-center" })
        return
      }

      const data = await response.json()
      console.log("data is forget", data)

      if (data.statusMsg == "success") {
        toast.success('Access forgetPasswords', { position: "top-center" })
        setTimeout(() => { router.push("/resetCode") }, 3000)
      } else {
        toast.error(data.message, { position: "top-center" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center -translate-y-20">
      <div className="bg-white/90 w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password 🔑
        </h2>

        <Form {...forgetPasswords_Form}>
          <form className="space-y-5" onSubmit={forgetPasswords_Form.handleSubmit(handleforgetPasswords)}>

            {/* Email */}
            <FormField
              control={forgetPasswords_Form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="osama@gmail.com"
                      className="rounded-full border-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer text-white font-semibold py-2 rounded-full shadow-lg transition"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
