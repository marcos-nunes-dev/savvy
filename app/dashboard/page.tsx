"use client"

import { DashboardLayout } from "@/components/ui/dashboard/layout"
import { Card } from "@/components/ui/card"
import { GradientButton } from "@/components/ui/linear-button"
import { MessageSquare, Users, Bot, ArrowUp, ArrowDown } from 'lucide-react'

const stats = [
  { 
    name: 'Conversas Totais', 
    value: '2,345', 
    change: '+4.75%',
    trend: 'up',
    icon: MessageSquare 
  },
  { 
    name: 'Clientes Ativos', 
    value: '573', 
    change: '+2.02%',
    trend: 'up',
    icon: Users 
  },
  { 
    name: 'Taxa de Resolução', 
    value: '89.9%', 
    change: '-0.44%',
    trend: 'down',
    icon: Bot 
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center py-8">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Visão Geral</h1>
            <p className="mt-2 text-sm text-gray-700">
              Acompanhe o desempenho do seu bot e gerencie suas configurações.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <GradientButton>
              Configurar Bot
            </GradientButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.name} className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
                </div>
                <div className={`rounded-full p-3 ${
                  stat.trend === 'up' ? 'bg-emerald-50' : 'bg-gray-50'
                }`}>
                  <stat.icon className={`h-5 w-5 ${
                    stat.trend === 'up' ? 'text-emerald-500' : 'text-gray-400'
                  }`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-gray-500" />
                  )}
                  <span className={`ml-2 ${
                    stat.trend === 'up' ? 'text-emerald-500' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="ml-2 text-gray-400">vs último mês</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Atividade Recente</h2>
          <div className="mt-4 bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nova conversa iniciada</p>
                    <p className="text-sm text-gray-500">há 2 minutos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

