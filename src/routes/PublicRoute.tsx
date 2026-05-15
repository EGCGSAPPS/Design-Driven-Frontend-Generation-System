import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { authService } from '../services/auth/authService'

export const PublicRoute = () =>
  authService.isAuthenticated() ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Outlet />
