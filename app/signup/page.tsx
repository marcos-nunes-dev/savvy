"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from '@/lib/supabase'

const steps = [
  {
    title: "Bem-vindo ao Savvy",
    description: "Vamos configurar seu bot de WhatsApp em poucos passos.",
    fields: []
  },
  {
    title: "Informações do Negócio",
    description: "Conte-nos um pouco sobre sua empresa.",
    fields: [
      { name: "businessName", label: "Nome da Empresa", type: "text" },
      { name: "businessType", label: "Tipo de Negócio", type: "text" },
    ]
  },
  {
    title: "Detalhes do WhatsApp",
    description: "Configure sua conta do WhatsApp Business.",
    fields: [
      { name: "whatsappNumber", label: "Número do WhatsApp", type: "tel" },
      { name: "whatsappName", label: "Nome de Exibição", type: "text" },
    ]
  },
  {
    title: "Personalização do Bot",
    description: "Defina o tom e estilo do seu bot.",
    fields: [
      { name: "botName", label: "Nome do Bot", type: "text" },
      { name: "botPersonality", label: "Personalidade do Bot", type: "textarea" },
    ]
  },
  {
    title: "Criar sua Conta",
    description: "Configure suas credenciais para acessar o dashboard.",
    fields: [
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Senha", type: "password" },
      { name: "confirmPassword", label: "Confirmar Senha", type: "password" },
    ]
  },
  {
    title: "Configuração Concluída",
    description: "Seu bot está pronto para começar! Verifique seu email para confirmar sua conta.",
    fields: []
  }
]

export default function SignUpPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSignUp = async () => {
    // Validate email
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Por favor, insira um email válido')
      return
    }

    // Validate password
    if (!formData.password || formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            business_name: formData.businessName,
            business_type: formData.businessType,
            whatsapp_number: formData.whatsappNumber,
            whatsapp_name: formData.whatsappName,
            bot_name: formData.botName,
            bot_personality: formData.botPersonality,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signUpError) {
        console.error('Signup Error:', {
          status: signUpError.status,
          message: signUpError.message,
          details: signUpError
        })
        
        // Handle specific error cases
        if (signUpError.message?.includes('User already registered')) {
          throw new Error('Este email já está registrado. Por favor, faça login ou use outro email.')
        }
        
        if (signUpError.message?.includes('Password should be at least 6 characters')) {
          throw new Error('A senha deve ter pelo menos 6 caracteres.')
        }

        if (signUpError.status === 429) {
          throw new Error('Muitas tentativas de cadastro. Por favor, aguarde alguns minutos e tente novamente.')
        }

        // Generic error message for other cases
        throw new Error(signUpError.message || 'Erro ao criar conta. Por favor, tente novamente.')
      }
      
      if (data.user) {
        nextStep()
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
    const missingFields = currentFields.filter(field => !formData[field.name])
    
    if (missingFields.length > 0) {
      setError(`Por favor, preencha todos os campos obrigatórios`)
      return false
    }
    return true
  }

  const nextStep = () => {
    // Validate current step fields
    if (!validateStep()) return

    // If we're on the signup step (where we collect email/password)
    if (currentStep === 4) { // Email/password step
      handleSignUp()
      return
    }

    // Otherwise, just move to next step
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
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      ) : (
                        <Input 
                          type={field.type} 
                          id={field.name} 
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
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
                  onClick={nextStep}
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