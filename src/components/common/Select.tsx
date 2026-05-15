import { type SelectHTMLAttributes } from 'react'
import { type SelectOption } from '../../types/common'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
}

export const Select = ({ id, label, options, error, className = '', ...props }: SelectProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-text-secondary">
      {label}
    </label>
    <select
      id={id}
      aria-invalid={Boolean(error)}
      className={`rounded-md border border-border bg-panel px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span className="text-xs text-danger">{error}</span>}
  </div>
)
