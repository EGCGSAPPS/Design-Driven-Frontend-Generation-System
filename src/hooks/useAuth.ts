import { useCallback, useEffect, useState } from 'react'
import { authService } from '../services/auth/authService'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())

  useEffect(() => {
    const refreshAuthState = () => {
      setIsAuthenticated(authService.isAuthenticated())
    }

    refreshAuthState()
    const intervalId = window.setInterval(refreshAuthState, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const login = useCallback(async () => {
    await authService.login()
    setIsAuthenticated(authService.isAuthenticated())
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setIsAuthenticated(authService.isAuthenticated())
  }, [])

  return {
    isAuthenticated,
    login,
    logout,
  }
}
