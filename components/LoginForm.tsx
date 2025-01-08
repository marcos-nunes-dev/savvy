"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LinearButton, GradientButton } from "@/components/ui/linear-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface LoginFormProps {
  asPopover?: boolean
}

interface LoginFormData {
  email: string
  password: string
}

const LoginContent = ({ 
  error, 
  isLoading,
  onSubmit,
  asPopover
}: {
  error: string
  isLoading: boolean
  onSubmit: (data: LoginFormData) => Promise<void>
  asPopover?: boolean
}) => {
  const { register, handleSubmit } = useForm<LoginFormData>()

  const content = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-w-sm">
      <div className="space-y-2 text-center">
        <h4 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Bem-vindo de volta
        </h4>
        <p className="text-base text-gray-600">
          Entre na sua conta para acessar o dashboard
        </p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 text-sm text-red-500 bg-red-50 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full h-11"
            {...register('email', { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-gray-700">Senha</Label>
          <Input
            id="password"
            type="password"
            className="w-full h-11"
            {...register('password', { required: true })}
          />
        </div>
      </div>

      <GradientButton 
        type="submit"
        className="w-full h-11 text-base" 
        disabled={isLoading}
      >
        {isLoading ? (
          'Entrando...'
        ) : (
          <span className="inline-flex items-center">
            Entrar <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        )}
      </GradientButton>

      <p className="text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
          Criar conta
        </Link>
      </p>
    </form>
  )

  if (!asPopover) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm p-0"
      >
        {content}
      </motion.div>
    )
  }

  return content
}

export function LoginForm({ asPopover = true }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleLogin = async (data: LoginFormData) => {
    if (isLoading) return
    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
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

  if (!asPopover) {
    return (
      <LoginContent 
        error={error} 
        isLoading={isLoading} 
        onSubmit={handleLogin}
        asPopover={asPopover}
      />
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
        <LoginContent 
          error={error} 
          isLoading={isLoading} 
          onSubmit={handleLogin}
          asPopover={asPopover}
        />
      </PopoverContent>
    </Popover>
  )
}

export function LoginPopover() {
  return <LoginForm asPopover={true} />
} 