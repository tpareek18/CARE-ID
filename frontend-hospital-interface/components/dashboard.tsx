"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Bell, FileText, Heart, User, Calendar, Clock, AlertTriangle, Activity, Clipboard } from "lucide-react"
import PatientDetails from "@/components/patient-details"

// Mock patient data
const patients = [
  {
    id: "P12345",
    name: "Sarah Johnson",
    age: 45,
    bloodType: "O-",
    condition: "Stable",
  },
  {
    id: "P23456",
    name: "Michael Brown",
    age: 62,
    bloodType: "B+",
    condition: "Critical",
  },
  {
    id: "P34567",
    name: "Emily Davis",
    age: 28,
    bloodType: "A-",
    condition: "Stable",
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)
  const [securityCode, setSecurityCode] = useState("")
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false)
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false)
  const [epicDialogOpen, setEpicDialogOpen] = useState(false)
  const [epicUsername, setEpicUsername] = useState("")
  const [epicPassword, setEpicPassword] = useState("")
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [verificationTime, setVerificationTime] = useState("")
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [patientDetailsOpen, setPatientDetailsOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  // Trigger the alert after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true)
      setAlertDialogOpen(true)
    }, 20000)

    return () => clearTimeout(timer)
  }, [])

  const handleSecurityCheck = () => {
    if (securityCode === "1234") {
      setSecurityDialogOpen(false)
      setPatientDetailsOpen(true)
    } else {
      // Handle incorrect security code
      alert("Incorrect security code")
    }
  }

  const handleEpicLogin = () => {
    // In a real app, this would authenticate with Epic
    setEpicDialogOpen(false)
    alert("Successfully connected to Epic")
  }

  const handleVerifyMedications = () => {
    setSecurityDialogOpen(true)
  }

  const handleVerificationSubmit = () => {
    const now = new Date()
    const formattedTime = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    setVerificationTime(formattedTime)
    setVerificationComplete(true)
    setVerificationDialogOpen(false)

    // Show a temporary success message
    const successMessage = document.createElement("div")
    successMessage.className =
      "fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center shadow-lg"
    successMessage.innerHTML = `
      <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Medications verified successfully by Dr. Thomas</span>
    `
    document.body.appendChild(successMessage)

    // Remove the message after 3 seconds
    setTimeout(() => {
      document.body.removeChild(successMessage)
    }, 3000)
  }

  const handleAlertAccept = () => {
    setAlertDialogOpen(false)
    setSecurityDialogOpen(true)
  }

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId)
    // In a real app, this would fetch the patient data
    // For now, we'll just show a placeholder for John Doe
    if (patientId === "P23456") {
      // Assuming this is our critical patient
      setPatientDetailsOpen(true)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow relative">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Carle Hospital System</h1>
            <p className="text-sm text-muted-foreground">Provider Portal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {showAlert && (
            <Button variant="destructive" size="sm" className="animate-pulse" onClick={() => setAlertDialogOpen(true)}>
              <Bell className="h-4 w-4 mr-2" />
              New Alert
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Thomas" />
              <AvatarFallback>DT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dr. Thomas Chen</p>
              <p className="text-xs text-muted-foreground">Cardiology</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push("/")}>
            Logout
          </Button>
        </div>
        {verificationComplete && (
          <div className="absolute bottom-0 left-0 right-0 bg-green-50 text-green-700 text-xs py-1 px-4 text-center border-t border-green-100">
            Medications for John Doe verified by Dr. Thomas Chen at {verificationTime}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>Current patients under your care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <Button
                    key={patient.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handlePatientSelect(patient.id)}
                  >
                    <div className="flex items-center w-full">
                      <Avatar className="h-9 w-9 flex-shrink-0 mr-3">
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{patient.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {patient.id} • {patient.age} yrs • {patient.bloodType}
                        </div>
                      </div>
                      <Badge
                        variant={patient.condition === "Critical" ? "destructive" : "outline"}
                        className="ml-2 flex-shrink-0"
                      >
                        {patient.condition}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Summary</CardTitle>
                  <CardDescription>April 2, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <User className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium">Patients</div>
                        <div className="text-2xl font-bold">12</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium">Appointments</div>
                        <div className="text-2xl font-bold">8</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-amber-50 rounded-lg">
                      <Clock className="h-5 w-5 text-amber-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium">On-call Hours</div>
                        <div className="text-2xl font-bold">4:30</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <Activity className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Patient vitals updated</p>
                        <p className="text-xs text-muted-foreground">Sarah Johnson - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <FileText className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lab results received</p>
                        <p className="text-xs text-muted-foreground">Michael Brown - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <Heart className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cardiology consult completed</p>
                        <p className="text-xs text-muted-foreground">Emily Davis - 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>
                    {selectedPatient ? "Viewing patient records" : "Select a patient to view their records"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedPatient ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Patient Information</h3>
                        <Button size="sm" onClick={() => setPatientDetailsOpen(true)}>
                          View Details
                        </Button>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm">Select "View Details" to see complete patient information</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <User className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Select a patient from the list to view their medical records
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Your pending tasks and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clipboard className="h-5 w-5 text-blue-500" />
                        <span>Review lab results for Sarah Johnson</span>
                      </div>
                      <Badge>High Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clipboard className="h-5 w-5 text-gray-500" />
                        <span>Complete discharge summary for Michael Brown</span>
                      </div>
                      <Badge variant="outline">Medium Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clipboard className="h-5 w-5 text-gray-500" />
                        <span>Schedule follow-up for Emily Davis</span>
                      </div>
                      <Badge variant="outline">Medium Priority</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Urgent Patient Alert
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div>
              <div className="space-y-4">
                <span className="block">Paramedic John is trying to send patient data for:</span>
                <div className="bg-red-50 p-3 rounded-md">
                  <span className="block font-medium">Patient: John Doe</span>
                  <span className="block text-sm">Incoming emergency data requires immediate attention</span>
                </div>
                <span className="block">Do you want to access this patient's clinical information?</span>
              </div>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
            <AlertDialogAction onClick={handleAlertAccept} className="bg-red-600 hover:bg-red-700">
              Access Patient Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Security Code Dialog */}
      <Dialog open={securityDialogOpen} onOpenChange={setSecurityDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Security Verification</DialogTitle>
            <DialogDescription>Please enter your security code to access patient data</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="securityCode">Security Code</Label>
              <Input
                id="securityCode"
                type="password"
                placeholder="Enter security code"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSecurityCheck}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Epic Integration Dialog */}
      <Dialog open={epicDialogOpen} onOpenChange={setEpicDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Epic Integration</DialogTitle>
            <DialogDescription>Enter your Epic credentials to access patient records</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="epicUsername">Epic Username</Label>
              <Input
                id="epicUsername"
                type="text"
                placeholder="Enter Epic username"
                value={epicUsername}
                onChange={(e) => setEpicUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="epicPassword">Epic Password</Label>
              <Input
                id="epicPassword"
                type="password"
                placeholder="Enter Epic password"
                value={epicPassword}
                onChange={(e) => setEpicPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEpicLogin}>Login to Epic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Medication Verification</DialogTitle>
            <DialogDescription>Please verify the current medications and make any necessary changes</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-amber-50 p-3 rounded-md">
              <p className="font-medium">Current Medications:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Eliquis - 5mg twice daily</li>
                <li>Warfarin - 2mg once daily</li>
              </ul>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add any notes or changes to medication"
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleVerificationSubmit}>Verify Medications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Details */}
      <PatientDetails
        open={patientDetailsOpen}
        onOpenChange={setPatientDetailsOpen}
        onVerifyMedications={handleVerifyMedications}
        onEpicIntegration={() => setEpicDialogOpen(true)}
        verificationComplete={verificationComplete}
        verificationTime={verificationTime}
      />
    </div>
  )
}

