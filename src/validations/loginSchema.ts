import { z } from 'zod'
import { emailString, requiredString } from './helpers'
import { VALIDATION_MESSAGES } from './constants'

export const loginSchema = z
  .object({
    email: emailString,
    password: z.string().min(8, VALIDATION_MESSAGES.minPassword),
    rememberMe: z.boolean().optional(),
    confirmPassword: requiredString('Confirm password').optional(),
  })
  .refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
