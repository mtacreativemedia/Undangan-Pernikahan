
import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', asChild, ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border hover:opacity-90 transition"
    return <button ref={ref} className={base + ' ' + className} {...props} />
  }
)
Button.displayName = 'Button'
