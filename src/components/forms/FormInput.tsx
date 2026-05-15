import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Input } from '../common/Input'

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: string
}

export const FormInput = <T extends FieldValues>({ name, label, type = 'text' }: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const errorMessage = errors[name]?.message as string | undefined

  return <Input id={name} label={label} type={type} error={errorMessage} {...register(name)} />
}
