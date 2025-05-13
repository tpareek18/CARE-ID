"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useSidebarState } from "@/hooks/use-sidebar-state"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isOpen, setIsOpen } = useSidebarState()
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("careid_user")
    if (!userData || !JSON.parse(userData).isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  // Handle click on main content area to close sidebar
  const handleMainContentClick = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div
        ref={mainContentRef}
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? "md:ml-64" : "ml-0"}`}
        onClick={handleMainContentClick}
      >
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

