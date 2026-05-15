import { type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = ({ id, label, error, className = '', ...props }: InputProps) => {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`rounded-md border border-border bg-panel px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
      {error && (
        <span id={describedBy} role="alert" className="text-xs text-danger">
          {error}
        </span>
      )}
    </div>
  )
}
