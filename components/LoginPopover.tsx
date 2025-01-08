"use client"

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LinearButton } from "@/components/ui/linear-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface LoginFormProps {
  asPopover?: boolean
}

export function LoginForm({ asPopover = true }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (isLoading) return
    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (signInError) throw signInError

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const LoginContent = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium text-lg">Bem-vindo de volta</h4>
        <p className="text-sm text-muted-foreground">
          Entre na sua conta para acessar o dashboard
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <LinearButton 
        type="submit"
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </LinearButton>

      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{' '}
        <Link href="/signup" className="text-emerald-600 hover:text-emerald-700">
          Criar conta
        </Link>
      </p>
    </form>
  )

  if (!asPopover) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm border">
        <LoginContent />
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <LinearButton variant="ghost" className="font-medium">
          Login
        </LinearButton>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6">
        <LoginContent />
      </PopoverContent>
    </Popover>
  )
}

export function LoginPopover() {
  return <LoginForm asPopover={true} />
} 