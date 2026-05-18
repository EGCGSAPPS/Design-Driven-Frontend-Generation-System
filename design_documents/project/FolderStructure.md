# Complete Folder Structure

## Overview

This document provides a comprehensive breakdown of the project's folder structure, explaining the purpose and organization of each directory and file type.

## Root Directory Structure

```
EGCGS.Core.Apps.AP/
├── docs/                           # Documentation files
├── public/                         # Static assets served directly
├── src/                           # Source code
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── Dockerfile                     # Docker configuration
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── nginx.conf                    # Nginx server configuration
├── package.json                  # Dependencies and scripts
├── README.md                     # Project documentation
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
└── vite.config.ts               # Vite build configuration
```

## Source Directory (`src/`)

### Complete Structure

```
src/
│
├── assets/                        # Static assets (images, icons, fonts)
│   ├── images/
│   │   └── egc-logo.svg
│   └── svgs-icons/
│       ├── Emaillogs.svg
│       ├── Actionlog.svg
│       └── ...
│
├── components/                    # Shared/Common Components
│   ├── AutoComplete/
│   │   └── AutoComplete/
│   ├── Error/
│   │   └── index.tsx             # Error display component
│   ├── Header/
│   │   └── index.tsx             # Simple header component
│   ├── Loader/
│   │   └── index.tsx             # Loading spinner/skeleton
│   ├── NoDataFound/
│   │   └── index.tsx             # Empty state component
│   └── Settings/
│       ├── index.tsx             # Settings page
│       ├── Notifications/        # Notification settings
│       ├── Table/                # Settings table
│       └── Usergroup/            # User group management
│
├── contexts/                      # React Context Providers
│   └── TabContext.tsx            # Tab state management context
│
├── design-system-components/     # Design System Components
│   ├── Button/
│   │   └── index.tsx
│   ├── Command/
│   │   └── index.tsx
│   ├── DatePicker/
│   │   ├── index.tsx
│   │   └── InputMask.tsx
│   ├── Dialog/
│   │   └── index.tsx
│   ├── Header/
│   │   └── index.tsx             # Main app header with auth
│   ├── lib/
│   │   └── utils.ts              # Design system utilities
│   ├── Multiselect/
│   │   └── index.tsx
│   ├── Popover/
│   │   └── index.tsx
│   ├── SelectBox/
│   │   └── index.tsx
│   └── Timepicker/
│       └── index.tsx
│
├── hooks/                         # Custom React Hooks
│   ├── use-modal.tsx             # Modal state management
│   ├── use-toast-service.tsx     # Toast notification hook
│   └── use-window-size.tsx       # Window size tracking
│
├── Layout/                        # Layout Components
│   └── full-layout.tsx           # Main app layout with header
│
├── pages/                         # Page Components
│   ├── SupplierNonConformance/   # Main feature module
│   │   ├── SupplierNonConformancePage.tsx   # Main page component
│   │   ├── index.ts              # Exports
│   │   ├── types.ts              # Page-level types
│   │   │
│   │   ├── AllIssues/            # All Issues feature
│   │   │   ├── index.tsx
│   │   │   └── ...
│   │   │
│   │   ├── AssignedToMe/         # Assigned To Me feature
│   │   │   ├── index.tsx
│   │   │   └── ...
│   │   │
│   │   ├── ClosedInvoices/       # Closed Invoices feature
│   │   │   ├── index.tsx
│   │   │   └── ...
│   │   │
│   │   ├── components/           # Page-specific components
│   │   │   ├── AllIssuesGrid/
│   │   │   ├── DetailedView/
│   │   │   └── ...
│   │   │
│   │   └── hooks/                # Page-specific hooks
│   │       └── ...
│   │
│   └── components/                # Shared Page Components
│       ├── mockAPI.ts            # Mock data for development
│       ├── type.ts               # Shared types
│       ├── ActionlogPreview/
│       │   └── index.tsx
│       ├── BulkActions/
│       │   └── index.tsx
│       ├── CommentLogs/
│       │   └── index.tsx
│       ├── CommentsAndFileAttachments/
│       │   ├── index.tsx
│       │   └── CommentsSkeltonLoader.tsx
│       ├── Duel-Control-Select/
│       │   └── index.tsx
│       ├── DynamicEditableTableComponent/
│       │   └── index.tsx
│       ├── EmailPreview/
│       │   └── index.tsx
│       ├── FileAttachments/
│       │   └── index.tsx
│       ├── QuickAction/
│       │   ├── index.tsx
│       │   └── QuickLinkDetailed.tsx
│       ├── RemainderComponents/
│       │   └── index.tsx
│       ├── StatusFilter/
│       │   └── index.tsx
│       ├── TableUI/
│       │   ├── PODetailsTableUI.tsx
│       │   ├── InvoiceDetailsTableUI.tsx
│       │   └── ...
│       └── UnformList/
│           └── index.tsx
│
├── protectedRoute/                # Route Protection
│   └── index.tsx                 # Protected route wrapper component
│
├── services/                      # API Services & Utilities
│   ├── apiUrls.ts                # API endpoint constants
│   └── toast.service.ts          # Toast notification service
│
├── store/                         # Redux Store
│   ├── index.ts                  # Store configuration
│   ├── reducer.ts                # Root reducer
│   ├── store-hook.ts             # Typed Redux hooks
│   │
│   └── slices/                   # Redux Slices
│       ├── actions.slice.ts
│       ├── actionSave.slice.ts
│       ├── actionSave.utils.ts
│       ├── advanceFilterMaster.slice.ts
│       ├── allIssue-vendorName.slice.ts
│       ├── allissue-warehouse.slice.ts
│       ├── allissues-assignedto.slice.ts
│       ├── allissues-company.slice.ts
│       ├── allissues-customergroup.slice.ts
│       ├── allissues-division.slice.ts
│       ├── allissues-export.slice.ts
│       ├── allissues-statusFilterCount.slice.ts
│       ├── allissues-users.slice.ts
│       ├── allissues.slice.ts
│       ├── allIssuesGridHeaderData.slice.ts
│       ├── apAuditLogs.slice.ts
│       ├── apInvoiceDetails.slice.ts
│       ├── apNotes.slice.ts
│       ├── assignedToMe.slice.ts
│       ├── bulkActionDropdown.slice.ts
│       ├── closedInvoices.slice.ts
│       ├── commentsAndFileAttachment.slice.ts
│       ├── fileAttachmentData.slice.ts
│       ├── invoiceLineDetails.slice.ts
│       ├── purchaseOrderDetails.slice.ts
│       ├── userGroup.slice.ts
│       ├── users.slice.ts
│       └── ... (more slices)
│
├── api.ts                         # API utility functions
├── App.tsx                        # Root App component with MSAL
├── auth-config.ts                # Azure AD MSAL configuration
├── index.css                     # Global CSS styles
├── main.tsx                      # Application entry point
├── Router.tsx                    # Route configuration
├── utils.ts                      # General utility functions
└── vite-env.d.ts                 # Vite TypeScript declarations
```

