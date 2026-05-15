import { APP_NAME } from '../../constants/appConstants'
import { useAuth } from '../../hooks/useAuth'
import { Button } from './Button'

export const Header = () => {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <header className="mb-4 rounded-lg bg-panel p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-text-primary">{APP_NAME}</h1>
        {isAuthenticated ? (
          <Button type="button" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button type="button" onClick={login}>
            Login
          </Button>
        )}
      </div>
    </header>
  )
}
