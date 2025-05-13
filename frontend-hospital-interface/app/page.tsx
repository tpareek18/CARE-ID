import HospitalLogin from "@/components/hospital-login"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <HospitalLogin />
      </div>
    </main>
  )
}

