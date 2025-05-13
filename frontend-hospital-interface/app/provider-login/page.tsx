import { Suspense } from "react"
import ProviderLogin from "@/components/provider-login"

export default function ProviderLoginPage({
  searchParams,
}: {
  searchParams: { staffId: string }
}) {
  const staffId = searchParams.staffId || ""

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <ProviderLogin staffId={staffId} />
        </Suspense>
      </div>
    </main>
  )
}

