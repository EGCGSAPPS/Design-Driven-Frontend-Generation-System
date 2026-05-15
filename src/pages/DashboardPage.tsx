import { useState } from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { Tabs } from '../components/common/Tabs'
import { Table } from '../components/common/Table'

const rows = [
  { orderId: 'ORD-1001', status: 'Open', customer: 'Acme Corp' },
  { orderId: 'ORD-1002', status: 'Closed', customer: 'Globex' },
]

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('summary')

  return (
    <div className="space-y-4">
      <Tabs
        items={[
          { id: 'summary', label: 'Summary' },
          { id: 'orders', label: 'Orders' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 'summary' ? (
        <EmptyState title="Dashboard Overview" description="Design-driven enterprise dashboard starter" />
      ) : (
        <Table
          columns={[
            { key: 'orderId', header: 'Order ID' },
            { key: 'status', header: 'Status' },
            { key: 'customer', header: 'Customer' },
          ]}
          rows={rows}
        />
      )}
    </div>
  )
}
