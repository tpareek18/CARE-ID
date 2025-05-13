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

interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email: string
}

export default function EmergencyContactsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: "",
    relationship: "",
    phone: "",
    email: "",
  })

  useEffect(() => {
    // Load existing data if available
    const profileData = localStorage.getItem("careid_profile")
    if (profileData) {
      const parsedData = JSON.parse(profileData)
      if (parsedData.emergencyContacts) {
        setContacts(parsedData.emergencyContacts)
      }
    }
  }, [])

  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContact((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRelationshipChange = (value: string) => {
    setNewContact((prev) => ({
      ...prev,
      relationship: value,
    }))
  }

  const addContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      setContacts((prev) => [...prev, { ...newContact }])
      setNewContact({
        name: "",
        relationship: "",
        phone: "",
        email: "",
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in at least name, relationship, and phone number.",
        variant: "destructive",
      })
    }
  }

  const removeContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index))
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
          emergencyContacts: contacts,
        }),
      )

      setIsLoading(false)
      toast({
        title: "Emergency contacts saved",
        description: "Your emergency contacts have been updated successfully.",
      })

      router.push("/dashboard/providers")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Emergency Contacts</h1>
        <p className="text-muted-foreground">Add people who should be contacted in case of an emergency</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Emergency Contact</CardTitle>
            <CardDescription>Add people who should be contacted in case of an emergency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newContact.name}
                  onChange={handleNewContactChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select value={newContact.relationship} onValueChange={handleRelationshipChange}>
                  <SelectTrigger id="relationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
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
                  value={newContact.phone}
                  onChange={handleNewContactChange}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newContact.email}
                  onChange={handleNewContactChange}
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <Button type="button" onClick={addContact} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </CardContent>
        </Card>

        {contacts.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Emergency Contacts</CardTitle>
              <CardDescription>These people will be contacted in case of an emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{contact.relationship}</p>
                    <p className="text-sm">{contact.phone}</p>
                    {contact.email && <p className="text-sm">{contact.email}</p>}
                  </div>
                  <Button type="button" onClick={() => removeContact(index)} variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove contact</span>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="text-muted-foreground mb-2">No emergency contacts added yet</div>
              <p className="text-sm text-muted-foreground">Add at least one emergency contact to continue</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || contacts.length === 0}>
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

