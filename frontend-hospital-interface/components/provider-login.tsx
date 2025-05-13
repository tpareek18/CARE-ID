"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock staff data
const staffMembers = {
  docthomas: {
    name: "Dr. Thomas Chen",
    department: "Cardiology",
    role: "Attending Physician",
  },
  docsmith: {
    name: "Dr. Sarah Smith",
    department: "Emergency Medicine",
    role: "Chief Resident",
  },
  docjohnson: {
    name: "Dr. Michael Johnson",
    department: "Neurology",
    role: "Department Head",
  },
  nursewilliams: {
    name: "Nurse Rebecca Williams",
    department: "ICU",
    role: "Head Nurse",
  },
}

export default function ProviderLogin({ staffId }: { staffId: string }) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const staffMember = staffMembers[staffId as keyof typeof staffMembers]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // For this demo, we're only allowing docthomas to login with the hardcoded credentials
    if (staffId === "docthomas" && username === "docthomas" && password === "caresaveslives") {
      router.push("/dashboard")
    } else {
      setError("Invalid provider credentials. Please try again.")
    }
  }

  if (!staffMember) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Staff member not found</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/staff-directory")}>Return to Staff Directory</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Provider Authentication</CardTitle>
        <CardDescription>Welcome, {staffMember.name}. Please enter your provider credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Provider Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter provider username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Provider Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter provider password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login as Provider
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <Button variant="link" size="sm" onClick={() => router.push("/staff-directory")}>
          Not you? Return to directory
        </Button>
        <Button variant="link" size="sm">
          Forgot password?
        </Button>
      </CardFooter>
    </Card>
  )
}

