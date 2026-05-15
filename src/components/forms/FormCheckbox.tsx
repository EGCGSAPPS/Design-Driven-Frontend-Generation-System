import { useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>
  label: string
}

export const FormCheckbox = <T extends FieldValues>({ name, label }: FormCheckboxProps<T>) => {
  const { register } = useFormContext<T>()

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" {...register(name)} />
      {label}
    </label>
  )
}
