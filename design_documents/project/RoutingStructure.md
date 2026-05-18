# Routing Structure

## Overview

This application uses React Router DOM v7 for client-side routing with nested routes, protected routes, and layout composition.

## Routing Architecture

```
Routes
├── / (FullLayout)
│   ├── / → SupplierNonConformancePage (Home Page)
│   └── /settings → SettingsPage (Protected)
└── * → ErrorPage (404)
```

## Router Configuration

### Main Router Component (`Router.tsx`)

```typescript
import { useRoutes } from "react-router-dom";
import ErrorPage from "./components/Error";
import SettingsPage from "./components/Settings";
import FullLayout from "./Layout/full-layout";
import { SupplierNonConformancePage } from "./pages/SupplierNonConformance";

const RouterComponent = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <FullLayout />,
      children: [
        {
          path: "/",
          element: <SupplierNonConformancePage />, // Home page
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage message="Error 404 - Page Not Found" />,
    },
  ]);

  return element;
};

export { RouterComponent };
```

## Route Types

### 1. Layout Routes

Routes that wrap child routes with a common layout:

```typescript
{
  path: "/",
  element: <FullLayout />,  // Layout wrapper
  children: [
    // Child routes render in <Outlet />
  ],
}
```

### 2. Index Routes

Default route when parent path matches (home page):

```typescript
{
  path: "/",
  element: <SupplierNonConformancePage />,  // Home page
}
```

### 3. Nested Routes

Child routes that inherit parent path:

```typescript
{
  path: "dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "analytics",    // Full path: /dashboard/analytics
      element: <Analytics />,
    },
    {
      path: "reports",      // Full path: /dashboard/reports
      element: <Reports />,
    },
  ],
}
```

### 4. Dynamic Routes

Routes with parameters:

```typescript
{
  path: "users/:userId",
  element: <UserProfile />,
}

// Access params in component
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
}
```

### 5. Catch-All Routes

404 error handling:

```typescript
{
  path: "*",
  element: <ErrorPage message="Error 404 - Page Not Found" />,
}
```

## Protected Routes

### Protected Route Component (`protectedRoute/index.tsx`)

```typescript
import { useState, useEffect, type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/store-hook";
import { type RootState } from "@/store";
import ContentLoader from "react-content-loader";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAdmin, isAdminLoading } = useAppSelector(
    (state: RootState) => state.userGroup
  );
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (isAdminLoading) return;
    setIsAuthorized(isAdmin);
  }, [isAdmin, isAdminLoading]);

  // Show loader while checking permissions
  if (isAdminLoading || isAuthorized === null) {
    return <SkeletonLoader />;
  }

  // Redirect to home if not authorized
  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="3" width="400" height="20" />
        <rect x="0" y="30" rx="3" ry="3" width="400" height="20" />
        <rect x="0" y="60" rx="3" ry="3" width="300" height="20" />
      </ContentLoader>
    </div>
  );
};
```

### Using Protected Routes

```typescript
import ProtectedRoute from "./protectedRoute";

const RouterComponent = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <FullLayout />,
      children: [
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return element;
};
```

## Navigation

### 1. Declarative Navigation with Link

```typescript
import { Link } from "react-router-dom";

<Link to="/dashboard">Go to Dashboard</Link>
<Link to="/users/123">View User 123</Link>
<Link to="/settings" state={{ from: "homepage" }}>Settings</Link>
```

### 2. NavLink for Active States

```typescript
import { NavLink } from "react-router-dom";

<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : "text-gray-600"
  }
>
  Dashboard
</NavLink>
```

### 3. Programmatic Navigation

```typescript
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to route
    navigate("/dashboard");

    // Navigate with state
    navigate("/profile", { state: { userId: 123 } });

    // Navigate with replace (no history entry)
    navigate("/home", { replace: true });

    // Go back
    navigate(-1);

    // Go forward
    navigate(1);
  };

  return <button onClick={handleClick}>Navigate</button>;
}
```

## Route Parameters

### 1. URL Parameters

