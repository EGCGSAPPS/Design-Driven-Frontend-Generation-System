import { useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>
  label: string
}

export const FormTextarea = <T extends FieldValues>({ name, label }: FormTextareaProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const describedBy = errors[name]?.message ? `${name}-error` : undefined

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-text-secondary">
        {label}
      </label>
      <textarea
        id={name}
        aria-describedby={describedBy}
        aria-invalid={Boolean(errors[name])}
        className="rounded-md border border-border bg-panel px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        {...register(name)}
      />
      {errors[name]?.message && (
        <span id={describedBy} role="alert" className="text-xs text-danger">
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  )
}
