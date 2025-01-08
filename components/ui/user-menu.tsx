"use client"

import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LinearButton } from "@/components/ui/linear-button"
import { createClient } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'
import { LogOut, User as UserIcon, Building2, Phone } from 'lucide-react'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const metadata = user.user_metadata
  
  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LinearButton 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full bg-gray-100"
        >
          {metadata.business_name[0].toUpperCase()}
        </LinearButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Conta Savvy
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {metadata && (
          <>
            <div className="px-2 py-2 space-y-1">
              {metadata.business_name && (
                <div className="flex items-center px-2 py-1 text-sm">
                  <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{metadata.business_name}</span>
                </div>
              )}
              {metadata.whatsapp_number && (
                <div className="flex items-center px-2 py-1 text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{metadata.whatsapp_number}</span>
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem
          className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 