```typescript
// Route definition
{
  path: "posts/:postId",
  element: <Post />,
}

// Access in component
import { useParams } from "react-router-dom";

function Post() {
  const { postId } = useParams();
  return <div>Post ID: {postId}</div>;
}
```

### 2. Search/Query Parameters

```typescript
import { useSearchParams } from "react-router-dom";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: "1" });
  };

  return (
    <div>
      <p>Search: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}
```

### 3. Location State

```typescript
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const from = location.state?.from;

  return <div>Navigated from: {from}</div>;
}
```

## Advanced Patterns

### 1. Nested Route Configuration

```typescript
const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
        ],
      },
    ],
  },
];
```

### 2. Route-Based Code Splitting

```typescript
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

const routes = [
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={<Loader />}>
        <Settings />
      </Suspense>
    ),
  },
];
```

### 3. Multiple Protected Route Types

```typescript
// Role-based protection
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  return isAdmin ? children : <Navigate to="/" replace />;
};

const ManagerRoute = ({ children }: { children: JSX.Element }) => {
  const isManager = useAppSelector((state) => state.user.isManager);
  return isManager ? children : <Navigate to="/" replace />;
};

// Usage
{
  path: "admin",
  element: <AdminRoute><AdminPanel /></AdminRoute>,
}
```

### 4. Error Boundaries with Routes

```typescript
import { ErrorBoundary } from "react-error-boundary";

const routes = [
  {
    path: "/",
    element: (
      <ErrorBoundary fallback={<ErrorPage />}>
        <FullLayout />
      </ErrorBoundary>
    ),
    children: [
      // child routes
    ],
  },
];
```

## Route Configuration Best Practices

### 1. Centralized Route Definitions

Create a routes config file:

```typescript
// routes.config.ts
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  PROFILE: (userId: string) => `/users/${userId}`,
  ADMIN: {
    ROOT: "/admin",
    USERS: "/admin/users",
    SETTINGS: "/admin/settings",
  },
};

// Usage
import { ROUTES } from "./routes.config";

<Link to={ROUTES.DASHBOARD}>Dashboard</Link>
<Link to={ROUTES.PROFILE("123")}>User Profile</Link>
```

### 2. Route Meta Information

```typescript
interface RouteConfig {
  path: string;
  element: JSX.Element;
  meta?: {
    title: string;
    requiresAuth?: boolean;
    roles?: string[];
  };
}

const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
  },
];
```

### 3. Dynamic Title Updates

```typescript
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - My App`;
  }, [title]);
}

// In component
function Dashboard() {
  useDocumentTitle("Dashboard");
  return <div>Dashboard</div>;
}
```

## Handling Navigation Events

### 1. Navigation Confirmation

```typescript
import { useBlocker } from "react-router-dom";

function FormPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useBlocker(() => {
    if (hasUnsavedChanges) {
      return !window.confirm("You have unsaved changes. Leave anyway?");
    }
    return false;
  });

  return <form>...</form>;
}
```

### 2. Scroll Restoration

```typescript
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Add to App
function App() {
  return (
    <>
      <ScrollToTop />
      <RouterComponent />
    </>
  );
}
```

## Testing Routes

### Test Navigation

```typescript
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RouterComponent } from "./Router";

test("navigates to dashboard", () => {
  render(
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );

  const link = screen.getByText("Dashboard");
  fireEvent.click(link);

  expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
});
```

## Error Page Component

```typescript
interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "Error 404 - Page Not Found"
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {message}
      </h1>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
```

## Router Setup in Main App

```typescript
// main.tsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_APP_PATH}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
```

## Key Takeaways

- ✅ Use `useRoutes` hook for declarative routing
- ✅ Implement protected routes for authorization
- ✅ Use layout routes with `<Outlet />` for shared layouts
- ✅ Handle 404 errors with catch-all routes
- ✅ Leverage `useNavigate` for programmatic navigation
- ✅ Use `NavLink` for active link styling
- ✅ Implement lazy loading for code splitting
- ✅ Add scroll restoration for better UX
- ✅ Centralize route definitions for maintainability
