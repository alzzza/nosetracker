// app/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function Home() {
  const session = await getSession()

  // Redirect authenticated users to dashboard
  if (session) {
    redirect('/dashboard')
  }

  // Redirect unauthenticated users to login
  redirect('/auth/login')
}
