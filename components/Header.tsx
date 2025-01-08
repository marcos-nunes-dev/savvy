"use client"

import { LoginPopover } from './LoginPopover'
import { LinearButton, GradientButton } from './ui/linear-button'
import Link from 'next/link'

export function Header() {
    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-semibold text-xl">
                        Savvy
                    </Link>
                </div>
                <nav className="flex items-center gap-4">
                    <Link href="/login">
                        <LinearButton variant="ghost" className="font-medium">
                            Login
                        </LinearButton>
                    </Link>
                    <Link href="/signup">
                        <GradientButton asChild>
                            Começar Agora
                        </GradientButton>
                    </Link>
                </nav>
            </div>
        </header>
    )
} 