# Generate Page Prompt

## Objective

Generate a complete page component with routing, state management, and layout integration based on specifications from `docs/pages/[PageName].md`.

## Tech Stack Requirements

- **React** 19.2.6 with functional components
- **TypeScript** ~6.0.2 with strict typing
- **React Router DOM** 7.15.1 for routing
- **Redux Toolkit** 2.11.2 for state management
- **Tailwind CSS** 3.4.19 for styling

## Page Structure

### File Organization

```
src/pages/[PageName]/
├── [PageName]Page.tsx        # Main page component
├── index.ts                  # Export file
├── types.ts                  # Page-specific types
├── components/               # Page-specific components
│   ├── [Component1].tsx
│   └── [Component2].tsx
└── hooks/                    # Page-specific hooks
    └── use[PageName].ts
```

### Page Component Template

```typescript
import { type FC } from 'react'
import { PageLayout } from '../../components/common/PageLayout'
import { useAppSelector } from '../../store/hooks'

export const [PageName]Page: FC = () => {
  // Redux state
  const data = useAppSelector((state) => state.[slice].data)
  const loading = useAppSelector((state) => state.[slice].loading)
  const error = useAppSelector((state) => state.[slice].error)

  // Loading state
  if (loading) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <PageLayout>
        <ErrorBoundary>
          <EmptyState message={error} />
        </ErrorBoundary>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="[Page Title]">
      {/* Page content */}
    </PageLayout>
  )
}
```

## Routing Integration

### 1. Add Route Constant

Update `src/constants/routes.ts`:

```typescript
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  [PAGE_NAME]: "/[page-path]", // Add new route
  ORDERS: "/orders",
} as const;
```

### 2. Add Lazy-Loaded Route

Update `src/routes/AppRouter.tsx`:

```typescript
// Add lazy import
const [PageName]Page = lazy(() =>
  import('../pages/[PageName]Page').then((m) => ({ default: m.[PageName]Page }))
)

// Add route
<Route path={ROUTES.[PAGE_NAME]} element={<[PageName]Page />} />
```

### 3. Route Protection (if needed)

Routes are automatically wrapped with `ProtectedRoute` in the current architecture:

```typescript
<Route element={<ProtectedRoute />}>
  <Route element={<AppLayout />}>
    <Route path={ROUTES.[PAGE_NAME]} element={<[PageName]Page />} />
  </Route>
</Route>
```

## Requirements Checklist

### 1. Page Layout

- [ ] Use `PageLayout` wrapper component
- [ ] Include page title/header
- [ ] Implement breadcrumbs if needed
- [ ] Responsive layout for all screen sizes

### 2. State Management

- [ ] Create Redux slice if needed (see GenerateRedux.prompt.md)
- [ ] Use typed Redux hooks (`useAppSelector`, `useAppDispatch`)
- [ ] Dispatch actions in `useEffect` for data fetching
- [ ] Handle loading, success, and error states

### 3. Data Fetching

- [ ] Use `createAsyncThunk` for API calls
- [ ] Show loading spinner during fetch
- [ ] Handle errors gracefully
- [ ] Display empty states when no data

### 4. Component Composition

- [ ] Break down into smaller components
- [ ] Reuse shared components from `src/components/common/`
- [ ] Create page-specific components in `components/` subfolder
- [ ] Keep components focused (Single Responsibility)

### 5. Accessibility

- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA landmarks (`main`, `nav`, `aside`)
- [ ] Focus management for modals/dialogs
- [ ] Keyboard navigation support

### 6. SEO & Meta

- [ ] Use semantic HTML
- [ ] Add descriptive page title
- [ ] Proper heading structure

### 7. Error Handling

- [ ] Wrap page in ErrorBoundary
- [ ] Display user-friendly error messages
- [ ] Provide retry mechanisms
- [ ] Log errors for debugging

### 8. Performance

- [ ] Lazy load the page component
- [ ] Memoize expensive computations
- [ ] Optimize re-renders with `React.memo()`
- [ ] Implement pagination for large datasets

## Example: Dashboard Page

```typescript
import { type FC, useEffect } from 'react'
import { PageLayout } from '../../components/common/PageLayout'
import { Loader } from '../../components/common/Loader'
import { EmptyState } from '../../components/common/EmptyState'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchDashboardData } from '../../store/slices/dashboardSlice'

export const DashboardPage: FC = () => {
  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  if (loading) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout>
        <EmptyState message={error} />
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard widgets */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-primary">{data?.totalOrders}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold text-primary">${data?.revenue}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Active Users</h2>
          <p className="text-3xl font-bold text-primary">{data?.activeUsers}</p>
        </div>
      </div>
    </PageLayout>
  )
}
```

## Export Pattern

Create `index.ts` for clean imports:

```typescript
export { DashboardPage } from "./DashboardPage";
export type { DashboardData } from "./types";
```

## Testing

Create test file: `tests/pages/[PageName]Page.test.tsx`

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { DashboardPage } from '../../src/pages/DashboardPage'
import { store } from '../../src/store/store'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('DashboardPage', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<DashboardPage />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders dashboard data after loading', async () => {
    renderWithProviders(<DashboardPage />)
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })
})
```

## Coding Standards

- Follow project standards from `.github/copilot-instructions.md`
- Route definitions centralized in `src/routes`
- Use composition through reusable components
- Keep pages focused on layout and orchestration
- Business logic in Redux slices and custom hooks

## Deliverables

1. Page component with full implementation
2. Route configuration updated
3. Redux slice created (if needed)
4. Page-specific components
5. Loading, error, and empty states
6. Unit tests
7. TypeScript types exported
8. Accessibility features implemented
