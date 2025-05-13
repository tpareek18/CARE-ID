import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome to CareID</h1>
        <p className="text-xl text-gray-600">Your secure medical information portal for emergencies</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Create your secure CareID account to store your critical medical information for emergency situations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Why CareID?</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Quick access to your critical medical information</li>
              <li>Secure storage of your health records</li>
              <li>Accessible by emergency medical professionals</li>
              <li>You control what information is shared</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/signup">Create Account</Link>
          </Button>
          <div className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

