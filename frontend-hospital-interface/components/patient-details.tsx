"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, FileText, Heart, Activity, Calendar, ExternalLink, CheckCircle, Clock } from "lucide-react"

interface PatientDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerifyMedications: () => void
  onEpicIntegration: () => void
  verificationComplete: boolean
  verificationTime: string
}

export default function PatientDetails({
  open,
  onOpenChange,
  onVerifyMedications,
  onEpicIntegration,
  verificationComplete,
  verificationTime,
}: PatientDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>Patient: John Doe</span>
            <Badge className="ml-2">ID: JD73921</Badge>
          </DialogTitle>
          <DialogDescription>Patient information and medical history</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col p-4 bg-blue-50 rounded-lg">
            <span className="text-sm text-muted-foreground">Age</span>
            <span className="text-lg font-medium">73 years old</span>
          </div>
          <div className="flex flex-col p-4 bg-red-50 rounded-lg">
            <span className="text-sm text-muted-foreground">Blood Type</span>
            <span className="text-lg font-medium">A+</span>
          </div>
          <div className="flex flex-col p-4 bg-amber-50 rounded-lg">
            <span className="text-sm text-muted-foreground">Height / Weight</span>
            <span className="text-lg font-medium">5'11" / 147 lbs</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Fall Risk
          </Badge>
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            DNR/DNI Active
          </Badge>
          <Badge variant="outline">
            <Calendar className="h-3 w-3 mr-1" />
            Recent ER Visit (1 week ago)
          </Badge>
          <Badge variant="outline">
            <Activity className="h-3 w-3 mr-1" />
            Recent Surgery (Cryoablation)
          </Badge>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Allergies</h3>
                  <Badge variant="outline" className="bg-amber-50">
                    Eggs - mild
                  </Badge>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Current Conditions</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Heart className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Atrial Fibrillation</p>
                        <p className="text-sm text-muted-foreground">Diagnosed 2017</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Activity className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Diabetes Type 2</p>
                        <p className="text-sm text-muted-foreground">Diagnosed 2005</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Emergency Room Visit</p>
                        <p className="text-sm text-muted-foreground">1 week ago - Cardiac symptoms</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Activity className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Cryoablation Surgery</p>
                        <p className="text-sm text-muted-foreground">3 weeks ago - Cardiac procedure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onEpicIntegration}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Epic Integration
                </Button>
                <Button onClick={onVerifyMedications}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify Medications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Medications</CardTitle>
                    {verificationComplete && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 border-green-200 ml-2 flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {verificationComplete ? (
                    <CardDescription className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      All medications verified by Dr. Thomas Chen at {verificationTime}
                    </CardDescription>
                  ) : (
                    <CardDescription>Patient's current medication regimen awaiting verification</CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Eliquis</h3>
                          {verificationComplete && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 text-xs py-0 px-1">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">5mg twice daily</p>
                      </div>
                      <Badge>Anticoagulant</Badge>
                    </div>
                    <Separator className="my-3" />
                    <p className="text-sm">For atrial fibrillation. Take with food.</p>
                    {verificationComplete && (
                      <div className="mt-2 flex items-center text-green-600 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Verified by Dr. Thomas Chen at {verificationTime}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Warfarin</h3>
                          {verificationComplete && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 text-xs py-0 px-1">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">2mg once daily</p>
                      </div>
                      <Badge>Anticoagulant</Badge>
                    </div>
                    <Separator className="my-3" />
                    <p className="text-sm">For atrial fibrillation. Take in the evening.</p>
                    {verificationComplete && (
                      <div className="mt-2 flex items-center text-green-600 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Verified by Dr. Thomas Chen at {verificationTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {verificationComplete && (
                  <div className="w-full p-2 bg-green-50 text-green-700 rounded-md text-center text-sm flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Medications verified by Dr. Thomas at {verificationTime}
                  </div>
                )}
                <Button onClick={onVerifyMedications} className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {verificationComplete ? "Re-verify Medications" : "Verify Medications"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Chronic Conditions</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Activity className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Diabetes Type 2</p>
                          <p className="text-sm text-muted-foreground">Diagnosed 2005</p>
                          <p className="text-sm">Managed with diet and oral medication</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Heart className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Atrial Fibrillation</p>
                          <p className="text-sm text-muted-foreground">Diagnosed 2017</p>
                          <p className="text-sm">Managed with anticoagulants and recent cryoablation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Surgical History</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Cryoablation</p>
                          <p className="text-sm text-muted-foreground">3 weeks ago</p>
                          <p className="text-sm">Cardiac procedure for atrial fibrillation</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Appendectomy</p>
                          <p className="text-sm text-muted-foreground">2010</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Recent Hospital Visits</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Emergency Room</p>
                          <p className="text-sm text-muted-foreground">1 week ago</p>
                          <p className="text-sm">Presented with chest pain and shortness of breath</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Inpatient Stay</p>
                          <p className="text-sm text-muted-foreground">3-5 weeks ago</p>
                          <p className="text-sm">Cryoablation procedure and recovery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">EKG Report</p>
                        <p className="text-sm text-muted-foreground">Recorded by Paramedic John - Today</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="font-medium">Advanced Medical Directive (DNR/DNI)</p>
                        <p className="text-sm text-muted-foreground">Updated 6 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Cryoablation Surgical Report</p>
                        <p className="text-sm text-muted-foreground">3 weeks ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-amber-500 mr-3" />
                      <div>
                        <p className="font-medium">Recent Lab Results</p>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={onEpicIntegration} className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All Documents in Epic
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

