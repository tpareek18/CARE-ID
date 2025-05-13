"use client"

import { useState } from "react"
import { Search, FileText, AlertCircle, RefreshCw, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function EpicIntegration({ patientId = "CID-78392-RJ" }: { patientId?: string }) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("recent")
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authCode, setAuthCode] = useState("")
  const [authError, setAuthError] = useState(false)

  const handleConnect = () => {
    setShowAuthDialog(true)
  }

  const handleAuthenticate = () => {
    setAuthError(false)
    setIsConnecting(true)

    // Simulate authentication process
    setTimeout(() => {
      if (authCode === "1234") {
        setIsConnecting(false)
        setIsConnected(true)
        setShowAuthDialog(false)
      } else {
        setIsConnecting(false)
        setAuthError(true)
      }
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Epic Medical Records
            </CardTitle>
            {isConnected ? (
              <Badge variant="outline" className="bg-white text-emerald-600 border-white">
                Connected
              </Badge>
            ) : null}
          </div>
          <CardDescription className="text-emerald-50">Access patient records from Epic EHR system</CardDescription>
        </CardHeader>

        {!isConnected ? (
          <CardContent className="pt-6 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
              <Lock className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-center">Connect to Epic</h3>
            <p className="text-center text-muted-foreground max-w-md">
              Connect to Epic to access patient's complete medical history, recent visits, lab results, and more.
            </p>
            <Button className="w-full max-w-xs mt-4" onClick={handleConnect} variant="default">
              Connect to Epic
            </Button>
          </CardContent>
        ) : (
          <>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">Patient ID: {patientId}</h3>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Epic MRN: 12345678
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Refresh
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input className="pl-9" placeholder="Search medical records..." />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="visits">Visits</TabsTrigger>
                  <TabsTrigger value="labs">Labs</TabsTrigger>
                  <TabsTrigger value="meds">Medications</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4 mt-4">
                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Emergency Department Visit</h4>
                        <p className="text-sm text-muted-foreground">Riverside Hospital - Feb 15, 2024</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">ED Visit</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      Patient presented with shortness of breath and chest pain. Diagnosed with CHF exacerbation.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Comprehensive Metabolic Panel</h4>
                        <p className="text-sm text-muted-foreground">Riverside Lab - Feb 16, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Lab Result</Badge>
                    </div>
                    <div className="flex items-center mt-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                      <p className="text-sm text-amber-700">Elevated BUN/Creatinine</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Cardiology Consultation</h4>
                        <p className="text-sm text-muted-foreground">Dr. James Wilson - Feb 18, 2024</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
                        Consult
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">
                      Adjustment to heart failure medication regimen. Increased Furosemide to 60mg daily.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="visits" className="space-y-4 mt-4">
                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Emergency Department Visit</h4>
                        <p className="text-sm text-muted-foreground">Riverside Hospital - Feb 15, 2024</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">ED Visit</Badge>
                    </div>
                    <p className="text-sm mt-2">Chief Complaint: Shortness of breath, chest pain</p>
                    <p className="text-sm">Diagnosis: Congestive Heart Failure Exacerbation</p>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Inpatient Admission</h4>
                        <p className="text-sm text-muted-foreground">Riverside Hospital - Dec 3-5, 2023</p>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200">
                        Inpatient
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">Reason for Admission: CHF Exacerbation</p>
                    <p className="text-sm">Attending Physician: Dr. Elizabeth Chen</p>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Primary Care Visit</h4>
                        <p className="text-sm text-muted-foreground">Riverside Medical Group - Nov 10, 2023</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                        Office Visit
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">Routine follow-up for chronic conditions</p>
                    <p className="text-sm">Provider: Dr. Elizabeth Chen</p>
                  </div>
                </TabsContent>

                <TabsContent value="labs" className="space-y-4 mt-4">
                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Comprehensive Metabolic Panel</h4>
                        <p className="text-sm text-muted-foreground">Riverside Lab - Feb 16, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Lab Result</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">Sodium:</span> 138 mmol/L
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Potassium:</span> 4.2 mmol/L
                      </div>
                      <div className="text-sm flex items-center">
                        <span className="font-medium">BUN:</span> 28 mg/dL
                        <AlertCircle className="h-3 w-3 text-amber-500 ml-1" />
                      </div>
                      <div className="text-sm flex items-center">
                        <span className="font-medium">Creatinine:</span> 1.4 mg/dL
                        <AlertCircle className="h-3 w-3 text-amber-500 ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Complete Blood Count</h4>
                        <p className="text-sm text-muted-foreground">Riverside Lab - Feb 16, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Lab Result</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">WBC:</span> 7.2 K/uL
                      </div>
                      <div className="text-sm flex items-center">
                        <span className="font-medium">Hgb:</span> 11.2 g/dL
                        <AlertCircle className="h-3 w-3 text-amber-500 ml-1" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Platelets:</span> 210 K/uL
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Hct:</span> 34%
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">HbA1c</h4>
                        <p className="text-sm text-muted-foreground">Riverside Lab - Jan 20, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Lab Result</Badge>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="text-sm flex items-center">
                        <span className="font-medium">HbA1c:</span> 7.8%
                        <AlertCircle className="h-3 w-3 text-amber-500 ml-1" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="meds" className="space-y-4 mt-4">
                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Furosemide</h4>
                        <p className="text-sm text-muted-foreground">60mg, once daily</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Active</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Prescribed by:</span> Dr. James Wilson
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Last Updated:</span> Feb 18, 2024
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Metformin</h4>
                        <p className="text-sm text-muted-foreground">1000mg, twice daily</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Active</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Prescribed by:</span> Dr. Elizabeth Chen
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Last Updated:</span> Jan 10, 2024
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Lisinopril</h4>
                        <p className="text-sm text-muted-foreground">20mg, once daily</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Active</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Prescribed by:</span> Dr. Elizabeth Chen
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Last Updated:</span> Jan 10, 2024
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Warfarin</h4>
                        <p className="text-sm text-muted-foreground">5mg, once daily</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Active</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Prescribed by:</span> Dr. James Wilson
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Last Updated:</span> Jan 15, 2024
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline">View Full Epic Chart</Button>
              <Button>Import to Current Record</Button>
            </CardFooter>
          </>
        )}
      </Card>

      {/* Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Epic Authentication</DialogTitle>
            <DialogDescription>Enter your Epic provider credentials to access patient records.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input placeholder="Username" className="mb-2" />
              <Input type="password" placeholder="Password" className="mb-2" />
              <Input
                type="password"
                placeholder="Authentication Code"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className={authError ? "border-red-500" : ""}
              />
              {authError && <p className="text-sm text-red-500">Invalid authentication code. Please try again.</p>}
              <p className="text-xs text-muted-foreground mt-2">For demo purposes, use code "1234"</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAuthenticate} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

