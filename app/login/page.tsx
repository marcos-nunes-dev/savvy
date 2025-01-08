"use client"

import { LoginForm } from '@/components/LoginPopover'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginForm asPopover={false} />
      </main>
    </div>
  )
} 