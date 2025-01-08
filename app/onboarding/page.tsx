"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { GradientButton } from "@/components/ui/linear-button"
import { ArrowRight, Command } from 'lucide-react'
import { useRouter } from 'next/navigation'

const steps = [
  {
    title: "Command menu ",
    description: "Use o menu de comandos para gerenciar seu bot de forma rápida e eficiente.",
    shortcut: { key1: "Ctrl", key2: "K" },
  },
  {
    title: "Configuração do WhatsApp",
    description: "Configure seu número do WhatsApp Business para começar a automatizar seu atendimento.",
    shortcut: null,
  },
  {
    title: "Personalização do Bot",
    description: "Defina a personalidade e o tom de voz do seu assistente virtual.",
    shortcut: null,
  },
  {
    title: "Configuração de Pagamentos",
    description: "Configure as integrações de pagamento para automatizar suas cobranças.",
    shortcut: null,
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/dashboard')
    }
  }

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
            className="max-w-xl w-full mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                {steps[currentStep].title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {steps[currentStep].description}
              </p>

              {steps[currentStep].shortcut && (
                <div className="mb-8">
                  <p className="text-lg text-gray-600 mb-4">
                    Experimente abrir o menu de comandos com:
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-gray-900 font-medium">
                      {steps[currentStep].shortcut.key1}
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-gray-900 font-medium">
                      {steps[currentStep].shortcut.key2}
                    </div>
                  </div>
                </div>
              )}

              <GradientButton
                onClick={nextStep}
                className="mt-8 text-base px-6 py-3"
              >
                {currentStep === steps.length - 1 ? 'Ir para Dashboard' : 'Continuar'} <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>

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

