import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export const Sidebar = () => (
  <aside className="w-full rounded-lg bg-panel p-4 shadow-soft lg:w-56" aria-label="Primary">
    <nav>
      <ul className="space-y-2">
        <li>
          <NavLink to={ROUTES.DASHBOARD} className="block rounded-md px-3 py-2 hover:bg-surface">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ORDERS} className="block rounded-md px-3 py-2 hover:bg-surface">
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
)
