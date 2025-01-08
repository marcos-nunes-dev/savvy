"use client"

import { LoginForm } from '@/components/LoginForm'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/providers/supabase-provider'

export default function LoginPage() {
  const router = useRouter()
  const { session, isLoading } = useSupabase()

  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden relative isolate">
      {/* Background gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-emerald-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center mt-16 mb-8">
        <Logo href={undefined} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm asPopover={false} />
      </main>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-300 to-emerald-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
} 