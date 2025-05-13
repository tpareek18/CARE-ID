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
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Plus, Trash2, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface MedicalInfo {
  height: string
  weight: string
  bloodType: string
  allergies: string[]
  medications: {
    name: string
    dosage: string
    frequency: string
  }[]
  conditions: string[]
  dnrStatus: boolean
  advancedDirectives: {
    name: string
    type: string
  }[]
  labReports: {
    name: string
    date: string
    type: string
  }[]
}

export default function MedicalInfoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [newAllergy, setNewAllergy] = useState("")
  const [newCondition, setNewCondition] = useState("")
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  })

  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    height: "",
    weight: "",
    bloodType: "",
    allergies: [],
    medications: [],
    conditions: [],
    dnrStatus: false,
    advancedDirectives: [],
    labReports: [],
  })

  useEffect(() => {
    // Load existing data if available
    const profileData = localStorage.getItem("careid_profile")
    if (profileData) {
      const parsedData = JSON.parse(profileData)
      if (parsedData.medicalInfo) {
        setMedicalInfo(parsedData.medicalInfo)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()],
      }))
      setNewAllergy("")
    }
  }

  const removeAllergy = (index: number) => {
    setMedicalInfo((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }))
  }

  const addCondition = () => {
    if (newCondition.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newCondition.trim()],
      }))
      setNewCondition("")
    }
  }

  const removeCondition = (index: number) => {
    setMedicalInfo((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }))
  }

  const addMedication = () => {
    if (newMedication.name.trim() && newMedication.dosage.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        medications: [...prev.medications, { ...newMedication }],
      }))
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
      })
    }
  }

  const removeMedication = (index: number) => {
    setMedicalInfo((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
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
          medicalInfo,
        }),
      )

      setIsLoading(false)
      toast({
        title: "Medical information saved",
        description: "Your medical information has been updated successfully.",
      })

      router.push("/dashboard/emergency-contacts")
    }, 1000)
  }

  // Mock file upload function
  const handleFileUpload = (type: "directive" | "lab") => {
    // In a real app, this would handle file uploads
    if (type === "directive") {
      setMedicalInfo((prev) => ({
        ...prev,
        advancedDirectives: [
          ...prev.advancedDirectives,
          { name: `Advanced Directive ${prev.advancedDirectives.length + 1}.pdf`, type: "PDF" },
        ],
      }))
    } else {
      setMedicalInfo((prev) => ({
        ...prev,
        labReports: [
          ...prev.labReports,
          {
            name: `Lab Report ${prev.labReports.length + 1}.pdf`,
            date: new Date().toISOString().split("T")[0],
            type: "PDF",
          },
        ],
      }))
    }

    toast({
      title: "File uploaded",
      description: "Your file has been uploaded successfully.",
    })
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
          <h1 className="text-2xl font-bold tracking-tight">Medical Information</h1>
          <p className="text-muted-foreground">Provide your medical details for emergency situations</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Health</TabsTrigger>
          <TabsTrigger value="allergies">Allergies & Medications</TabsTrigger>
          <TabsTrigger value="directives">Advanced Directives</TabsTrigger>
          <TabsTrigger value="reports">Lab Reports</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Health Information</CardTitle>
                <CardDescription>Enter your basic health measurements and blood type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      name="height"
                      value={medicalInfo.height}
                      onChange={handleChange}
                      placeholder="e.g., 5'10&quot; or 178 cm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      name="weight"
                      value={medicalInfo.weight}
                      onChange={handleChange}
                      placeholder="e.g., 160 lbs or 73 kg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={medicalInfo.bloodType}
                      onValueChange={(value) => handleSelectChange("bloodType", value)}
                    >
                      <SelectTrigger id="bloodType">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conditions">Medical Conditions</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {medicalInfo.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {condition}
                        <button
                          type="button"
                          onClick={() => removeCondition(index)}
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove {condition}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="newCondition"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      placeholder="Add a medical condition"
                      className="flex-1"
                    />
                    <Button type="button" onClick={addCondition} variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add condition</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allergies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
                <CardDescription>
                  List any allergies you have, especially those that could cause severe reactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {medicalInfo.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {allergy}
                        <button
                          type="button"
                          onClick={() => removeAllergy(index)}
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove {allergy}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="newAllergy"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      placeholder="Add an allergy"
                      className="flex-1"
                    />
                    <Button type="button" onClick={addAllergy} variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add allergy</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medications</CardTitle>
                <CardDescription>List any medications you are currently taking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicalInfo.medications.length > 0 && (
                  <div className="space-y-4">
                    {medicalInfo.medications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{medication.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage} • {medication.frequency}
                          </p>
                        </div>
                        <Button type="button" onClick={() => removeMedication(index)} variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove medication</span>
                        </Button>
                      </div>
                    ))}
                    <Separator />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicationName">Medication Name</Label>
                      <Input
                        id="medicationName"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Lisinopril"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicationDosage">Dosage</Label>
                      <Input
                        id="medicationDosage"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                        placeholder="e.g., 10mg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicationFrequency">Frequency</Label>
                      <Input
                        id="medicationFrequency"
                        value={newMedication.frequency}
                        onChange={(e) => setNewMedication((prev) => ({ ...prev, frequency: e.target.value }))}
                        placeholder="e.g., Once daily"
                      />
                    </div>
                  </div>

                  <Button type="button" onClick={addMedication} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medication
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="directives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Directives</CardTitle>
                <CardDescription>Specify your wishes for medical care in case you cannot communicate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dnrStatus"
                    checked={medicalInfo.dnrStatus}
                    onCheckedChange={(checked) => handleSwitchChange("dnrStatus", checked)}
                  />
                  <Label htmlFor="dnrStatus" className="font-medium">
                    DNR/DNI Status (Do Not Resuscitate/Do Not Intubate)
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Selecting this indicates you have a DNR/DNI order. Please upload the official documentation below.
                </p>

                <div className="space-y-2">
                  <Label>Upload Advanced Directives</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop your files here, or click to select files
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG up to 10MB</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => handleFileUpload("directive")}
                    >
                      Select Files
                    </Button>
                  </div>
                </div>

                {medicalInfo.advancedDirectives.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Documents</Label>
                    <div className="space-y-2">
                      {medicalInfo.advancedDirectives.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.type}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove document</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lab Reports</CardTitle>
                <CardDescription>Upload recent lab reports and medical test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop your lab reports here, or click to select files
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG up to 10MB</p>
                  <Button type="button" variant="outline" className="mt-4" onClick={() => handleFileUpload("lab")}>
                    Select Files
                  </Button>
                </div>

                {medicalInfo.labReports.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Lab Reports</Label>
                    <div className="space-y-2">
                      {medicalInfo.labReports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Date: {report.date} • {report.type}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove report</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4 mt-4">
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
      </Tabs>
    </div>
  )
}

