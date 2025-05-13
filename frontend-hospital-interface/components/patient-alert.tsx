"use client"

import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface PatientAlertProps {
  onAccept: () => void
  onDismiss: () => void
}

export default function PatientAlert({ onAccept, onDismiss }: PatientAlertProps) {
  return (
    <Alert variant="destructive" className="animate-pulse">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Urgent Patient Alert</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <p>Paramedic John is trying to send patient data for John Doe</p>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={onDismiss}>
              Dismiss
            </Button>
            <Button size="sm" variant="destructive" onClick={onAccept}>
              Access Patient Data
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}

