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
import { Loader2, Plus, Trash2, Upload } from "lucide-react"

interface Insurance {
  provider: string
  policyNumber: string
  groupNumber: string
  policyHolder: string
  relationship: string
  phone: string
  hasCardImage: boolean
}

export default function InsurancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [insurances, setInsurances] = useState<Insurance[]>([])
  const [newInsurance, setNewInsurance] = useState<Insurance>({
    provider: "",
    policyNumber: "",
    groupNumber: "",
    policyHolder: "",
    relationship: "self",
    phone: "",
    hasCardImage: false,
  })

  useEffect(() => {
    // Load existing data if available
    const profileData = localStorage.getItem("careid_profile")
    if (profileData) {
      const parsedData = JSON.parse(profileData)
      if (parsedData.insurance) {
        setInsurances(parsedData.insurance)
      }
    }
  }, [])

  const handleNewInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewInsurance((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewInsurance((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Mock file upload function
  const handleFileUpload = () => {
    setNewInsurance((prev) => ({
      ...prev,
      hasCardImage: true,
    }))

    toast({
      title: "Insurance card uploaded",
      description: "Your insurance card image has been uploaded successfully.",
    })
  }

  const addInsurance = () => {
    if (newInsurance.provider && newInsurance.policyNumber) {
      setInsurances((prev) => [...prev, { ...newInsurance }])
      setNewInsurance({
        provider: "",
        policyNumber: "",
        groupNumber: "",
        policyHolder: "",
        relationship: "self",
        phone: "",
        hasCardImage: false,
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in at least the insurance provider and policy number.",
        variant: "destructive",
      })
    }
  }

  const removeInsurance = (index: number) => {
    setInsurances((prev) => prev.filter((_, i) => i !== index))
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
          insurance: insurances,
        }),
      )

      setIsLoading(false)
      toast({
        title: "Insurance information saved",
        description: "Your insurance information has been updated successfully.",
      })

      router.push("/dashboard/settings")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Insurance Information</h1>
        <p className="text-muted-foreground">Add your health insurance details for emergency situations</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Insurance</CardTitle>
            <CardDescription>Add your health insurance information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Insurance Provider</Label>
                <Input
                  id="provider"
                  name="provider"
                  value={newInsurance.provider}
                  onChange={handleNewInsuranceChange}
                  placeholder="e.g., Blue Cross Blue Shield"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy/Member ID</Label>
                <Input
                  id="policyNumber"
                  name="policyNumber"
                  value={newInsurance.policyNumber}
                  onChange={handleNewInsuranceChange}
                  placeholder="e.g., XYZ123456789"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groupNumber">Group Number (Optional)</Label>
                <Input
                  id="groupNumber"
                  name="groupNumber"
                  value={newInsurance.groupNumber}
                  onChange={handleNewInsuranceChange}
                  placeholder="e.g., 12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Insurance Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={newInsurance.phone}
                  onChange={handleNewInsuranceChange}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyHolder">Policy Holder Name</Label>
                <Input
                  id="policyHolder"
                  name="policyHolder"
                  value={newInsurance.policyHolder}
                  onChange={handleNewInsuranceChange}
                  placeholder="e.g., John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship to Policy Holder</Label>
                <Select
                  value={newInsurance.relationship}
                  onValueChange={(value) => handleSelectChange("relationship", value)}
                >
                  <SelectTrigger id="relationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Insurance Card (Front & Back)</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop your insurance card images here, or click to select files
                </p>
                <p className="text-xs text-muted-foreground mt-1">JPG or PNG up to 5MB</p>
                <Button type="button" variant="outline" className="mt-4" onClick={handleFileUpload}>
                  Select Files
                </Button>
              </div>
              {newInsurance.hasCardImage && (
                <p className="text-sm text-green-600">Insurance card uploaded successfully</p>
              )}
            </div>

            <Button type="button" onClick={addInsurance} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Insurance
            </Button>
          </CardContent>
        </Card>

        {insurances.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Insurance Plans</CardTitle>
              <CardDescription>Your health insurance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insurances.map((insurance, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">{insurance.provider}</p>
                    <p className="text-sm">Policy/Member ID: {insurance.policyNumber}</p>
                    {insurance.groupNumber && <p className="text-sm">Group: {insurance.groupNumber}</p>}
                    {insurance.policyHolder && (
                      <p className="text-sm">
                        Policy Holder: {insurance.policyHolder}
                        {insurance.relationship !== "self" && ` (${insurance.relationship})`}
                      </p>
                    )}
                    {insurance.phone && <p className="text-sm">Phone: {insurance.phone}</p>}
                    {insurance.hasCardImage && <p className="text-xs text-green-600 mt-1">Card image uploaded</p>}
                  </div>
                  <Button type="button" onClick={() => removeInsurance(index)} variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove insurance</span>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="text-muted-foreground mb-2">No insurance information added yet</div>
              <p className="text-sm text-muted-foreground">
                Add your health insurance details for emergency situations
              </p>
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

