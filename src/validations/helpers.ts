import { z } from 'zod'
import { VALIDATION_MESSAGES, VALIDATION_REGEX } from './constants'

export const requiredString = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} ${VALIDATION_MESSAGES.required.toLowerCase()}`)

export const emailString = z.string().regex(VALIDATION_REGEX.email, VALIDATION_MESSAGES.email)
