"use client"

import { Camera, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface ScanProps {
  onScanComplete: () => void
}

export function Scan({ onScanComplete }: ScanProps) {
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    setScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false)
      onScanComplete()
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 space-y-6">
      <div className="flex flex-col items-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-primary">CareID</h1>
        <p className="text-muted-foreground text-center">Scan patient's CareID card to access medical information</p>
      </div>

      {scanning ? (
        <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-red-500 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <p className="text-white text-sm">Scanning...</p>
          </div>
        </div>
      ) : (
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6 flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Scan CareID Card</h2>
            <p className="text-sm text-center text-muted-foreground">
              Position the CareID card within the scanner frame to access patient information
            </p>
            <Button className="w-full mt-4" size="lg" onClick={handleScan}>
              Start Scanning
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="w-full max-w-sm bg-amber-50 border-amber-200">
        <CardContent className="py-4 flex items-start space-x-3">
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800">
              In emergency situations, you can also manually enter the CareID number found on the card.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

