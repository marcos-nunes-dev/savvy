"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  variant?: 'default' | 'ghost' | 'gradient'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, asChild = false, variant = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center text-sm transition-all",
          variant === 'default' && [
            "bg-emerald-600 text-white rounded-md px-4 py-2",
            "hover:bg-emerald-700",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          ],
          variant === 'ghost' && [
            "text-gray-700 rounded-md px-4 py-2",
            "hover:bg-gray-100/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          ],
          variant === 'gradient' && [
            "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
            "hover:from-emerald-600 hover:to-emerald-700",
            "rounded-full px-6 py-3 text-base font-medium",
            "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
            "shadow-lg hover:shadow-xl",
            "transform hover:-translate-y-0.5",
            "disabled:pointer-events-none disabled:opacity-50",
          ],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button }
