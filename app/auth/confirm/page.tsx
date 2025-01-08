"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { LinearButton } from '@/components/ui/linear-button'

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const supabase = createClient()
        
        // Get the token from the URL
        const token = searchParams.get('token')
        const type = searchParams.get('type')

        if (!token || type !== 'signup') {
          setError('Link de confirmação inválido')
          setIsLoading(false)
          return
        }

        // Verify the email
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        })

        if (error) throw error

        // Redirect to dashboard after successful confirmation
        router.push('/dashboard')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao confirmar email')
        setIsLoading(false)
      }
    }

    confirmEmail()
  }, [router, searchParams])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Confirmando seu email...</h1>
          <p className="text-muted-foreground">Aguarde um momento</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Erro na confirmação</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <LinearButton onClick={() => router.push('/login')}>
            Voltar para o login
          </LinearButton>
        </div>
      </div>
    )
  }

  return null
} 