import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a random patient ID
export function generatePatientId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const prefix = "CID"
  let result = prefix + "-"

  // Generate 3 groups of 4 characters separated by dashes
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    if (i < 2) result += "-"
  }

  return result
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date()
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDifference = today.getMonth() - dateOfBirth.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }

  return age
}