## Directory Purposes

### `/assets`

**Purpose**: Static files like images, icons, and fonts

- Organized by type (images, svgs-icons)
- Imported directly into components
- Processed by Vite during build

### `/components`

**Purpose**: Reusable UI components used across the application

- Shared components not specific to any page
- Generic, highly reusable pieces
- Examples: Error displays, Loaders, Headers

### `/contexts`

**Purpose**: React Context API providers for global state

- Application-level state that doesn't belong in Redux
- UI state like tab management
- Avoid prop drilling

### `/design-system-components`

**Purpose**: Core design system components

- Foundational UI building blocks
- Consistent styling and behavior
- Wrapper around external design system library

### `/hooks`

**Purpose**: Custom React hooks for reusable logic

- Stateful logic extraction
- Side effect management
- Component logic reuse

### `/Layout`

**Purpose**: Layout wrapper components

- Page structure templates
- Common layout patterns (header, footer, sidebar)
- Outlet containers for nested routes

### `/pages`

**Purpose**: Page-level components (route components)

- Top-level views mapped to routes
- Feature modules organized by domain
- Contains page-specific components and hooks

### `/protectedRoute`

**Purpose**: Route authentication and authorization

- Protected route wrappers
- Permission checking
- Redirect logic for unauthorized access

### `/services`

