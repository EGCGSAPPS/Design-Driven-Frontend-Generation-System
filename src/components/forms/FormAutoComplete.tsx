import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Input } from '../common/Input'

interface FormAutoCompleteProps<T extends FieldValues> {
  name: Path<T>
  label: string
  listId: string
  options: string[]
}

export const FormAutoComplete = <T extends FieldValues>({
  name,
  label,
  listId,
  options,
}: FormAutoCompleteProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <>
      <Input id={name} label={label} list={listId} error={errorMessage} {...register(name)} />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </>
  )
}
