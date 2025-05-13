import StaffDirectory from "@/components/staff-directory"

export default function StaffDirectoryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-4xl">
        <StaffDirectory />
      </div>
    </main>
  )
}

