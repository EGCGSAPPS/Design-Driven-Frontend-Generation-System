import { type PropsWithChildren } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const PageLayout = ({ children }: PropsWithChildren) => (
  <div className="page-container py-6">
    <Header />
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[14rem_1fr]">
      <Sidebar />
      <main>{children}</main>
    </div>
  </div>
)
