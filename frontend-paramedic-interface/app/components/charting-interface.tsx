"use client"

import { useState, useRef } from "react"
import {
  ClipboardList,
  Save,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Heart,
  Pill,
  Send,
  ArrowLeft,
  RefreshCw,
  ClipboardCheck,
  FileText,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ChartingInterface() {
  const [activeTab, setActiveTab] = useState("ems")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    vitals: true,
    assessment: true,
    interventions: false,
    medications: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferComplete, setTransferComplete] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<string>("")

  // Add state for the summary dialog and generated summary
  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const [generatingSummary, setGeneratingSummary] = useState(false)
  const [generatedSummary, setGeneratedSummary] = useState("")
  const summaryTextareaRef = useRef<HTMLTextAreaElement>(null)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving process
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      // Reset saved status after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleTransfer = () => {
    setIsTransferring(true)
    // Simulate transfer process
    setTimeout(() => {
      setIsTransferring(false)
      setTransferComplete(true)
    }, 2000)
  }

  // Add function to generate summary
  const generateSummary = () => {
    setGeneratingSummary(true)

    // Simulate summary generation (in a real app, this would pull from actual patient data)
    setTimeout(() => {
      const summary = `CHIEF COMPLAINT: 78-year-old male with history of CHF, diabetes, hypertension, and atrial fibrillation presenting with progressive shortness of breath and chest pain for the past 24 hours.

HISTORY OF PRESENT ILLNESS: Patient reports worsening symptoms with exertion and when lying flat. Symptoms began yesterday evening and have progressively worsened. Denies fever, cough, or recent illness. Patient has a history of similar episodes in the past related to CHF exacerbation.

PAST MEDICAL HISTORY:
- Congestive Heart Failure (diagnosed 2015)
- Type 2 Diabetes (diagnosed 2010)
- Hypertension (diagnosed 2008)
- Atrial Fibrillation (diagnosed 2018)
- Pacemaker placement (2019)

ALLERGIES:
- Penicillin (Severe - Anaphylaxis)
- Sulfa Drugs (Moderate - Rash)
- Contrast Dye (Moderate - Breathing difficulty)

CURRENT MEDICATIONS:
- Metformin 1000mg twice daily
- Lisinopril 20mg once daily
- Warfarin 5mg once daily
- Furosemide 40mg once daily
- Atorvastatin 40mg once daily at bedtime

VITAL SIGNS:
- BP: 158/92
- HR: 88
- RR: 22
- SpO2: 92% on room air
- Temp: 98.6°F

ASSESSMENT: Patient presenting with symptoms consistent with CHF exacerbation. Vital signs show mild hypertension, tachypnea, and hypoxia. Patient has DNR/DNI status.

PLAN:
1. Supplemental oxygen to maintain SpO2 > 94%
2. IV Furosemide 80mg
3. Obtain CXR, ECG, BNP, CBC, CMP
4. Monitor I/O
5. Consider cardiology consult if no improvement with initial treatment`

      setGeneratedSummary(summary)
      setGeneratingSummary(false)
    }, 1500)
  }

  // Add function to copy summary to clipboard
  const copySummaryToClipboard = () => {
    if (summaryTextareaRef.current) {
      summaryTextareaRef.current.select()
      document.execCommand("copy")
    }
  }

  // Add function to insert summary into current note
  const insertSummaryIntoNote = () => {
    // In a real app, this would insert the text into the active note field
    setShowSummaryDialog(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Patient Charting</h1>
          </div>
          <Badge variant="destructive" className="uppercase font-bold">
            DNR
          </Badge>
        </div>

        {/* Patient Basic Info */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Robert Johnson</h2>
                <p className="text-muted-foreground">78 years old • Male • ID: CID-78392-RJ</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <Badge variant="outline" className="bg-blue-50">
                  Blood Type: A+
                </Badge>
                <Badge variant="outline" className="bg-blue-50">
                  Weight: 82kg
                </Badge>
                <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700">
                  Allergies: Penicillin, Sulfa
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different charting interfaces */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="ems">EMS Charting</TabsTrigger>
            <TabsTrigger value="ed">ED Physician Charting</TabsTrigger>
          </TabsList>

          {/* EMS Charting Tab */}
          <TabsContent value="ems" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="bg-blue-600 text-white rounded-t-lg pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  EMS Patient Care Report
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Document pre-hospital care and patient information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Incident Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-date">Incident Date/Time</Label>
                    <Input id="incident-date" type="datetime-local" defaultValue="2024-03-13T14:30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incident-location">Incident Location</Label>
                    <Input id="incident-location" placeholder="Address or location description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dispatch-reason">Dispatch Reason</Label>
                    <Select>
                      <SelectTrigger id="dispatch-reason">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chest-pain">Chest Pain</SelectItem>
                        <SelectItem value="shortness-breath">Shortness of Breath</SelectItem>
                        <SelectItem value="fall">Fall</SelectItem>
                        <SelectItem value="altered-mental">Altered Mental Status</SelectItem>
                        <SelectItem value="syncope">Syncope</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="response-type">Response Type</Label>
                    <Select>
                      <SelectTrigger id="response-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency (Lights & Sirens)</SelectItem>
                        <SelectItem value="non-emergency">Non-Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Vitals Section */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleSection("vitals")}
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-600" />
                      <h3 className="font-semibold">Vital Signs</h3>
                    </div>
                    {expandedSections.vitals ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>

                  {expandedSections.vitals && (
                    <div className="px-4 pb-4 pt-0 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">Time Recorded:</Label>
                        <Input type="time" className="w-32" defaultValue="14:35" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="bp" className="text-sm">
                            Blood Pressure
                          </Label>
                          <div className="flex gap-1">
                            <Input id="bp-systolic" placeholder="Systolic" className="w-1/2" />
                            <span className="flex items-center">/</span>
                            <Input id="bp-diastolic" placeholder="Diastolic" className="w-1/2" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="pulse" className="text-sm">
                            Pulse (bpm)
                          </Label>
                          <Input id="pulse" placeholder="Heart rate" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="resp" className="text-sm">
                            Resp Rate
                          </Label>
                          <Input id="resp" placeholder="Breaths/min" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="spo2" className="text-sm">
                            SpO2 (%)
                          </Label>
                          <Input id="spo2" placeholder="Oxygen saturation" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="temp" className="text-sm">
                            Temperature
                          </Label>
                          <Input id="temp" placeholder="°F" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="gcs" className="text-sm">
                            GCS
                          </Label>
                          <Input id="gcs" placeholder="3-15" />
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button size="sm" variant="outline">
                          Add Vitals Set
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assessment Section */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleSection("assessment")}
                  >
                    <div className="flex items-center space-x-3">
                      <ClipboardList className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Assessment</h3>
                    </div>
                    {expandedSections.assessment ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.assessment && (
                    <div className="px-4 pb-4 pt-0 border-t">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="chief-complaint" className="text-sm">
                            Chief Complaint
                          </Label>
                          <Input id="chief-complaint" placeholder="Patient's primary complaint" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="history" className="text-sm">
                            History of Present Illness
                          </Label>
                          <Textarea
                            id="history"
                            placeholder="Describe the history of the current complaint"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm">Physical Exam Findings</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exam-neuro" />
                              <Label htmlFor="exam-neuro" className="text-sm font-normal">
                                Neurological
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exam-cardiac" />
                              <Label htmlFor="exam-cardiac" className="text-sm font-normal">
                                Cardiac
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exam-resp" />
                              <Label htmlFor="exam-resp" className="text-sm font-normal">
                                Respiratory
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exam-abd" />
                              <Label htmlFor="exam-abd" className="text-sm font-normal">
                                Abdominal
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exam-msk" />
                              <Label htmlFor="exam-msk" className="text-sm font-normal">
                                Musculoskeletal
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exam-skin" />
                              <Label htmlFor="exam-skin" className="text-sm font-normal">
                                Skin
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="exam-notes" className="text-sm">
                            Exam Notes
                          </Label>
                          <Textarea
                            id="exam-notes"
                            placeholder="Detailed findings from physical examination"
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interventions Section */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleSection("interventions")}
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">Interventions</h3>
                    </div>
                    {expandedSections.interventions ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.interventions && (
                    <div className="px-4 pb-4 pt-0 border-t">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="int-oxygen" />
                            <Label htmlFor="int-oxygen" className="text-sm font-normal">
                              Oxygen
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="int-iv" />
                            <Label htmlFor="int-iv" className="text-sm font-normal">
                              IV Access
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="int-cardiac" />
                            <Label htmlFor="int-cardiac" className="text-sm font-normal">
                              Cardiac Monitor
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="int-cpap" />
                            <Label htmlFor="int-cpap" className="text-sm font-normal">
                              CPAP
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="int-splint" />
                            <Label htmlFor="int-splint" className="text-sm font-normal">
                              Splinting
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="int-spine" />
                            <Label htmlFor="int-spine" className="text-sm font-normal">
                              Spinal Immobilization
                            </Label>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="intervention-notes" className="text-sm">
                            Intervention Details
                          </Label>
                          <Textarea
                            id="intervention-notes"
                            placeholder="Describe interventions performed"
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Medications Section */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleSection("medications")}
                  >
                    <div className="flex items-center space-x-3">
                      <Pill className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold">Medications Administered</h3>
                    </div>
                    {expandedSections.medications ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.medications && (
                    <div className="px-4 pb-4 pt-0 border-t">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="med-name" className="text-sm">
                              Medication
                            </Label>
                            <Select>
                              <SelectTrigger id="med-name">
                                <SelectValue placeholder="Select medication" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="aspirin">Aspirin</SelectItem>
                                <SelectItem value="nitroglycerin">Nitroglycerin</SelectItem>
                                <SelectItem value="albuterol">Albuterol</SelectItem>
                                <SelectItem value="epinephrine">Epinephrine</SelectItem>
                                <SelectItem value="morphine">Morphine</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="med-dose" className="text-sm">
                              Dose
                            </Label>
                            <Input id="med-dose" placeholder="Amount and units" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="med-route" className="text-sm">
                              Route
                            </Label>
                            <Select>
                              <SelectTrigger id="med-route">
                                <SelectValue placeholder="Select route" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="iv">IV</SelectItem>
                                <SelectItem value="im">IM</SelectItem>
                                <SelectItem value="po">PO</SelectItem>
                                <SelectItem value="sl">SL</SelectItem>
                                <SelectItem value="in">IN</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline">
                            Add Medication
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="med-notes" className="text-sm">
                            Medication Notes
                          </Label>
                          <Textarea
                            id="med-notes"
                            placeholder="Additional information about medications"
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Transport Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Transport Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transport-destination">Destination</Label>
                      <Select>
                        <SelectTrigger id="transport-destination">
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carle">Carle Foundation Hospital</SelectItem>
                          <SelectItem value="osf">OSF HealthCare</SelectItem>
                          <SelectItem value="riverside">Riverside Medical Center</SelectItem>
                          <SelectItem value="sarah">Sarah Bush Lincoln Health Center</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transport-priority">Transport Priority</Label>
                      <Select>
                        <SelectTrigger id="transport-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency (Lights & Sirens)</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="non-emergency">Non-Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              {/* Add the Generate Summary button to the EMS Charting tab's CardFooter */}
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowSummaryDialog(true)}
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    Generate Summary
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={handleSave}
                    disabled={isSaving || isSaved}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : isSaved ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Report
                      </>
                    )}
                  </Button>
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={() => setShowTransferDialog(true)}
                  >
                    <Send className="h-4 w-4" />
                    Transfer to ED
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ED Physician Charting Tab */}
          <TabsContent value="ed" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="bg-purple-600 text-white rounded-t-lg pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  ED Physician Documentation
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Emergency department clinical documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Alert for imported EMS data */}
                <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">EMS Data Imported</p>
                    <p className="text-sm text-green-700">
                      Pre-hospital care data has been imported from EMS. Review and confirm information.
                    </p>
                  </div>
                </div>

                {/* CareID Data Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">CareID Data Available</p>
                    <p className="text-sm text-blue-700">
                      Patient information from CareID has been imported. Medical history, allergies, and medications are
                      available.
                    </p>
                  </div>
                </div>

                {/* Epic Integration Alert */}
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Epic Integration Available</p>
                    <p className="text-sm text-amber-700">
                      This patient has records in Epic. Connect to view complete medical history.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Connect to Epic
                    </Button>
                  </div>
                </div>

                {/* ED Documentation Sections */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ed-chief-complaint">Chief Complaint</Label>
                    <Input
                      id="ed-chief-complaint"
                      defaultValue="Shortness of breath, chest pain"
                      className="font-medium"
                    />
                    <p className="text-xs text-muted-foreground">Imported from EMS report</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ed-arrival-time">Arrival Time</Label>
                      <Input id="ed-arrival-time" type="datetime-local" defaultValue="2024-03-13T15:10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ed-triage">Triage Level</Label>
                      <Select defaultValue="2">
                        <SelectTrigger id="ed-triage">
                          <SelectValue placeholder="Select triage level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Level 1 - Resuscitation</SelectItem>
                          <SelectItem value="2">Level 2 - Emergent</SelectItem>
                          <SelectItem value="3">Level 3 - Urgent</SelectItem>
                          <SelectItem value="4">Level 4 - Less Urgent</SelectItem>
                          <SelectItem value="5">Level 5 - Non-Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ed-hpi">History of Present Illness</Label>
                    <Textarea
                      id="ed-hpi"
                      className="min-h-[150px]"
                      defaultValue="78-year-old male with history of CHF, diabetes, hypertension, and atrial fibrillation presenting with progressive shortness of breath and chest pain for the past 24 hours. Patient reports worsening symptoms with exertion and when lying flat. Patient has a pacemaker. Patient takes Furosemide, Metformin, Lisinopril, Warfarin, and Atorvastatin regularly."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ed-physical">Physical Examination</Label>
                    <Textarea
                      id="ed-physical"
                      className="min-h-[150px]"
                      placeholder="Document physical examination findings"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ed-assessment">Assessment & Plan</Label>
                    <Textarea
                      id="ed-assessment"
                      className="min-h-[150px]"
                      placeholder="Document assessment and treatment plan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Orders</Label>
                    <div className="bg-white rounded-lg border p-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-cbc" defaultChecked />
                          <Label htmlFor="order-cbc" className="text-sm font-normal">
                            CBC
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-cmp" defaultChecked />
                          <Label htmlFor="order-cmp" className="text-sm font-normal">
                            CMP
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-troponin" defaultChecked />
                          <Label htmlFor="order-troponin" className="text-sm font-normal">
                            Troponin
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-bnp" defaultChecked />
                          <Label htmlFor="order-bnp" className="text-sm font-normal">
                            BNP
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-cxr" defaultChecked />
                          <Label htmlFor="order-cxr" className="text-sm font-normal">
                            Chest X-Ray
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-ecg" defaultChecked />
                          <Label htmlFor="order-ecg" className="text-sm font-normal">
                            ECG
                          </Label>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="outline">
                          Add Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              {/* Add the Generate Summary button to the ED Physician tab's CardFooter */}
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowSummaryDialog(true)}
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    Generate Summary
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={handleSave}
                    disabled={isSaving || isSaved}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : isSaved ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Documentation
                      </>
                    )}
                  </Button>
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={() => setShowTransferDialog(true)}
                  >
                    <Send className="h-4 w-4" />
                    Submit to Epic
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Documentation</DialogTitle>
            <DialogDescription>
              {activeTab === "ems"
                ? "Transfer EMS report to hospital electronic health record system."
                : "Submit documentation to Epic electronic health record system."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!transferComplete ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="transfer-system">Select System</Label>
                  <Select onValueChange={setSelectedSystem}>
                    <SelectTrigger id="transfer-system">
                      <SelectValue placeholder="Select destination system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="cerner">Cerner</SelectItem>
                      <SelectItem value="meditech">Meditech</SelectItem>
                      <SelectItem value="allscripts">Allscripts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transfer-notes">Additional Notes</Label>
                  <Textarea id="transfer-notes" placeholder="Any additional information for receiving system" />
                </div>
              </>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-center">Transfer Complete</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Documentation has been successfully transferred to {selectedSystem}.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            {!transferComplete ? (
              <>
                <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTransfer} disabled={isTransferring || !selectedSystem}>
                  {isTransferring ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Transferring...
                    </>
                  ) : (
                    "Transfer"
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setShowTransferDialog(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Dialog */}
      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Patient Summary Generator
            </DialogTitle>
            <DialogDescription>
              Automatically generate a comprehensive patient summary based on available information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!generatedSummary && !generatingSummary ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Summary Generator</p>
                    <p className="text-sm text-blue-700">
                      This tool will generate a comprehensive clinical summary including chief complaint, history of
                      present illness, past medical history, allergies, medications, vital signs, assessment, and plan.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Select Information to Include:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-cc" defaultChecked />
                      <Label htmlFor="include-cc" className="text-sm font-normal">
                        Chief Complaint
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-hpi" defaultChecked />
                      <Label htmlFor="include-hpi" className="text-sm font-normal">
                        History of Present Illness
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-pmh" defaultChecked />
                      <Label htmlFor="include-pmh" className="text-sm font-normal">
                        Past Medical History
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-allergies" defaultChecked />
                      <Label htmlFor="include-allergies" className="text-sm font-normal">
                        Allergies
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-meds" defaultChecked />
                      <Label htmlFor="include-meds" className="text-sm font-normal">
                        Current Medications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-vitals" defaultChecked />
                      <Label htmlFor="include-vitals" className="text-sm font-normal">
                        Vital Signs
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-assessment" defaultChecked />
                      <Label htmlFor="include-assessment" className="text-sm font-normal">
                        Assessment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-plan" defaultChecked />
                      <Label htmlFor="include-plan" className="text-sm font-normal">
                        Plan
                      </Label>
                    </div>
                  </div>
                </div>
                <Button className="w-full" onClick={generateSummary}>
                  Generate Summary
                </Button>
              </div>
            ) : generatingSummary ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-4">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-center">Generating comprehensive patient summary...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Summary Generated</p>
                    <p className="text-sm text-green-700">
                      A comprehensive clinical summary has been generated based on the patient's information. You can
                      copy this text or insert it directly into your documentation.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generated-summary">Generated Summary</Label>
                  <Textarea
                    id="generated-summary"
                    ref={summaryTextareaRef}
                    value={generatedSummary}
                    className="h-[300px] font-mono text-sm"
                    readOnly
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={copySummaryToClipboard}>
                    Copy to Clipboard
                  </Button>
                  <Button className="flex-1" onClick={insertSummaryIntoNote}>
                    Insert into Note
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSummaryDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

