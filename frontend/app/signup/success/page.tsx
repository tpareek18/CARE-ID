"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("careid_user")
    if (!userData || !patientId) {
      router.push("/signup")
      return
    }

    // Auto-redirect after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [patientId, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-green-600">Account Created Successfully!</CardTitle>
          <CardDescription>
            Your CareID account has been created. Here is your unique patient identifier.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <p className="text-sm text-gray-500 mb-1">Your Unique Patient ID</p>
            <p className="text-2xl font-mono font-bold text-blue-800 tracking-wider">{patientId}</p>
          </div>

          <Alert variant="destructive" className="bg-red-50">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Keep this ID private and do not share it with anyone. Medical professionals will have secure ways to
              access your information in emergencies.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center text-gray-500 mb-2">
            Redirecting to your dashboard in {countdown} seconds...
          </p>
          <Button onClick={() => router.push("/dashboard")} className="w-full">
            Go to Dashboard Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

