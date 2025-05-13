"use client"

import { useState } from "react"
import {
  DollarSign,
  CheckCircle,
  PlusCircle,
  Trash2,
  Save,
  ArrowLeft,
  RefreshCw,
  Download,
  Send,
  Calculator,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the BillingItem interface to include more detailed categorization
interface BillingItem {
  id: string
  description: string
  code: string
  category: string // Add category field
  quantity: number
  unitPrice: number
  estimatedTotal: number
  insuranceCoverage: number
  patientResponsibility: number
}

export function EmergencyBilling() {
  const [activeTab, setActiveTab] = useState("current")
  // Update the initial billingItems state with more detailed hospital charges and categories
  const [billingItems, setBillingItems] = useState<BillingItem[]>([
    {
      id: "1",
      description: "Emergency Department Visit - Level 4",
      code: "99284",
      category: "Professional Fees",
      quantity: 1,
      unitPrice: 1200,
      estimatedTotal: 1200,
      insuranceCoverage: 960,
      patientResponsibility: 240,
    },
    {
      id: "2",
      description: "Chest X-Ray, 2 Views",
      code: "71046",
      category: "Radiology",
      quantity: 1,
      unitPrice: 350,
      estimatedTotal: 350,
      insuranceCoverage: 280,
      patientResponsibility: 70,
    },
    {
      id: "3",
      description: "ECG with Interpretation",
      code: "93000",
      category: "Cardiology",
      quantity: 1,
      unitPrice: 250,
      estimatedTotal: 250,
      insuranceCoverage: 200,
      patientResponsibility: 50,
    },
    {
      id: "4",
      description: "IV Therapy, Initial Hour",
      code: "96365",
      category: "Procedures",
      quantity: 1,
      unitPrice: 320,
      estimatedTotal: 320,
      insuranceCoverage: 256,
      patientResponsibility: 64,
    },
    {
      id: "5",
      description: "Basic Metabolic Panel",
      code: "80048",
      category: "Laboratory",
      quantity: 1,
      unitPrice: 120,
      estimatedTotal: 120,
      insuranceCoverage: 96,
      patientResponsibility: 24,
    },
    {
      id: "6",
      description: "Emergency Department Facility Fee",
      code: "99281-99285",
      category: "Facility Fees",
      quantity: 1,
      unitPrice: 950,
      estimatedTotal: 950,
      insuranceCoverage: 760,
      patientResponsibility: 190,
    },
    {
      id: "7",
      description: "Cardiac Monitoring",
      code: "93040",
      category: "Monitoring",
      quantity: 1,
      unitPrice: 175,
      estimatedTotal: 175,
      insuranceCoverage: 140,
      patientResponsibility: 35,
    },
    {
      id: "8",
      description: "IV Fluids - Normal Saline 1L",
      code: "J7030",
      category: "Pharmacy",
      quantity: 2,
      unitPrice: 95,
      estimatedTotal: 190,
      insuranceCoverage: 152,
      patientResponsibility: 38,
    },
    {
      id: "9",
      description: "Oxygen Administration",
      code: "94760",
      category: "Respiratory",
      quantity: 1,
      unitPrice: 85,
      estimatedTotal: 85,
      insuranceCoverage: 68,
      patientResponsibility: 17,
    },
    {
      id: "10",
      description: "Disposable Supplies",
      code: "A4649",
      category: "Supplies",
      quantity: 1,
      unitPrice: 120,
      estimatedTotal: 120,
      insuranceCoverage: 96,
      patientResponsibility: 24,
    },
  ])

  // Update the newItem state to include category
  const [newItem, setNewItem] = useState<Partial<BillingItem>>({
    description: "",
    code: "",
    category: "",
    quantity: 1,
    unitPrice: 0,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isExported, setIsExported] = useState(false)
  const [showAddItemDialog, setShowAddItemDialog] = useState(false)

  // Calculate totals
  const totalEstimated = billingItems.reduce((sum, item) => sum + item.estimatedTotal, 0)
  const totalInsuranceCoverage = billingItems.reduce((sum, item) => sum + item.insuranceCoverage, 0)
  const totalPatientResponsibility = billingItems.reduce((sum, item) => sum + item.patientResponsibility, 0)

  // Update the handleAddItem function to include category
  const handleAddItem = () => {
    if (!newItem.description || !newItem.code || !newItem.unitPrice || !newItem.category) return

    const estimatedTotal = (newItem.quantity || 1) * (newItem.unitPrice || 0)
    const insuranceCoverage = estimatedTotal * 0.8 // Assuming 80% insurance coverage
    const patientResponsibility = estimatedTotal - insuranceCoverage

    const item: BillingItem = {
      id: Date.now().toString(),
      description: newItem.description || "",
      code: newItem.code || "",
      category: newItem.category || "",
      quantity: newItem.quantity || 1,
      unitPrice: newItem.unitPrice || 0,
      estimatedTotal,
      insuranceCoverage,
      patientResponsibility,
    }

    setBillingItems([...billingItems, item])
    setNewItem({
      description: "",
      code: "",
      category: "",
      quantity: 1,
      unitPrice: 0,
    })
    setShowAddItemDialog(false)
  }

  const handleRemoveItem = (id: string) => {
    setBillingItems(billingItems.filter((item) => item.id !== id))
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

  const handleExport = () => {
    setIsExporting(true)
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      setIsExported(true)
      // Reset exported status after 3 seconds
      setTimeout(() => {
        setIsExported(false)
      }, 3000)
    }, 1500)
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
            <h1 className="text-2xl font-bold">Emergency Billing Estimate</h1>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Medicare
          </Badge>
        </div>

        {/* Patient Basic Info */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Robert Johnson</h2>
                <p className="text-muted-foreground">78 years old • Male • ID: CID-78392-RJ</p>
                <p className="text-sm text-muted-foreground">Medicare #: 1EG4-TE5-MK72</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <Badge variant="outline" className="bg-blue-50">
                  Insurance: Medicare
                </Badge>
                <Badge variant="outline" className="bg-blue-50">
                  Secondary: Medigap Plan G
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different billing views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          {/* Add a new tab for Invoice View in the TabsList */}
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="current">Current Visit</TabsTrigger>
            <TabsTrigger value="invoice">Invoice View</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Info</TabsTrigger>
          </TabsList>

          {/* Current Visit Tab */}
          <TabsContent value="current" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="bg-blue-600 text-white rounded-t-lg pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Current Emergency Visit Charges
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-blue-600 border-white">
                    Estimated
                  </Badge>
                </div>
                <CardDescription className="text-blue-100">
                  Estimated charges for current emergency department visit
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start space-x-3">
                  <Calculator className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Cost Estimate Only</p>
                    <p className="text-sm text-amber-700">
                      These charges are estimates based on typical emergency care for your condition. Actual charges may
                      vary based on services provided and insurance coverage.
                    </p>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Est. Total</TableHead>
                        <TableHead className="text-right w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.description}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.code}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${item.estimatedTotal.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setShowAddItemDialog(true)}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                <div className="bg-slate-50 p-4 rounded-md border space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Total Charges:</span>
                    <span className="font-bold">${totalEstimated.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Insurance Coverage:</span>
                    <span className="text-green-600 font-bold">-${totalInsuranceCoverage.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center">
                    <span className="font-bold">Estimated Patient Responsibility:</span>
                    <span className="font-bold text-lg">${totalPatientResponsibility.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Medicare typically covers 80% of approved charges after deductible. Your Medigap Plan G may cover
                    some or all of your remaining responsibility.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleExport}
                    disabled={isExporting || isExported}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Exporting...
                      </>
                    ) : isExported ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Exported
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Export PDF
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Email Estimate
                  </Button>
                </div>
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
                      Save Estimate
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Insurance Coverage Details</CardTitle>
                <CardDescription>How your insurance is expected to process these charges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Medicare Part B Coverage</h4>
                      <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                        <p className="text-sm">
                          <span className="font-medium">Annual Deductible:</span> $240.00 (Satisfied)
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Coinsurance:</span> 20% of Medicare-approved amount
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Coverage:</span> 80% after deductible
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Medigap Plan G Coverage</h4>
                      <div className="bg-green-50 p-3 rounded-md border border-green-100">
                        <p className="text-sm">
                          <span className="font-medium">Part B Coinsurance:</span> 100% coverage
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Part B Excess Charges:</span> 100% coverage
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Expected Coverage:</span> Remaining patient responsibility
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                    <h4 className="font-medium text-sm mb-2">Final Estimated Out-of-Pocket</h4>
                    <div className="flex justify-between items-center">
                      <span>With Medicare + Medigap Plan G:</span>
                      <span className="font-bold text-green-600">$0.00</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Based on your current insurance information and typical coverage patterns. Actual coverage may
                      vary based on specific plan details and services provided.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add the Invoice View TabsContent after the Current Visit tab */}
          <TabsContent value="invoice" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="bg-slate-800 text-white rounded-t-lg pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Detailed Invoice Estimate
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-slate-800 border-white">
                    DRAFT
                  </Badge>
                </div>
                <CardDescription className="text-slate-200">Itemized breakdown of estimated charges</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg">Riverside Medical Center</h3>
                    <p className="text-sm text-muted-foreground">123 Hospital Drive</p>
                    <p className="text-sm text-muted-foreground">Riverside, IL 60546</p>
                    <p className="text-sm text-muted-foreground">Tel: (555) 123-4567</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-slate-50 p-3 rounded-md border">
                      <p className="text-sm">
                        <span className="font-medium">Invoice #:</span> DRAFT-2024-0313
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Patient ID:</span> CID-78392-RJ
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Medicare #:</span> 1EG4-TE5-MK72
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Patient Information</h3>
                    <div className="bg-slate-50 p-3 rounded-md border">
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm">
                          <span className="font-medium">Name:</span> Robert Johnson
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">DOB:</span> 05/12/1945
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Address:</span> 456 Oak Lane
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">City/State:</span> Riverside, IL 60546
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span> (555) 987-6543
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Email:</span> r.johnson@email.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">Charges By Category</h3>

                    {/* Group billing items by category */}
                    {Object.entries(
                      billingItems.reduce(
                        (acc, item) => {
                          if (!acc[item.category]) {
                            acc[item.category] = []
                          }
                          acc[item.category].push(item)
                          return acc
                        },
                        {} as Record<string, BillingItem[]>,
                      ),
                    ).map(([category, items]) => (
                      <div key={category} className="mb-4">
                        <h4 className="font-medium text-md mb-2">{category}</h4>
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead className="text-right">Qty</TableHead>
                                <TableHead className="text-right">Unit Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.description}</TableCell>
                                  <TableCell>{item.code}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                  <TableCell className="text-right">${item.estimatedTotal.toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell colSpan={4} className="text-right font-medium">
                                  Subtotal for {category}:
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                  ${items.reduce((sum, item) => sum + item.estimatedTotal, 0).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">Additional Charges</h3>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Hospital Surcharge</TableCell>
                            <TableCell>Facility Fee</TableCell>
                            <TableCell className="text-right">$75.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Electronic Medical Record Fee</TableCell>
                            <TableCell>Administrative</TableCell>
                            <TableCell className="text-right">$35.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>After-Hours Service (7pm-7am)</TableCell>
                            <TableCell>Miscellaneous</TableCell>
                            <TableCell className="text-right">$125.00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md border space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Subtotal:</span>
                      <span className="font-bold">${(totalEstimated + 235).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Estimated Insurance Coverage:</span>
                      <span className="text-green-600 font-bold">-${(totalInsuranceCoverage + 188).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center">
                      <span className="font-bold">Estimated Patient Responsibility:</span>
                      <span className="font-bold text-lg">${(totalPatientResponsibility + 47).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * This is an estimate only. Final charges may vary based on actual services provided. Your Medigap
                      Plan G may cover some or all of your remaining responsibility.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleExport}
                    disabled={isExporting || isExported}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Exporting...
                      </>
                    ) : isExported ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Exported
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Export PDF
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Email Invoice
                  </Button>
                </div>
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
                      Save Invoice
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Billing History</CardTitle>
                <CardDescription>Previous emergency department and hospital visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Facility</TableHead>
                          <TableHead>Service Type</TableHead>
                          <TableHead className="text-right">Total Charges</TableHead>
                          <TableHead className="text-right">Insurance Paid</TableHead>
                          <TableHead className="text-right">Patient Paid</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Dec 5, 2023</TableCell>
                          <TableCell>Riverside Hospital</TableCell>
                          <TableCell>Inpatient - CHF</TableCell>
                          <TableCell className="text-right">$12,450.00</TableCell>
                          <TableCell className="text-right">$12,450.00</TableCell>
                          <TableCell className="text-right">$0.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Oct 18, 2023</TableCell>
                          <TableCell>Riverside Medical Group</TableCell>
                          <TableCell>Office Visit</TableCell>
                          <TableCell className="text-right">$210.00</TableCell>
                          <TableCell className="text-right">$210.00</TableCell>
                          <TableCell className="text-right">$0.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Aug 3, 2023</TableCell>
                          <TableCell>Heart Care Specialists</TableCell>
                          <TableCell>Cardiology Consult</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                          <TableCell className="text-right">$0.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Jul 12, 2023</TableCell>
                          <TableCell>Riverside Hospital</TableCell>
                          <TableCell>Emergency Visit</TableCell>
                          <TableCell className="text-right">$2,840.00</TableCell>
                          <TableCell className="text-right">$2,840.00</TableCell>
                          <TableCell className="text-right">$0.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline">View Complete History</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Info Tab */}
          <TabsContent value="insurance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Information</CardTitle>
                <CardDescription>Details about your current insurance coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Primary Insurance: Medicare</h3>
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

                  <div className="space-y-2">
                    <h3 className="font-semibold">Secondary Insurance: Medigap Plan G</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
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

                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h3 className="font-semibold mb-2">Coverage for Emergency Services</h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Medicare Part B:</span> Covers 80% of approved emergency services
                        after annual deductible ($240)
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Medigap Plan G:</span> Covers the remaining 20% coinsurance and
                        any excess charges
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Ambulance Services:</span> Covered at 80% by Medicare, remaining
                        20% by Medigap
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Out-of-Network Coverage:</span> Medicare covers emergency services
                        at any hospital
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Billing Item</DialogTitle>
            <DialogDescription>Add a new service or procedure to the current billing estimate.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-description">Description</Label>
              <Input
                id="item-description"
                placeholder="Service or procedure description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-category">Category</Label>
              <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })} value={newItem.category}>
                <SelectTrigger id="item-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional Fees">Professional Fees</SelectItem>
                  <SelectItem value="Facility Fees">Facility Fees</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                  <SelectItem value="Procedures">Procedures</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Respiratory">Respiratory</SelectItem>
                  <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-code">CPT/HCPCS Code</Label>
              <Input
                id="item-code"
                placeholder="Billing code"
                value={newItem.code}
                onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-quantity">Quantity</Label>
                <Input
                  id="item-quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-price">Unit Price ($)</Label>
                <Input
                  id="item-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem({ ...newItem, unitPrice: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddItemDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

