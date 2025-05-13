"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AlertCircle, FileText, Heart, Home, Settings, User, Users, Wallet } from "lucide-react"
import { useSidebarState } from "@/hooks/use-sidebar-state"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Personal Info",
    href: "/dashboard/personal-info",
    icon: User,
  },
  {
    title: "Medical Info",
    href: "/dashboard/medical-info",
    icon: Heart,
  },
  {
    title: "Emergency Contacts",
    href: "/dashboard/emergency-contacts",
    icon: AlertCircle,
  },
  {
    title: "Healthcare Providers",
    href: "/dashboard/providers",
    icon: Users,
  },
  {
    title: "Insurance",
    href: "/dashboard/insurance",
    icon: Wallet,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isOpen, toggleSidebar } = useSidebarState()

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      useSidebarState.getState().setIsOpen(false)
    }
  }, [pathname, isOpen])

  // Add overlay for when sidebar is open
  const Overlay = () => (
    <div
      className={cn(
        "fixed inset-0 z-20 bg-black/50 transition-opacity",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={() => useSidebarState.getState().setIsOpen(false)}
      aria-hidden="true"
    />
  )

  return (
    <>
      <Overlay />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold text-blue-600">CareID</span>
          </Link>
        </div>
        <nav className="space-y-1 px-2 py-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                onClick={() => useSidebarState.getState().setIsOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

