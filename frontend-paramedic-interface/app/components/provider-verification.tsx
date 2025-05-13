"use client"

import { useState } from "react"
import { Check, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ProviderVerification() {
  const [activeTab, setActiveTab] = useState("allergies")
  const [providerCode, setProviderCode] = useState("")
  const [providerName, setProviderName] = useState("")
  const [verificationNotes, setVerificationNotes] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleVerify = () => {
    if (!providerCode || !providerName) return

    setIsVerifying(true)
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Provider Verification
          </CardTitle>
          <CardDescription className="text-primary-foreground opacity-90">
            Verify patient medical information
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="allergies" className="p-0">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="font-medium text-amber-800 mb-2">Reported Allergies</h3>
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

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="provider-code">Provider ID/License</Label>
                    <Input
                      id="provider-code"
                      placeholder="Enter your provider ID"
                      value={providerCode}
                      onChange={(e) => setProviderCode(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider-name">Provider Name</Label>
                    <Input
                      id="provider-name"
                      placeholder="Enter your full name"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verification-notes">Verification Notes (Optional)</Label>
                    <Textarea
                      id="verification-notes"
                      placeholder="Add any notes about the verification"
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              {isVerified ? (
                <div className="w-full p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">Allergies verified successfully</p>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={isVerifying || !providerCode || !providerName}
                >
                  {isVerifying ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify Allergies"
                  )}
                </Button>
              )}

              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="medications" className="p-0">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                  <h3 className="font-medium text-emerald-800 mb-2">Current Medications</h3>
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

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="provider-code-med">Provider ID/License</Label>
                    <Input
                      id="provider-code-med"
                      placeholder="Enter your provider ID"
                      value={providerCode}
                      onChange={(e) => setProviderCode(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider-name-med">Provider Name</Label>
                    <Input
                      id="provider-name-med"
                      placeholder="Enter your full name"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verification-notes-med">Verification Notes (Optional)</Label>
                    <Textarea
                      id="verification-notes-med"
                      placeholder="Add any notes about the verification"
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              {isVerified ? (
                <div className="w-full p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">Medications verified successfully</p>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={isVerifying || !providerCode || !providerName}
                >
                  {isVerifying ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify Medications"
                  )}
                </Button>
              )}

              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

