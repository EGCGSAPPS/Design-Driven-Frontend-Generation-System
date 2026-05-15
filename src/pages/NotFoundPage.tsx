import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export const NotFoundPage = () => (
  <div className="card-surface">
    <h2 className="text-lg font-semibold">Page not found</h2>
    <Link className="mt-2 inline-block text-primary underline" to={ROUTES.DASHBOARD}>
      Go to dashboard
    </Link>
  </div>
)
