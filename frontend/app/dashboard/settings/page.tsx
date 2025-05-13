"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PrivacySettings {
  shareBasicInfo: boolean
  shareMedicalConditions: boolean
  shareMedications: boolean
  shareAllergies: boolean
  shareAdvancedDirectives: boolean
  shareEmergencyContacts: boolean
  shareProviders: boolean
  shareInsurance: boolean
}

interface EmergencyNetwork {
  name: string
  type: string
  location: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    shareBasicInfo: true,
    shareMedicalConditions: true,
    shareMedications: true,
    shareAllergies: true,
    shareAdvancedDirectives: true,
    shareEmergencyContacts: true,
    shareProviders: true,
    shareInsurance: false,
  })

  const [networks, setNetworks] = useState<EmergencyNetwork[]>([])
  const [newNetwork, setNewNetwork] = useState<EmergencyNetwork>({
    name: "",
    type: "",
    location: "",
  })

  useEffect(() => {
    // Load existing data if available
    const profileData = localStorage.getItem("careid_profile")
    if (profileData) {
      const parsedData = JSON.parse(profileData)
      if (parsedData.privacySettings) {
        setPrivacySettings(parsedData.privacySettings)
      }
      if (parsedData.networks) {
        setNetworks(parsedData.networks)
      }
    }
  }, [])

  const handleSwitchChange = (name: keyof PrivacySettings, checked: boolean) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleNewNetworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewNetwork((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNetworkTypeChange = (value: string) => {
    setNewNetwork((prev) => ({
      ...prev,
      type: value,
    }))
  }

  const addNetwork = () => {
    if (newNetwork.name && newNetwork.type) {
      setNetworks((prev) => [...prev, { ...newNetwork }])
      setNewNetwork({
        name: "",
        type: "",
        location: "",
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in at least the name and type.",
        variant: "destructive",
      })
    }
  }

  const removeNetwork = (index: number) => {
    setNetworks((prev) => prev.filter((_, i) => i !== index))
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
          privacySettings,
          networks,
        }),
      )

      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your privacy settings and emergency networks have been updated successfully.",
      })

      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Privacy & Network Settings</h1>
        <p className="text-muted-foreground">
          Control what information is shared in emergency situations and add emergency networks
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control what information is shared with emergency medical professionals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareBasicInfo">Basic Information</Label>
                  <p className="text-sm text-muted-foreground">Name, date of birth, and contact information</p>
                </div>
                <Switch
                  id="shareBasicInfo"
                  checked={privacySettings.shareBasicInfo}
                  onCheckedChange={(checked) => handleSwitchChange("shareBasicInfo", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareMedicalConditions">Medical Conditions</Label>
                  <p className="text-sm text-muted-foreground">Your medical conditions and history</p>
                </div>
                <Switch
                  id="shareMedicalConditions"
                  checked={privacySettings.shareMedicalConditions}
                  onCheckedChange={(checked) => handleSwitchChange("shareMedicalConditions", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareMedications">Medications</Label>
                  <p className="text-sm text-muted-foreground">Your current medications and dosages</p>
                </div>
                <Switch
                  id="shareMedications"
                  checked={privacySettings.shareMedications}
                  onCheckedChange={(checked) => handleSwitchChange("shareMedications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareAllergies">Allergies</Label>
                  <p className="text-sm text-muted-foreground">Your allergies and adverse reactions</p>
                </div>
                <Switch
                  id="shareAllergies"
                  checked={privacySettings.shareAllergies}
                  onCheckedChange={(checked) => handleSwitchChange("shareAllergies", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareAdvancedDirectives">Advanced Directives</Label>
                  <p className="text-sm text-muted-foreground">Your DNR/DNI status and advanced directives</p>
                </div>
                <Switch
                  id="shareAdvancedDirectives"
                  checked={privacySettings.shareAdvancedDirectives}
                  onCheckedChange={(checked) => handleSwitchChange("shareAdvancedDirectives", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareEmergencyContacts">Emergency Contacts</Label>
                  <p className="text-sm text-muted-foreground">Your emergency contact information</p>
                </div>
                <Switch
                  id="shareEmergencyContacts"
                  checked={privacySettings.shareEmergencyContacts}
                  onCheckedChange={(checked) => handleSwitchChange("shareEmergencyContacts", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareProviders">Healthcare Providers</Label>
                  <p className="text-sm text-muted-foreground">Your doctors and specialists</p>
                </div>
                <Switch
                  id="shareProviders"
                  checked={privacySettings.shareProviders}
                  onCheckedChange={(checked) => handleSwitchChange("shareProviders", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareInsurance">Insurance Information</Label>
                  <p className="text-sm text-muted-foreground">Your health insurance details</p>
                </div>
                <Switch
                  id="shareInsurance"
                  checked={privacySettings.shareInsurance}
                  onCheckedChange={(checked) => handleSwitchChange("shareInsurance", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Emergency Networks</CardTitle>
            <CardDescription>Add hospitals and ambulance services to your emergency network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Facility/Service Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newNetwork.name}
                    onChange={handleNewNetworkChange}
                    placeholder="e.g., Memorial Hospital"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newNetwork.type} onValueChange={handleNetworkTypeChange}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="emergency-room">Emergency Room</SelectItem>
                      <SelectItem value="ambulance">Ambulance Service</SelectItem>
                      <SelectItem value="urgent-care">Urgent Care</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    name="location"
                    value={newNetwork.location}
                    onChange={handleNewNetworkChange}
                    placeholder="e.g., 123 Main St, City"
                  />
                </div>
              </div>

              <Button type="button" onClick={addNetwork} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add to Network
              </Button>
            </div>

            {networks.length > 0 && (
              <div className="space-y-2 mt-4">
                <Label>Your Emergency Network</Label>
                <div className="space-y-2">
                  {networks.map((network, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{network.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {network.type.replace("-", " ")}
                          {network.location && ` • ${network.location}`}
                        </p>
                      </div>
                      <Button type="button" onClick={() => removeNetwork(index)} variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from network</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
              "Save Settings"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