**Purpose**: Business logic and API communication

- API call abstractions
- Data transformation
- Service layer utilities

### `/store`

**Purpose**: Redux state management

- Store configuration
- Redux slices (state + reducers + actions)
- Typed hooks for Redux usage

## File Naming Conventions

### Components

```
PascalCase for component files:
- UserProfile.tsx
- DataTable.tsx
- ModalDialog.tsx

kebab-case for multi-word descriptive files:
- all-issues-grid.tsx
- action-log-preview.tsx
```

### Utilities & Services

```
camelCase for utility files:
- apiUtils.ts
- dateHelpers.ts
- authService.ts

kebab-case for configuration:
- auth-config.ts
- api-config.ts
```

### Redux Slices

```
kebab-case with .slice.ts suffix:
- user.slice.ts
- allissues.slice.ts
- actionSave.slice.ts
```

### Hooks

```
kebab-case with use- prefix:
- use-modal.tsx
- use-auth.tsx
- use-api.tsx
```

## Import Path Patterns

### Absolute Imports with `@/` alias

```typescript
// ✅ Good: Use path alias
import { Header } from "@/design-system-components/Header";
import { useAppDispatch } from "@/store/store-hook";
import { Button } from "@/components/Button";

// ❌ Bad: Relative imports for distant files
import { Header } from "../../../design-system-components/Header";
```

### Relative Imports for nearby files

```typescript
// ✅ Good: Relative for same directory
import { UserCard } from "./UserCard";
import { types } from "./types";

// ✅ Good: Relative for parent/child
import { ChildComponent } from "../components/ChildComponent";
```

## Index Files Pattern

### Barrel Exports (`index.ts`)

```typescript
// pages/SupplierNonConformance/index.ts
export { SupplierNonConformancePage } from "./Supplier-Non-Conformance-Page";
export * from "./types";

// Usage elsewhere
import { SupplierNonConformancePage } from "@/pages/SupplierNonConformance";
```

## Feature Module Structure

```
Feature/
├── index.ts                    # Barrel exports
├── FeaturePage.tsx            # Main page component
├── types.ts                   # Feature-specific types
├── components/                # Feature-specific components
│   ├── ComponentA/
│   └── ComponentB/
├── hooks/                     # Feature-specific hooks
│   └── useFeatureData.tsx
└── utils/                     # Feature-specific utilities
    └── helpers.ts
```

## Best Practices

### 1. Colocation

Keep related files close together:

```
UserProfile/
├── UserProfile.tsx
├── UserProfile.test.tsx
├── UserProfile.types.ts
└── UserProfile.styles.ts
```

### 2. Separation of Concerns

- `/components` - Presentation only
- `/pages` - Page-level logic and composition
- `/services` - Business logic and API
- `/store` - State management
- `/hooks` - Reusable stateful logic

### 3. Naming Clarity

- Descriptive names over short names
- Consistent patterns within directories
- Clear purpose from filename

### 4. Avoid Deep Nesting

```
// ❌ Bad: Too deep
src/components/features/user/profile/settings/PasswordChange.tsx

// ✅ Good: Flatter structure
src/pages/UserSettings/components/PasswordChange.tsx
```

### 5. Index Files

- Use for barrel exports
- Simplify imports
- Don't overuse (only when beneficial)

## Growth Patterns

### Adding a New Feature

```
1. Create feature directory in /pages
2. Add main page component
3. Add feature-specific components subfolder
4. Add Redux slice(s) in /store/slices
5. Add routes in Router.tsx
6. Add any shared components to /components
```

### Adding a New Component

```
1. Determine if shared or feature-specific
2. Create in appropriate directory
3. Export via index.ts if using barrel exports
4. Add tests alongside component
5. Document props and usage
```

## Migration Checklist

When setting up a new project:

- [ ] Set up folder structure
- [ ] Configure path aliases in tsconfig.json
- [ ] Create barrel exports (index.ts files)
- [ ] Establish naming conventions
- [ ] Set up linting rules for imports
- [ ] Document structure for team
