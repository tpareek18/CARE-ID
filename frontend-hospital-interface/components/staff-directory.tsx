"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"

// Mock staff data
const staffMembers = [
  {
    id: "docthomas",
    name: "Dr. Thomas Chen",
    department: "Cardiology",
    role: "Attending Physician",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "docsmith",
    name: "Dr. Sarah Smith",
    department: "Emergency Medicine",
    role: "Chief Resident",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "docjohnson",
    name: "Dr. Michael Johnson",
    department: "Neurology",
    role: "Department Head",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "nursewilliams",
    name: "Nurse Rebecca Williams",
    department: "ICU",
    role: "Head Nurse",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function StaffDirectory() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStaffSelect = (staffId: string) => {
    setSelectedStaff(staffId)
    router.push(`/provider-login?staffId=${staffId}`)
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Staff Directory</CardTitle>
        <CardDescription>Please identify yourself from the directory below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, department, or role..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredStaff.map((staff) => (
            <Button
              key={staff.id}
              variant="outline"
              className={`flex items-center space-x-4 h-auto p-4 justify-start ${
                selectedStaff === staff.id ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => handleStaffSelect(staff.id)}
            >
              <Avatar>
                <AvatarImage src={staff.image} alt={staff.name} />
                <AvatarFallback>
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium">{staff.name}</div>
                <div className="text-sm text-muted-foreground">
                  {staff.department} - {staff.role}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

