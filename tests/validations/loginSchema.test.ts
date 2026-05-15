import { describe, expect, it } from '@jest/globals'
import { loginSchema } from '../../src/validations/loginSchema'

describe('login schema', () => {
  it('rejects mismatched passwords', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'password1',
      confirmPassword: 'password2',
      rememberMe: true,
    })

    expect(result.success).toBe(false)
  })
})
