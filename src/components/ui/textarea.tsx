
import * as React from 'react'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => {
    const base = "w-full rounded-md border px-3 py-2 text-sm"
    return <textarea ref={ref} className={base + ' ' + className} {...props} />
  }
)
Textarea.displayName = 'Textarea'
