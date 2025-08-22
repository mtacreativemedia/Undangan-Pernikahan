
import * as React from 'react'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    const base = "w-full rounded-md border px-3 py-2 text-sm"
    return <input ref={ref} className={base + ' ' + className} {...props} />
  }
)
Input.displayName = 'Input'
