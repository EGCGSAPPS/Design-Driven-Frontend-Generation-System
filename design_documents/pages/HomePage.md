# Supplier Non Conformance Page (Home Page)

## Overview

The Supplier Non Conformance page is the home page and primary dashboard for the enterprise workflow management platform. It provides centralized access to supplier issue tracking with status-based filtering and tabbed views.

## Purpose

- Main landing page after login
- Dashboard for supplier non-conformance tracking
- Entry point for workflow management
- Displays key metrics and status indicators

## Features

### Dashboard Components

- **Status Summary Cards**: Four cards showing live counts for each status category — Completed, Pending Supplier, Pending Returns, and Pending Supplier Credit — each colour-coded with a left border accent and accessible badge styling.
- **Tabbed Views**: Three tabs — *All Issues*, *Assigned To Me*, and *Closed Invoices* — filter the issue list without a page reload.
- **Search Bar**: Real-time text search across NC number, supplier name, and assigned-to fields.
- **Issue Tracker Table**: Sortable, filterable table listing all non-conformance records with status badge rendering.

### Key Functionalities

1. **Issue Management**
   - View all non-conformance records in a data table
   - Filter by status via tab selection
   - Search across NC number, supplier, and assignee
   - Status badge rendering with semantic colour coding

2. **Status Categories**

   | Status                   | Colour token   | Tailwind class   |
   | ------------------------ | -------------- | ---------------- |
   | Completed                | `success`      | `text-success`   |
   | Pending Supplier         | `warning`      | `text-warning`   |
   | Pending Returns          | `primary`      | `text-primary`   |
   | Pending Supplier Credit  | `danger`       | `text-danger`    |

## Component Structure

```tsx
// pages/HomePage.tsx
import { useState } from 'react'
import { Table } from '../components/common/Table'
import { Tabs } from '../components/common/Tabs'
import { EmptyState } from '../components/common/EmptyState'

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-text-primary">Supplier Non Conformance</h1>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATUS_CARDS.map(({ label, colorClass, borderClass }) => (
          <div key={label} className={`flex flex-col gap-1 rounded-lg border-l-4 bg-panel p-4 shadow-soft ${borderClass}`}>
            <span className={`text-2xl font-bold ${colorClass}`}>{countByStatus(label)}</span>
            <span className="text-sm text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      {/* Tabs + Search Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs items={TAB_ITEMS} activeTab={activeTab} onChange={setActiveTab} />
        <input type="search" ... />
      </div>

      {/* Issue Tracker Table */}
      <IssueTable issues={filteredIssues} />
    </div>
  )
}
```

## Routing

- **Path**: `/` (root / home page)
- **Layout**: `AppLayout` → `PageLayout` (Header + Sidebar + main content area)
- **Protection**: Requires authentication via `ProtectedRoute`
- **Access**: All authenticated users

## State Management

- Local `useState` for active tab and search text
- Issue data is currently sourced from inline mock data (`MOCK_ISSUES`)
- Replace with Redux slice dispatch (`fetchIssues`) and `useAppSelector` when the API is integrated

## API Integration

- Fetches supplier non-conformance records from the backend
- Supports OData queries for filtering and sorting
- Pagination and lazy loading for large datasets

## Table Columns

| Column       | Field          | Notes                         |
| ------------ | -------------- | ----------------------------- |
| NC Number    | `ncNumber`     | Unique identifier             |
| Supplier     | `supplier`     | Supplier company name         |
| Division     | `division`     | Business division             |
| Warehouse    | `warehouse`    | Warehouse code                |
| Assigned To  | `assignedTo`   | Responsible user              |
| Status       | `status`       | Rendered as a coloured badge  |
| Date Created | `dateCreated`  | ISO date string               |

## Design Tokens

- **Status colours**: `success`, `warning`, `primary`, `danger` from `tailwind.config.ts`
- **Surfaces**: `bg-panel` (white cards), `bg-surface` (table header background)
- **Border**: `border-border` for table row dividers; left-border accent per status card
- **Shadow**: `shadow-soft` on status cards
- **Typography**: `text-text-primary`, `text-text-secondary`, `text-text-muted`
- **Spacing**: Tailwind `space-y-6`, `gap-4`, `p-4`
- Responsive grid: 2 columns on mobile → 4 columns on `sm` breakpoint

