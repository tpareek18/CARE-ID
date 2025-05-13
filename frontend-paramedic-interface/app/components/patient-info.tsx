"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Heart,
  Pill,
  Phone,
  FileWarning,
  ChevronDown,
  ChevronUp,
  Send,
  ArrowLeft,
  Clock,
  Lock,
  Check,
  Shield,
  CreditCard,
  Database,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function PatientInfo({
  onNavigateToEpic,
  onNavigateToBilling,
}: {
  onNavigateToEpic?: () => void
  onNavigateToBilling?: () => void
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    conditions: true,
    allergies: true,
    medications: false,
    contacts: false,
    notes: false,
    insurance: true,
  })

  const [transferring, setTransferring] = useState(false)
  const [transferred, setTransferred] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)
  const [showHospitalSelection, setShowHospitalSelection] = useState(false)
  const [securityCode, setSecurityCode] = useState("")
  const [securityError, setSecurityError] = useState(false)
  const [documentAuthorized, setDocumentAuthorized] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleTransfer = () => {
    if (!selectedHospital) {
      setShowHospitalSelection(true)
      return
    }

    setTransferring(true)
    setTimeout(() => {
      setTransferring(false)
      setTransferred(true)
    }, 2000)
  }

  const verifySecurityCode = () => {
    // In a real app, this would validate against a secure backend
    if (securityCode === "1234") {
      setDocumentAuthorized(true)
      setSecurityError(false)
    } else {
      setSecurityError(true)
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="container flex items-center justify-between p-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Patient Information</h1>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Patient Basic Info */}
      <div className="bg-white p-4 border-b border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Robert Johnson</h2>
            <p className="text-muted-foreground">78 years old • Male</p>
            <p className="text-sm text-muted-foreground">ID: CID-78392-RJ</p>
          </div>
          <Badge variant="destructive" className="uppercase font-bold">
            DNR
          </Badge>
        </div>

        <div className="flex items-center mt-3 space-x-2">
          <Badge variant="outline" className="bg-blue-50">
            Blood Type: A+
          </Badge>
          <Badge variant="outline" className="bg-blue-50">
            Weight: 82kg
          </Badge>
          <Badge variant="outline" className="bg-blue-50">
            Height: 175cm
          </Badge>
        </div>

        <div className="flex items-center mt-3 space-x-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            onClick={onNavigateToEpic}
          >
            <Database className="h-4 w-4" />
            Connect to Epic
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            onClick={onNavigateToBilling}
          >
            <DollarSign className="h-4 w-4" />
            Billing Estimate
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="medical" className="flex-1">
        <div className="sticky top-[73px] z-10 bg-white border-b">
          <TabsList className="w-full justify-start px-4 h-12">
            <TabsTrigger value="medical" className="data-[state=active]:bg-primary/10">
              Medical
            </TabsTrigger>
            <TabsTrigger value="insurance" className="data-[state=active]:bg-primary/10">
              Insurance
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-primary/10">
              Contacts
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-primary/10">
              Documents
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="medical" className="p-4 space-y-4 mt-0">
          {/* Critical Info */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">Critical Information</h3>
                  <p className="text-sm text-red-700">Patient has a pacemaker. Do not perform MRI.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Conditions */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleSection("conditions")}
            >
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Medical Conditions</h3>
              </div>
              {expandedSections.conditions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {expandedSections.conditions && (
              <div className="px-4 pb-4 pt-0 border-t">
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Congestive Heart Failure</p>
                      <p className="text-sm text-muted-foreground">Diagnosed 2015</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Type 2 Diabetes</p>
                      <p className="text-sm text-muted-foreground">Diagnosed 2010</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Hypertension</p>
                      <p className="text-sm text-muted-foreground">Diagnosed 2008</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Atrial Fibrillation</p>
                      <p className="text-sm text-muted-foreground">Diagnosed 2018</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Allergies */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleSection("allergies")}
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Allergies</h3>
              </div>
              {expandedSections.allergies ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {expandedSections.allergies && (
              <div className="px-4 pb-4 pt-0 border-t">
                <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-green-800">Verified by Dr. Elizabeth Chen on Jan 10, 2024</p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Penicillin</p>
                      <p className="text-sm text-muted-foreground">Severe - Anaphylaxis</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Sulfa Drugs</p>
                      <p className="text-sm text-muted-foreground">Moderate - Rash</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Contrast Dye</p>
                      <p className="text-sm text-muted-foreground">Moderate - Breathing difficulty</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Medications */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleSection("medications")}
            >
              <div className="flex items-center space-x-3">
                <Pill className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold">Current Medications</h3>
              </div>
              {expandedSections.medications ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {expandedSections.medications && (
              <div className="px-4 pb-4 pt-0 border-t">
                <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-green-800">Verified by Dr. James Wilson on Jan 15, 2024</p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Metformin</p>
                      <p className="text-sm text-muted-foreground">1000mg, twice daily</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Lisinopril</p>
                      <p className="text-sm text-muted-foreground">20mg, once daily</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Warfarin</p>
                      <p className="text-sm text-muted-foreground">5mg, once daily</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Furosemide</p>
                      <p className="text-sm text-muted-foreground">40mg, once daily</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">Atorvastatin</p>
                      <p className="text-sm text-muted-foreground">40mg, once daily at bedtime</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleSection("notes")}
            >
              <div className="flex items-center space-x-3">
                <FileWarning className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Additional Notes</h3>
              </div>
              {expandedSections.notes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {expandedSections.notes && (
              <div className="px-4 pb-4 pt-0 border-t">
                <p className="text-sm">
                  Patient has a history of falls. Last hospitalization was 3 months ago for CHF exacerbation. Patient
                  has a pacemaker implanted in 2019. Patient is on oxygen therapy at home (2L/min). Patient has
                  expressed wishes not to be resuscitated or intubated (DNR/DNI).
                </p>
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm font-medium text-amber-800">
                    Advanced Directive on file. DNR/DNI order confirmed and documented.
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* New Insurance Tab */}
        <TabsContent value="insurance" className="p-4 space-y-4 mt-0">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Primary Insurance</h3>
                  <p className="text-sm text-blue-700">Medicare (Part A & Part B)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medicare Information */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleSection("insurance")}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Medicare Coverage</h3>
              </div>
              {expandedSections.insurance ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {expandedSections.insurance && (
              <div className="px-4 pb-4 pt-0 border-t">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Medicare Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="font-medium">Medicare Number:</p>
                      <p>1EG4-TE5-MK72</p>
                      <p className="font-medium">Effective Date:</p>
                      <p>06/01/2010</p>
                      <p className="font-medium">Part A:</p>
                      <p>Yes (Hospital Insurance)</p>
                      <p className="font-medium">Part B:</p>
                      <p>Yes (Medical Insurance)</p>
                      <p className="font-medium">Part D:</p>
                      <p>Yes (Prescription Drug Coverage)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Medicare Advantage Plan</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="font-medium">Plan Name:</p>
                      <p>Medicare Advantage Complete</p>
                      <p className="font-medium">Provider:</p>
                      <p>Blue Cross Blue Shield</p>
                      <p className="font-medium">Group Number:</p>
                      <p>MA78392</p>
                      <p className="font-medium">Member ID:</p>
                      <p>RJ45678901</p>
                      <p className="font-medium">Customer Service:</p>
                      <p>1-800-555-1234</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Coverage Details</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <p className="font-medium">Hospital Services</p>
                          <p className="text-muted-foreground">
                            $0 copay for first 60 days per benefit period after $1,600 deductible
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <p className="font-medium">Physician Services</p>
                          <p className="text-muted-foreground">20% coinsurance after annual deductible</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <p className="font-medium">Emergency Services</p>
                          <p className="text-muted-foreground">$95 copay per visit (waived if admitted)</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <p className="font-medium">Ambulance Services</p>
                          <p className="text-muted-foreground">$275 copay per one-way trip</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <p className="font-medium">Prescription Drugs</p>
                          <p className="text-muted-foreground">
                            Tier 1: $0-$10, Tier 2: $15-$47, Tier 3: $47-$100, Tier 4: 25%-33%
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm font-medium text-amber-800">
                      Patient has Medicare Secondary Payer (MSP) status. Medicare is primary insurance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Insurance */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold">Secondary Insurance</h3>
              </div>
            </div>
            <div className="px-4 pb-4 pt-0 border-t">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 mt-4">Medigap Policy</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="font-medium">Policy Type:</p>
                    <p>Medigap Plan G</p>
                    <p className="font-medium">Provider:</p>
                    <p>AARP/UnitedHealthcare</p>
                    <p className="font-medium">Policy Number:</p>
                    <p>MG-123456789</p>
                    <p className="font-medium">Effective Date:</p>
                    <p>01/15/2015</p>
                    <p className="font-medium">Customer Service:</p>
                    <p>1-800-555-5678</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Coverage Details</h4>
                  <p className="text-sm mb-2">
                    This Medigap Plan G covers most Medicare Part A and Part B copayments, coinsurance, and deductibles
                    not covered by Medicare.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Part A Coinsurance and Hospital Costs</p>
                        <p className="text-muted-foreground">100% coverage</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Part B Coinsurance or Copayment</p>
                        <p className="text-muted-foreground">100% coverage</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Blood (First 3 pints)</p>
                        <p className="text-muted-foreground">100% coverage</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Part A Hospice Care Coinsurance</p>
                        <p className="text-muted-foreground">100% coverage</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Skilled Nursing Facility Coinsurance</p>
                        <p className="text-muted-foreground">100% coverage</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="p-4 space-y-4 mt-0">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Emergency Contacts</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 pb-3 border-b">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Sarah Johnson (Daughter)</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                    <div className="flex space-x-2 mt-1">
                      <Button size="sm" variant="outline" className="h-8">
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Text
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Michael Johnson (Son)</p>
                    <p className="text-sm">+1 (555) 987-6543</p>
                    <div className="flex space-x-2 mt-1">
                      <Button size="sm" variant="outline" className="h-8">
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Text
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Healthcare Providers</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 pb-3 border-b">
                  <div>
                    <p className="font-medium">Dr. Elizabeth Chen</p>
                    <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                    <p className="text-sm">Riverside Medical Group</p>
                    <p className="text-sm">+1 (555) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div>
                    <p className="font-medium">Dr. James Wilson</p>
                    <p className="text-sm text-muted-foreground">Cardiologist</p>
                    <p className="text-sm">Heart Care Specialists</p>
                    <p className="text-sm">+1 (555) 345-6789</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="p-4 space-y-4 mt-0">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Legal Documents</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <FileWarning className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">DNR Order</p>
                      <p className="text-xs text-muted-foreground">Updated: Jan 15, 2023</p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Secure Document Access
                        </DialogTitle>
                        <DialogDescription>
                          This document contains sensitive legal information. Please enter your provider security code
                          to access.
                        </DialogDescription>
                      </DialogHeader>
                      {!documentAuthorized ? (
                        <>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-center p-4 bg-amber-50 rounded-md">
                              <Lock className="h-10 w-10 text-amber-600" />
                            </div>
                            <Input
                              type="password"
                              placeholder="Enter security code"
                              value={securityCode}
                              onChange={(e) => setSecurityCode(e.target.value)}
                              className={securityError ? "border-red-500" : ""}
                            />
                            {securityError && (
                              <p className="text-sm text-red-500">Invalid security code. Please try again.</p>
                            )}
                          </div>
                          <DialogFooter>
                            <Button onClick={verifySecurityCode}>Verify</Button>
                          </DialogFooter>
                        </>
                      ) : (
                        <div className="space-y-4 py-4">
                          <div className="p-4 bg-slate-50 rounded-md border">
                            <h4 className="font-bold text-lg text-center mb-4">DO NOT RESUSCITATE ORDER</h4>
                            <p className="mb-2">Patient: Robert Johnson</p>
                            <p className="mb-2">DOB: 05/12/1945</p>
                            <p className="mb-4">ID: CID-78392-RJ</p>

                            <p className="mb-4">
                              I, Robert Johnson, being of sound mind, hereby direct that no resuscitation procedures be
                              performed in the event of cardiac or respiratory arrest.
                            </p>

                            <div className="border-t pt-4 mt-4">
                              <p className="font-medium">Physician Authorization:</p>
                              <p>Dr. Elizabeth Chen, MD</p>
                              <p>License: NY12345678</p>
                              <p>Date: January 15, 2023</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <FileWarning className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Advanced Directive</p>
                      <p className="text-xs text-muted-foreground">Updated: Jan 15, 2023</p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Secure Document Access
                        </DialogTitle>
                        <DialogDescription>
                          This document contains sensitive legal information. Please enter your provider security code
                          to access.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Similar security content as above */}
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-center p-4 bg-amber-50 rounded-md">
                          <Lock className="h-10 w-10 text-amber-600" />
                        </div>
                        <Input type="password" placeholder="Enter security code" />
                      </div>
                      <DialogFooter>
                        <Button>Verify</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <FileWarning className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Power of Attorney</p>
                      <p className="text-xs text-muted-foreground">Updated: Dec 10, 2022</p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Secure Document Access
                        </DialogTitle>
                        <DialogDescription>
                          This document contains sensitive legal information. Please enter your provider security code
                          to access.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Similar security content as above */}
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-center p-4 bg-amber-50 rounded-md">
                          <Lock className="h-10 w-10 text-amber-600" />
                        </div>
                        <Input type="password" placeholder="Enter security code" />
                      </div>
                      <DialogFooter>
                        <Button>Verify</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the Documents tab content remains the same */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Recent Medical Records</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Hospital Discharge Summary</p>
                      <p className="text-xs text-muted-foreground">Riverside Hospital - Dec 5, 2023</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Cardiology Evaluation</p>
                      <p className="text-xs text-muted-foreground">Heart Care Specialists - Nov 12, 2023</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Lab Results</p>
                      <p className="text-xs text-muted-foreground">Riverside Medical Group - Oct 30, 2023</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <Button
          className="w-full flex items-center justify-center space-x-2"
          size="lg"
          onClick={handleTransfer}
          disabled={transferring || transferred}
        >
          {transferring ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Transferring Data...</span>
            </>
          ) : transferred ? (
            <>
              <span>Data Successfully Transferred</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Transfer to Hospital System</span>
            </>
          )}
        </Button>
      </div>

      {/* Hospital Selection Dialog */}
      <Dialog open={showHospitalSelection} onOpenChange={setShowHospitalSelection}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Transfer Hospital</DialogTitle>
            <DialogDescription>Choose the hospital to which you want to transfer the patient's data.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup
              defaultValue={selectedHospital || undefined}
              onValueChange={setSelectedHospital}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="carle" id="carle" />
                <Label htmlFor="carle">Carle Foundation Hospital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="osf" id="osf" />
                <Label htmlFor="osf">OSF HealthCare</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="riverside" id="riverside" />
                <Label htmlFor="riverside">Riverside Medical Center</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sarah" id="sarah" />
                <Label htmlFor="sarah">Sarah Bush Lincoln Health Center</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                setShowHospitalSelection(false)
                handleTransfer()
              }}
              disabled={!selectedHospital}
            >
              Continue Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Authorization Dialog (Example) */}
      <Dialog open={!documentAuthorized} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Document Authorization</DialogTitle>
            <DialogDescription>Enter the security code to authorize viewing this document.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="securityCode">Security Code</Label>
              <Input
                id="securityCode"
                type="password"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
              {securityError && <p className="text-red-500 text-sm">Incorrect security code.</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={verifySecurityCode}>
              Authorize
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

