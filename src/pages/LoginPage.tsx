import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../components/common/Button'
import { FormCheckbox } from '../components/forms/FormCheckbox'
import { FormInput } from '../components/forms/FormInput'
import { loginSchema, type LoginFormValues } from '../validations/loginSchema'

export const LoginPage = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      confirmPassword: '',
    },
  })

  const onSubmit = () => undefined

  return (
    <div className="mx-auto mt-12 w-full max-w-md rounded-lg bg-panel p-6 shadow-soft">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput<LoginFormValues> name="email" label="Email" type="email" />
          <FormInput<LoginFormValues> name="password" label="Password" type="password" />
          <FormInput<LoginFormValues> name="confirmPassword" label="Confirm Password" type="password" />
          <FormCheckbox<LoginFormValues> name="rememberMe" label="Remember me" />
          <Button type="submit">Sign In</Button>
        </form>
      </FormProvider>
    </div>
  )
}
