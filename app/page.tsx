"use client"

import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { Logo } from "@/components/ui/logo"
import { LinearButton, GradientButton } from "@/components/ui/linear-button"
import Link from "next/link"

const navigation = [
  { name: "Recursos", href: "#features" },
  { name: "Preços", href: "#pricing" },
  { name: "Sobre", href: "#about" },
  { name: "Blog", href: "/blog" },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg border-b border-gray-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Logo href={undefined} />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-gray-700 hover:text-emerald-500 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <LinearButton variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </LinearButton>
            <GradientButton asChild>
              <Link href="/signup">Começar Agora</Link>
            </GradientButton>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <div className="relative isolate pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-4xl text-center"
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Automatize seu atendimento com IA no WhatsApp
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Transforme seu WhatsApp em um assistente virtual inteligente que gerencia cobranças, atendimento e relacionamento com clientes de forma automática e humanizada.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <GradientButton asChild className="text-base">
                    <Link href="/onboarding" className="inline-flex items-center">
                      Comece Gratuitamente <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </GradientButton>
                  <Link 
                    href="#demo" 
                    className="text-sm font-medium text-gray-700 hover:text-emerald-500 transition-colors"
                  >
                    Ver demonstração <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-16 flow-root sm:mt-24"
              >
                <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="/placeholder.svg?height=600&width=1200"
                    alt="App screenshot"
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </motion.div>
            </div>
          </div>

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

        {/* Features */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-emerald-600">Mais rápido</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tudo que você precisa para automatizar seu negócio
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Gerencie cobranças, atendimento e relacionamento com clientes de forma automática e humanizada com nossa IA.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-32 max-w-7xl px-6 lg:px-8 pb-16">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="mb-20 grid grid-cols-3 gap-x-8 gap-y-16 lg:grid-cols-6">
              <img src="/placeholder.svg?height=50&width=150" alt="Cliente 1" className="max-h-12 w-full object-contain grayscale" />
              <img src="/placeholder.svg?height=50&width=150" alt="Cliente 2" className="max-h-12 w-full object-contain grayscale" />
              <img src="/placeholder.svg?height=50&width=150" alt="Cliente 3" className="max-h-12 w-full object-contain grayscale" />
              <img src="/placeholder.svg?height=50&width=150" alt="Cliente 4" className="max-h-12 w-full object-contain grayscale" />
              <img src="/placeholder.svg?height=50&width=150" alt="Cliente 5" className="max-h-12 w-full object-contain grayscale" />
              <img src="/placeholder.svg?height=50&width=150" alt="Cliente 6" className="max-h-12 w-full object-contain grayscale" />
            </div>

            <div className="pt-16 border-t border-gray-200">
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-2 lg:col-span-1">
                  <Logo />
                  <p className="mt-4 text-sm text-gray-600">
                    Automatize seu negócio com IA e mantenha um relacionamento humanizado com seus clientes.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Produto</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#features" className="text-sm text-gray-600 hover:text-emerald-500">
                        Recursos
                      </a>
                    </li>
                    <li>
                      <a href="#pricing" className="text-sm text-gray-600 hover:text-emerald-500">
                        Preços
                      </a>
                    </li>
                    <li>
                      <a href="#about" className="text-sm text-gray-600 hover:text-emerald-500">
                        Sobre
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Empresa</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="/blog" className="text-sm text-gray-600 hover:text-emerald-500">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/careers" className="text-sm text-gray-600 hover:text-emerald-500">
                        Carreiras
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="text-sm text-gray-600 hover:text-emerald-500">
                        Contato
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="/privacy" className="text-sm text-gray-600 hover:text-emerald-500">
                        Privacidade
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-sm text-gray-600 hover:text-emerald-500">
                        Termos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">&copy; 2024 Savvy. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

