"use client"

import { create } from "zustand"

interface SidebarState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
}

export const useSidebarState = create<SidebarState>((set) => ({
  isOpen: false, // Closed by default for all screen sizes
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}))

