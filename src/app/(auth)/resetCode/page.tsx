
"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

// 1️⃣ schema
const schemaResetCode = z.object({
  resetCode: z.string().nonempty(" Reset Code is Required ")
})

export default function ResetCode() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const ResetCode_Form = useForm<z.infer<typeof schemaResetCode>>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(schemaResetCode)
  })

  async function handleResetCode(values: z.infer<typeof schemaResetCode>) {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
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

      if (data.status == "Success") {
        toast.success('Access ResetCode', { position: "top-center" })
        setTimeout(() => { router.push("/resetPassword") }, 3000)
      } else {
        toast.error(data.message, { position: "top-center" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center -translate-y-20">
      <div className="bg-white/95 w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Enter Reset Code 🔐
        </h2>

        <Form {...ResetCode_Form}>
          <form
            className="space-y-6 flex flex-col items-center"
            onSubmit={ResetCode_Form.handleSubmit(handleResetCode)}
          >
            {/* Reset Code */}
            <FormField
              control={ResetCode_Form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center">
                  <FormLabel className="self-start text-gray-700 font-medium">Reset Code:</FormLabel>
                  <FormControl>
                    <InputOTP {...field} maxLength={6} className="justify-center">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer text-white font-semibold py-2 rounded-full shadow-lg transition"
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify Code"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
