import { Outlet } from 'react-router-dom'
import { PageLayout } from '../components/common/PageLayout'

export const AppLayout = () => (
  <PageLayout>
    <Outlet />
  </PageLayout>
)
