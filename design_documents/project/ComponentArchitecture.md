# Component Architecture

## Overview

This document outlines the component organization, patterns, and best practices for building scalable and maintainable React components.

## Component Organization

```
src/
├── components/              # Shared/Common Components
│   ├── Error/              # Error displays
│   ├── Header/             # Simple header
│   ├── Loader/             # Loading states
│   ├── NoDataFound/        # Empty states
│   └── Settings/           # Settings pages
│
├── design-system-components/  # Design System Components
│   ├── Button/
│   ├── Command/
│   ├── DatePicker/
│   ├── Dialog/
│   ├── Header/
│   ├── Multiselect/
│   ├── Popover/
│   ├── SelectBox/
│   └── Timepicker/
│
├── pages/                   # Page-Level Components
│   ├── SupplierNonConformance/
│   │   ├── SupplierNonConformance-Page.tsx  # Main page
│   │   ├── index.ts                    # Exports
│   │   ├── types.ts                    # Page types
│   │   ├── AllIssues/                  # Feature modules
│   │   ├── AssignedToMe/
│   │   ├── ClosedInvoices/
│   │   ├── components/                 # Page-specific components
│   │   └── hooks/                      # Page-specific hooks
│   │
│   └── components/          # Shared Page Components
│       ├── ActionlogPreview/
│       ├── BulkActions/
│       ├── CommentLogs/
│       ├── QuickAction/
│       └── TableUI/
│
├── Layout/                  # Layout Components
│   └── full-layout.tsx
│
├── contexts/                # React Contexts
│   └── TabContext.tsx
│
└── hooks/                   # Custom Hooks
    ├── use-modal.tsx
    ├── use-toast-service.tsx
    └── use-window-size.tsx
```

## Component Types

### 1. Presentational Components

Pure components focused on UI rendering:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}) => {
  const baseStyles = "font-medium rounded-lg transition-colors";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 hover:bg-gray-50",
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
};
```

### 2. Container Components

Components with business logic and state:

```typescript
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store-hook";
import { fetchIssues } from "@/store/slices/issues.slice";
import { IssueList } from "./IssueList";
import Loader from "@/components/Loader";

export const IssuesContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.issues);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return <IssueList issues={data} />;
};
```

### 3. Page Components

Top-level route components:

```typescript
import { useState } from "react";
import { Header } from "@/components/Header";
import { IssuesContainer } from "./components/IssuesContainer";
import { FilterPanel } from "./components/FilterPanel";

export const SupplierNonConformancePage: React.FC = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <FilterPanel filters={filters} onChange={setFilters} />
        <IssuesContainer filters={filters} />
      </div>
    </div>
  );
};
```

### 4. Layout Components

Structural wrapper components:

```typescript
interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  sidebar
}) => {
  return (
    <div className="flex h-screen">
      {sidebar && (
        <aside className="w-64 bg-white border-r">
          {sidebar}
        </aside>
      )}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};
```

## Component Patterns

### 1. Compound Components

```typescript
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-b">{children}</div>
);

export const Tab = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === value;

  return (
    <button
      onClick={() => context?.setActiveTab(value)}
      className={`px-4 py-2 ${isActive ? "border-b-2 border-blue-600" : ""}`}
    >
      {children}
    </button>
  );
};

export const TabPanel = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const context = useContext(TabsContext);
  if (context?.activeTab !== value) return null;

  return <div className="p-4">{children}</div>;
};

// Usage
<Tabs>
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
  </TabList>
  <TabPanel value="tab1">Content 1</TabPanel>
  <TabPanel value="tab2">Content 2</TabPanel>
</Tabs>
```

### 2. Render Props

```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {(data, loading, error) => {
    if (loading) return <Loader />;
    if (error) return <Error message={error.message} />;
    return <UserList users={data} />;
  }}
</DataFetcher>
```

### 3. Higher-Order Components (HOC)

```typescript
function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### 4. Custom Hooks Pattern

```typescript
// hooks/use-api.tsx
function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

// Usage in component
function UserProfile() {
  const { data: user, loading, error } = useApi<User>("/api/user/123");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return <div>{user?.name}</div>;
}
```

## Component Best Practices

### 1. Props Interface Definition

```typescript
// ✅ Good: Explicit interface
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
  className?: string;
}

// ❌ Bad: No types
function UserCard({ user, onEdit, onDelete }) {
  // ...
}
```

### 2. Default Props

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
}) => {
  // Component logic
};
```

### 3. Conditional Rendering

```typescript
// ✅ Good: Clear conditions
function UserStatus({ user }: { user: User }) {
  if (!user) return null;
  if (user.isLoading) return <Loader />;
  if (user.isError) return <Error />;

  return <div>{user.name}</div>;
}

// ❌ Bad: Nested ternaries
function UserStatus({ user }) {
  return user ? user.isLoading ? <Loader /> : user.isError ? <Error /> : <div>{user.name}</div> : null;
}
```

### 4. Event Handlers

```typescript
interface FormProps {
  onSubmit: (data: FormData) => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 5. Component Composition

```typescript
// ✅ Good: Composable components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>
    <p>Content</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// ❌ Bad: Monolithic component
<Card
  title="Title"
  content="Content"
  footerButton="Action"
  onButtonClick={handleClick}
/>
```

### 6. Memoization

```typescript
import { memo, useMemo, useCallback } from "react";

// Memoize component
export const ExpensiveComponent = memo(({ data }: { data: Data[] }) => {
  return <div>{/* Render data */}</div>;
});

// Memoize computed values
function DataTable({ items }: { items: Item[] }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  const handleClick = useCallback((id: number) => {
    console.log("Clicked:", id);
  }, []);

  return <Table data={sortedItems} onClick={handleClick} />;
}
```

## Error Handling

### Error Boundary Component

```typescript
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Component Testing

### Example Component Test

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});
```

## Component Documentation

### JSDoc Comments

```typescript
/**
 * A button component with different variants and sizes
 *
 * @param {ButtonProps} props - The button props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary' | 'secondary' | 'outline'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether button is disabled
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({...}) => {
  // ...
};
```

## Key Principles

1. **Single Responsibility** - One component, one purpose
2. **Composition over Inheritance** - Build complex UIs from simple components
3. **Props over State** - Prefer controlled components
4. **Type Safety** - Use TypeScript interfaces for all props
5. **Accessibility** - Include ARIA attributes and keyboard support
6. **Performance** - Memoize when necessary, avoid unnecessary re-renders
7. **Testability** - Write components that are easy to test
8. **Reusability** - Design components to be used in multiple contexts
