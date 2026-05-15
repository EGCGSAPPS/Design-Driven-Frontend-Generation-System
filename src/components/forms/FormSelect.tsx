import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Select } from '../common/Select'
import { type SelectOption } from '../../types/common'

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>
  label: string
  options: SelectOption[]
}

export const FormSelect = <T extends FieldValues>({ name, label, options }: FormSelectProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const errorMessage = errors[name]?.message as string | undefined

  return <Select id={name} label={label} options={options} error={errorMessage} {...register(name)} />
}
