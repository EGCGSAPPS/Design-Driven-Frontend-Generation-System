# Supplier Non Conformance Page (Home Page)

## Overview

The Supplier Non Conformance page serves as the home page and primary dashboard for the enterprise workflow management platform. It provides centralized access to supplier issue tracking, communication, returns management, and approvals.

## Purpose

- Main landing page after login
- Dashboard for supplier non-conformance tracking
- Entry point for workflow management
- Displays key metrics and status indicators

## Features

### Dashboard Components

- **Issue Tracker**: View and manage supplier non-conformance issues
- **Status Overview**: Real-time status cards showing pending, completed, and in-progress items
- **Quick Actions**: Fast access to common workflows
- **Recent Activity**: Timeline of recent supplier communications and updates

### Key Functionalities

1. **Issue Management**
   - Create new non-conformance records
   - View issue details and history
   - Track issue resolution status
   - Filter and search capabilities

2. **Workflow Actions**
   - Initiate supplier communications
   - Process returns management
   - Submit for approvals
   - Update issue status

3. **Data Visualization**
   - Status distribution charts
   - Trend analysis
   - Performance metrics
   - Priority indicators

## Component Structure

```tsx
// pages/SupplierNonConformance/index.tsx
import { PageLayout } from "@/components/common/PageLayout";
import { DashboardCards } from "./components/DashboardCards";
import { IssueTracker } from "./components/IssueTracker";
import { QuickActions } from "./components/QuickActions";

export const SupplierNonConformancePage = () => {
  return (
    <PageLayout title="Supplier Non Conformance">
      <div className="space-y-6">
        <DashboardCards />
        <QuickActions />
        <IssueTracker />
      </div>
    </PageLayout>
  );
};
```

## Routing

- **Path**: `/` (root/home page)
- **Layout**: FullLayout
- **Protection**: May require authentication
- **Access**: All authenticated users

## State Management

- Uses Redux slices for issue data
- Manages filter and pagination state
- Handles loading and error states
- Caches dashboard metrics

## API Integration

- Fetches supplier non-conformance data
- Supports OData queries for filtering/sorting
- Real-time status updates
- Pagination and lazy loading

## Design Tokens

- Uses status colors for issue categorization
- Follows spacing and typography standards
- Responsive grid layout
- Accessible tables and forms
