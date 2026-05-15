import { type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button = ({ children, isLoading, className = '', ...props }: ButtonProps) => (
  <button
    className={`rounded-md bg-primary px-4 py-2 text-text-inverse transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    {...props}
  >
    {isLoading ? 'Loading...' : children}
  </button>
)
