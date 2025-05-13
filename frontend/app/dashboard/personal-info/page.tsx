"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react"

interface PersonalInfo {
  firstName: string
  lastName: string
  middleName: string
  preferredName: string
  pronouns: string
  dateOfBirth: Date | null
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactInfo: {
    email: string
    phone: string
  }
}

export default function PersonalInfoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    pronouns: "",
    dateOfBirth: null,
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    contactInfo: {
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    // Load existing data if available
    const profileData = localStorage.getItem("careid_profile")
    if (profileData) {
      const parsedData = JSON.parse(profileData)
      if (parsedData.personalInfo) {
        // Convert string date back to Date object if it exists
        const personalInfoData = {
          ...parsedData.personalInfo,
          dateOfBirth: parsedData.personalInfo.dateOfBirth ? new Date(parsedData.personalInfo.dateOfBirth) : null,
        }
        setPersonalInfo(personalInfoData)
      }
    }

    // Load email from user data
    const userData = localStorage.getItem("careid_user")
    if (userData) {
      const { email } = JSON.parse(userData)
      setPersonalInfo((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          email: email || prev.contactInfo.email,
        },
      }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested objects
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setPersonalInfo((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setPersonalInfo((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setPersonalInfo((prev) => ({
      ...prev,
      dateOfBirth: date || null,
    }))
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
          personalInfo,
        }),
      )

      setIsLoading(false)
      toast({
        title: "Personal information saved",
        description: "Your personal information has been updated successfully.",
      })

      router.push("/dashboard/medical-info")
    }, 1000)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Personal Information</h1>
          <p className="text-muted-foreground">Provide your basic personal details and contact information</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter your personal details that will be used for identification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input id="middleName" name="middleName" value={personalInfo.middleName} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredName">Preferred Name</Label>
                    <Input
                      id="preferredName"
                      name="preferredName"
                      value={personalInfo.preferredName}
                      onChange={handleChange}
                      placeholder="What you prefer to be called"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pronouns">Pronouns</Label>
                    <Select
                      value={personalInfo.pronouns}
                      onValueChange={(value) => handleSelectChange("pronouns", value)}
                    >
                      <SelectTrigger id="pronouns">
                        <SelectValue placeholder="Select your pronouns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {personalInfo.dateOfBirth ? (
                            format(personalInfo.dateOfBirth, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={personalInfo.dateOfBirth || undefined}
                          onSelect={handleDateChange}
                          initialFocus
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>Enter your home address for emergency services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address*</Label>
                  <Input
                    id="street"
                    name="address.street"
                    value={personalInfo.address.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      name="address.city"
                      value={personalInfo.address.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province*</Label>
                    <Input
                      id="state"
                      name="address.state"
                      value={personalInfo.address.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip/Postal Code*</Label>
                    <Input
                      id="zipCode"
                      name="address.zipCode"
                      value={personalInfo.address.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country*</Label>
                    <Input
                      id="country"
                      name="address.country"
                      value={personalInfo.address.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How emergency services can contact you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    name="contactInfo.email"
                    type="email"
                    value={personalInfo.contactInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    name="contactInfo.phone"
                    type="tel"
                    value={personalInfo.contactInfo.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" type="button" onClick={handleBack}>
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
      </Tabs>
    </div>
  )
}

