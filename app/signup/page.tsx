"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSupabase } from '@/providers/supabase-provider'

interface SignupFormData {
  businessName: string
  businessType: string
  whatsappNumber: string
  whatsappName: string
  botName: string
  botPersonality: string
  email: string
  password: string
  confirmPassword: string
}

type FieldName = keyof SignupFormData

interface FormField {
  name: FieldName
  label: string
  type: string
}

const steps = [
  {
    title: "Bem-vindo ao Savvy",
    description: "Vamos configurar seu bot de WhatsApp em poucos passos.",
    fields: [] as FormField[]
  },
  {
    title: "Informações do Negócio",
    description: "Conte-nos um pouco sobre sua empresa.",
    fields: [
      { name: "businessName", label: "Nome da Empresa", type: "text" },
      { name: "businessType", label: "Tipo de Negócio", type: "text" },
    ] as FormField[]
  },
  {
    title: "Detalhes do WhatsApp",
    description: "Configure sua conta do WhatsApp Business.",
    fields: [
      { name: "whatsappNumber", label: "Número do WhatsApp", type: "tel" },
      { name: "whatsappName", label: "Nome de Exibição", type: "text" },
    ] as FormField[]
  },
  {
    title: "Personalização do Bot",
    description: "Defina o tom e estilo do seu bot.",
    fields: [
      { name: "botName", label: "Nome do Bot", type: "text" },
      { name: "botPersonality", label: "Personalidade do Bot", type: "textarea" },
    ] as FormField[]
  },
  {
    title: "Criar sua Conta",
    description: "Configure suas credenciais para acessar o dashboard.",
    fields: [
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Senha", type: "password" },
      { name: "confirmPassword", label: "Confirmar Senha", type: "password" },
    ] as FormField[]
  },
  {
    title: "Configuração Concluída",
    description: "Seu bot está pronto para começar! Verifique seu email para confirmar sua conta.",
    fields: [] as FormField[]
  }
]

export default function SignUpPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>()
  const { session, supabase, isLoading: isSessionLoading } = useSupabase()

  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  if (isSessionLoading) {
    return null // or a loading spinner
  }

  const handleSignUp = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setIsLoading(true)
    try {
      const { data: userData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            business_name: data.businessName,
            business_type: data.businessType,
            whatsapp_number: data.whatsappNumber,
            whatsapp_name: data.whatsappName,
            bot_name: data.botName,
            bot_personality: data.botPersonality,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signUpError) throw signUpError
      
      if (userData.user) {
        setCurrentStep(steps.length - 1)
        steps[steps.length - 1].description = 
          `Enviamos um email de confirmação para ${data.email}. Por favor, verifique sua caixa de entrada para ativar sua conta.`
      } else {
        throw new Error('Erro ao criar usuário. Por favor, tente novamente.')
      }
    } catch (err) {
      console.error('Full error:', err)
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = () => {
    const currentFields = steps[currentStep].fields
    const formValues = watch()
    const missingFields = currentFields.filter(field => !formValues[field.name])
    
    if (missingFields.length > 0) {
      setError(`Por favor, preencha todos os campos obrigatórios`)
      return false
    }
    return true
  }

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (isLoading) return

    // If we're on the signup step (where we collect email/password)
    if (currentStep === 4) { // Email/password step
      if (!validateStep()) return
      await handleSignUp(watch())
      return
    }

    // For all other steps, validate and move forward
    if (!validateStep()) return
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl w-full mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                {steps[currentStep].title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {steps[currentStep].description}
              </p>

              {error && (
                <div className="mb-8 p-3 text-sm text-red-500 bg-red-50 rounded-md mx-auto max-w-md">
                  {error}
                </div>
              )}

              {steps[currentStep].fields.length > 0 && (
                <div className="max-w-md mx-auto space-y-6 mb-8">
                  {steps[currentStep].fields.map((field) => (
                    <div key={field.name} className="text-left space-y-2">
                      <Label htmlFor={field.name} className="text-gray-700">
                        {field.label}
                      </Label>
                      {field.type === 'textarea' ? (
                        <Textarea 
                          id={field.name} 
                          {...register(field.name)}
                          className="w-full"
                        />
                      ) : (
                        <Input 
                          type={field.type} 
                          id={field.name} 
                          {...register(field.name)}
                          className="w-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center gap-4">
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="ghost"
                    className="text-base px-6 py-3"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                )}
                <Button
                  onClick={handleNextStep}
                  disabled={isLoading}
                  variant="gradient"
                  className="text-base px-6 py-3"
                >
                  {isLoading ? 'Processando...' : currentStep === steps.length - 1 ? 'Ir para Dashboard' : 'Continuar'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>

              <div className="flex justify-center gap-2 mt-16">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                      index === currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
} 