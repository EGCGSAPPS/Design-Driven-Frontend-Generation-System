import { useMemo } from 'react'
import { authService } from '../services/auth/authService'

export const useAuth = () =>
  useMemo(
    () => ({
      isAuthenticated: authService.isAuthenticated(),
      login: authService.login,
      logout: authService.logout,
    }),
    [],
  )
