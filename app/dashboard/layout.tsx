// app/dashboard/layout.tsx
import { Navbar } from "@/components/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}

