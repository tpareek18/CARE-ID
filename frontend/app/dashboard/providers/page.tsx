"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2 } from "lucide-react"

interface Provider {
  name: string
  specialty: string
  phone: string
  email: string
  address: string
}

export default function ProvidersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [newProvider, setNewProvider] = useState<Provider>({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    // Load existing data if available
    const profileData = localStorage.getItem("careid_profile")
    if (profileData) {
      const parsedData = JSON.parse(profileData)
      if (parsedData.providers) {
        setProviders(parsedData.providers)
      }
    }
  }, [])

  const handleNewProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProvider((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSpecialtyChange = (value: string) => {
    setNewProvider((prev) => ({
      ...prev,
      specialty: value,
    }))
  }

  const addProvider = () => {
    if (newProvider.name && newProvider.specialty && newProvider.phone) {
      setProviders((prev) => [...prev, { ...newProvider }])
      setNewProvider({
        name: "",
        specialty: "",
        phone: "",
        email: "",
        address: "",
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in at least name, specialty, and phone number.",
        variant: "destructive",
      })
    }
  }

  const removeProvider = (index: number) => {
    setProviders((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      const existingData = localStorage.getItem("careid_profile")
      const profileData = existingData ? JSON.parse(existingData) : {}

      localStorage.setItem(
        "careid_profile",
        JSON.stringify({
          ...profileData,
          providers,
        }),
      )

      setIsLoading(false)
      toast({
        title: "Healthcare providers saved",
        description: "Your healthcare providers have been updated successfully.",
      })

      router.push("/dashboard/insurance")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Healthcare Providers</h1>
        <p className="text-muted-foreground">Add your doctors, specialists, and other healthcare providers</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Healthcare Provider</CardTitle>
            <CardDescription>Add your primary care physician and specialists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Provider Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProvider.name}
                  onChange={handleNewProviderChange}
                  placeholder="Dr. Jane Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select value={newProvider.specialty} onValueChange={handleSpecialtyChange}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Care</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={newProvider.phone}
                  onChange={handleNewProviderChange}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newProvider.email}
                  onChange={handleNewProviderChange}
                  placeholder="dr.smith@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                name="address"
                value={newProvider.address}
                onChange={handleNewProviderChange}
                placeholder="123 Medical Center Dr, City, State ZIP"
              />
            </div>

            <Button type="button" onClick={addProvider} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Provider
            </Button>
          </CardContent>
        </Card>

        {providers.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Healthcare Providers</CardTitle>
              <CardDescription>Your doctors and specialists</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {providers.map((provider, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {provider.specialty === "primary" ? "Primary Care" : provider.specialty}
                    </p>
                    <p className="text-sm">{provider.phone}</p>
                    {provider.email && <p className="text-sm">{provider.email}</p>}
                    {provider.address && <p className="text-sm text-muted-foreground">{provider.address}</p>}
                  </div>
                  <Button type="button" onClick={() => removeProvider(index)} variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove provider</span>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="text-muted-foreground mb-2">No healthcare providers added yet</div>
              <p className="text-sm text-muted-foreground">Add your primary care physician and specialists</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save & Continue"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

