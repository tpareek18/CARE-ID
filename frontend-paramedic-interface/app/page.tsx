"use client"

import { Scan } from "./components/scan"
import { PatientInfo } from "./components/patient-info"
import { ProviderVerification } from "./components/provider-verification"
import { EpicIntegration } from "./components/epic-integration"
import { ChartingInterface } from "./components/charting-interface"
import { EmergencyBilling } from "./components/emergency-billing"
import { useState } from "react"

export default function Home() {
  const [scanned, setScanned] = useState(false)
  const [mode, setMode] = useState<"scan" | "patient" | "provider" | "epic" | "charting" | "billing">("scan")

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {mode === "scan" && <Scan onScanComplete={() => setMode("patient")} />}
      {mode === "patient" && (
        <PatientInfo onNavigateToEpic={() => setMode("epic")} onNavigateToBilling={() => setMode("billing")} />
      )}
      {mode === "provider" && <ProviderVerification />}
      {mode === "epic" && <EpicIntegration />}
      {mode === "charting" && <ChartingInterface />}
      {mode === "billing" && <EmergencyBilling />}
    </main>
  )
}

