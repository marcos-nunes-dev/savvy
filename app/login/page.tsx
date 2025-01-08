"use client"

import { LoginForm } from '@/components/LoginPopover'

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <LoginForm asPopover={false} />
    </div>
  )
} 