"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface UserData {
  username: string
  patientId: string
  profileCompletion?: number
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("careid_user")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      // Calculate profile completion based on localStorage data
      const profileData = localStorage.getItem("careid_profile")
        ? JSON.parse(localStorage.getItem("careid_profile") || "{}")
        : {}

      // Simple calculation - can be made more sophisticated
      const sections = ["personalInfo", "medicalInfo", "emergencyContacts", "providers", "insurance"]

      const completedSections = sections.filter(
        (section) => profileData[section] && Object.keys(profileData[section]).length > 0,
      ).length

      const profileCompletion = Math.round((completedSections / sections.length) * 100)

      setUserData({
        ...parsedData,
        profileCompletion,
      })
    }
  }, [])

  if (!userData) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  const incompleteProfile = (userData.profileCompletion || 0) < 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {userData.username}</h1>
          <p className="text-muted-foreground">Manage your medical information and emergency access settings</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/profile">View Profile</Link>
        </Button>
      </div>

      {incompleteProfile && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your profile is incomplete. Complete your profile to ensure medical professionals have all necessary
            information in an emergency.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>Your profile completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{userData.profileCompletion || 0}% complete</span>
                {(userData.profileCompletion || 0) === 100 ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : null}
              </div>
              <Progress value={userData.profileCompletion || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Patient ID</CardTitle>
            <CardDescription>Your unique identifier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-lg font-semibold">{userData.patientId}</div>
            <p className="text-xs text-muted-foreground mt-1">Keep this ID private and secure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/dashboard/medical-info">
                  Update Medical Info <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/dashboard/emergency-contacts">
                  Emergency Contacts <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/dashboard/settings">
                  Privacy Settings <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Fill out these sections to complete your medical profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ProfileSection
                title="Personal Information"
                href="/dashboard/personal-info"
                description="Basic details, photo, and contact information"
              />
              <ProfileSection
                title="Medical Information"
                href="/dashboard/medical-info"
                description="Health details, medications, and allergies"
              />
              <ProfileSection
                title="Emergency Contacts"
                href="/dashboard/emergency-contacts"
                description="People to contact in case of emergency"
              />
              <ProfileSection
                title="Healthcare Providers"
                href="/dashboard/providers"
                description="Your doctors and specialists"
              />
              <ProfileSection
                title="Insurance Information"
                href="/dashboard/insurance"
                description="Your health insurance details"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How CareID Works</CardTitle>
            <CardDescription>Learn how CareID helps in emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Emergency Access</h3>
              <p className="text-sm text-muted-foreground">
                Licensed medical professionals can access your critical information in emergencies using your unique ID.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Privacy Control</h3>
              <p className="text-sm text-muted-foreground">
                You control what information is shared. Adjust your privacy settings at any time.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Hospital Network</h3>
              <p className="text-sm text-muted-foreground">
                Your information can be securely transmitted to hospitals in your network during emergencies.
              </p>
            </div>
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/dashboard/settings">Manage Privacy Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProfileSection({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <div className="flex items-start justify-between py-2">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="ghost" size="sm" className="ml-2" asChild>
        <Link href={href}>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

