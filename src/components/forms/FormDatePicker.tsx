import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Input } from '../common/Input'

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>
  label: string
}

export const FormDatePicker = <T extends FieldValues>({ name, label }: FormDatePickerProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const errorMessage = errors[name]?.message as string | undefined

  return <Input id={name} type="date" label={label} error={errorMessage} {...register(name)} />
}
