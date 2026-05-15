import { useMemo } from 'react'
import { Table } from '../components/common/Table'
import { buildFilter, buildODataQuery } from '../services/odata/queryBuilder'

const orderRows = [{ id: 'ORD-2001', amount: 200, status: 'Open' }]

export const OrdersPage = () => {
  const query = useMemo(
    () =>
      buildODataQuery({
        filter: buildFilter({ status: 'Open' }),
        top: 10,
        skip: 0,
        orderBy: 'createdAt desc',
        select: ['id', 'amount', 'status'],
      }),
    [],
  )

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted">Current OData query: {query}</p>
      <Table
        columns={[
          { key: 'id', header: 'Order ID' },
          { key: 'amount', header: 'Amount' },
          { key: 'status', header: 'Status' },
        ]}
        rows={orderRows}
      />
    </div>
  )
}
