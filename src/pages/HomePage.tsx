import { useState } from 'react'
import { Table } from '../components/common/Table'
import { Tabs } from '../components/common/Tabs'
import { EmptyState } from '../components/common/EmptyState'

type IssueStatus = 'Completed' | 'Pending Supplier' | 'Pending Returns' | 'Pending Supplier Credit'

interface Issue {
  ncNumber: string
  supplier: string
  division: string
  warehouse: string
  assignedTo: string
  status: IssueStatus
  dateCreated: string
}

const STATUS_STYLES: Record<IssueStatus, string> = {
  Completed: 'bg-success/10 text-success',
  'Pending Supplier': 'bg-warning/10 text-warning',
  'Pending Returns': 'bg-primary/10 text-primary',
  'Pending Supplier Credit': 'bg-danger/10 text-danger',
}

const MOCK_ISSUES: Issue[] = [
  { ncNumber: 'NC-1001', supplier: 'Acme Corp', division: 'East', warehouse: 'WH-01', assignedTo: 'John Doe', status: 'Pending Supplier', dateCreated: '2025-05-01' },
  { ncNumber: 'NC-1002', supplier: 'Beta Supplies', division: 'West', warehouse: 'WH-03', assignedTo: 'Jane Smith', status: 'Completed', dateCreated: '2025-04-28' },
  { ncNumber: 'NC-1003', supplier: 'Gamma Goods', division: 'North', warehouse: 'WH-02', assignedTo: 'John Doe', status: 'Pending Returns', dateCreated: '2025-05-05' },
  { ncNumber: 'NC-1004', supplier: 'Delta Parts', division: 'South', warehouse: 'WH-04', assignedTo: 'Alice Brown', status: 'Pending Supplier Credit', dateCreated: '2025-05-10' },
  { ncNumber: 'NC-1005', supplier: 'Acme Corp', division: 'East', warehouse: 'WH-01', assignedTo: 'Bob Wilson', status: 'Completed', dateCreated: '2025-04-20' },
  { ncNumber: 'NC-1006', supplier: 'Beta Supplies', division: 'West', warehouse: 'WH-03', assignedTo: 'Jane Smith', status: 'Pending Supplier', dateCreated: '2025-05-12' },
]

const TAB_ITEMS = [
  { id: 'all', label: 'All Issues' },
  { id: 'assigned', label: 'Assigned To Me' },
  { id: 'closed', label: 'Closed Invoices' },
]

const STATUS_CARDS: { label: IssueStatus; colorClass: string; borderClass: string }[] = [
  { label: 'Completed', colorClass: 'text-success', borderClass: 'border-success' },
  { label: 'Pending Supplier', colorClass: 'text-warning', borderClass: 'border-warning' },
  { label: 'Pending Returns', colorClass: 'text-primary', borderClass: 'border-primary' },
  { label: 'Pending Supplier Credit', colorClass: 'text-danger', borderClass: 'border-danger' },
]

const TABLE_COLUMNS = [
  { key: 'ncNumber' as const, header: 'NC Number' },
  { key: 'supplier' as const, header: 'Supplier' },
  { key: 'division' as const, header: 'Division' },
  { key: 'warehouse' as const, header: 'Warehouse' },
  { key: 'assignedTo' as const, header: 'Assigned To' },
  { key: 'status' as const, header: 'Status' },
  { key: 'dateCreated' as const, header: 'Date Created' },
]

function StatusBadge({ status }: { status: IssueStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  )
}

type TableRow = Record<string, unknown>

function IssueTable({ issues }: { issues: Issue[] }) {
  if (issues.length === 0) {
    return <EmptyState title="No issues found" description="There are no issues matching the current view." />
  }

  const rows: TableRow[] = issues.map((issue) => ({ ...issue }))

  const columns = TABLE_COLUMNS.map((col) =>
    col.key === 'status'
      ? {
          ...col,
          renderCell: (row: TableRow) => <StatusBadge status={row.status as IssueStatus} />,
        }
      : col,
  )

  return <Table columns={columns} rows={rows} />
}

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filteredIssues = MOCK_ISSUES.filter((issue) => {
    const matchesSearch =
      search === '' ||
      issue.ncNumber.toLowerCase().includes(search.toLowerCase()) ||
      issue.supplier.toLowerCase().includes(search.toLowerCase()) ||
      issue.assignedTo.toLowerCase().includes(search.toLowerCase())

    // TODO: replace 'John Doe' with the authenticated user's name once API integration is complete
    if (activeTab === 'assigned') return matchesSearch && issue.assignedTo === 'John Doe'
    if (activeTab === 'closed') return matchesSearch && issue.status === 'Completed'
    return matchesSearch
  })

  const countByStatus = (status: IssueStatus) =>
    MOCK_ISSUES.filter((i) => i.status === status).length

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-text-primary">Supplier Non Conformance</h1>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATUS_CARDS.map(({ label, colorClass, borderClass }) => (
          <div
            key={label}
            className={`flex flex-col gap-1 rounded-lg border-l-4 bg-panel p-4 shadow-soft ${borderClass}`}
          >
            <span className={`text-2xl font-bold ${colorClass}`}>{countByStatus(label)}</span>
            <span className="text-sm text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      {/* Tabs + Search Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs items={TAB_ITEMS} activeTab={activeTab} onChange={setActiveTab} />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by NC#, supplier or assignee…"
          aria-label="Search issues"
          className="rounded-md border border-border bg-panel px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Issue Tracker Table */}
      <IssueTable issues={filteredIssues} />
    </div>
  )
}