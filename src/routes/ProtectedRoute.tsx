import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { authService } from '../services/auth/authService'

export const ProtectedRoute = () =>
  authService.isAuthenticated() ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
