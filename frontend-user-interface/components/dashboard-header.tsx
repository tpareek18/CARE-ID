"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Bell, LogOut, Menu, Settings, User, X } from "lucide-react"
import { useSidebarState } from "@/hooks/use-sidebar-state"

export function DashboardHeader() {
  const router = useRouter()
  const { isOpen, toggleSidebar } = useSidebarState()
  const [userData, setUserData] = useState<{ username: string; patientId: string } | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("careid_user")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleLogout = () => {
    // Update login status in localStorage
    const userData = localStorage.getItem("careid_user")
    if (userData) {
      const user = JSON.parse(userData)
      localStorage.setItem(
        "careid_user",
        JSON.stringify({
          ...user,
          isLoggedIn: false,
        }),
      )
    }

    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <span className="text-xl font-bold text-blue-600">CareID</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            2
          </span>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userData?.username || "User"} />
                <AvatarFallback>{userData?.username?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData?.username}</p>
                <p className="text-xs leading-none text-muted-foreground">ID: {userData?.patientId}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

