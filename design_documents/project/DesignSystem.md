# Design System

## Overview

This document outlines the design system architecture, components, styling patterns, and best practices for building a consistent and maintainable UI.

## Design System Architecture

```
Design System
├── Core Components (@egcgsapps/egcgs.component.designsystem)
├── Custom Design System Components (design-system-components/)
├── Tailwind CSS (Utility-first styling)
├── Remix Icons (@remixicon/react)
└── Radix UI Primitives (Accessible components)
```

## Core Design Principles

### 1. Consistency

- Unified color palette
- Standardized spacing scale
- Consistent typography
- Reusable components

### 2. Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management

### 3. Responsiveness

- Mobile-first approach
- Fluid layouts
- Adaptive components
- Breakpoint consistency

### 4. Performance

- Minimal bundle size
- Lazy loading
- Optimized re-renders
- Tree-shaking friendly

## Design Tokens

### Color System

```css
/* Primary Colors */
--color-primary: #052760;
--color-heading: #052760;

/* Text Colors */
--color-text-primary: #1f2937;
--color-text-secondary: #797f9d;
--color-text-gray: #6b7280;

/* Background Colors */
--color-bg-white: #ffffff;
--color-bg-gray-50: #f9fafb;
--color-bg-gray-100: #f3f4f6;
--color-bg-gray-200: #e5e7eb;
--color-bg-gray-300: #d1d5db;

/* Notification Colors */
--color-notification-bg: hsla(var(--headernotification-background));

/* Border Colors */
--color-border-gray: #d1d5db;

/* State Colors */
--color-error: #ef4444;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-info: #3b82f6;
```

### Typography Scale

```css
/* Font Family */
--font-family-base: "Inter", sans-serif;

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale

```css
/* Tailwind Default Scale */
0.5: 0.125rem   /* 2px */
1: 0.25rem      /* 4px */
2: 0.5rem       /* 8px */
3: 0.75rem      /* 12px */
4: 1rem         /* 16px */
5: 1.25rem      /* 20px */
6: 1.5rem       /* 24px */
8: 2rem         /* 32px */
10: 2.5rem      /* 40px */
12: 3rem        /* 48px */
```

## Component Library

### External Design System

```typescript
import {
  Button,
  Input,
  Label,
  SelectBox,
  Tab,
  AlertPopup,
  useToast,
  ToastProvider,
} from "@egcgsapps/egcgs.component.designsystem";
```

### Custom Components

#### 1. Header Component

```typescript
import { Header } from "@/design-system-components/Header";

<Header
  name="John Doe"
  headerName="Application Name"
  menuList={menuItems}
  onLogout={handleLogout}
  className="custom-class"
/>
```

#### 2. Button Component

```typescript
import { Button } from "@egcgsapps/egcgs.component.designsystem";

// Variants
<Button variant="filled">Primary Action</Button>
<Button variant="outlined">Secondary Action</Button>
<Button variant="clear">Tertiary Action</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

#### 3. Input Components

```typescript
import { Input, Label } from "@egcgsapps/egcgs.component.designsystem";

<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter email"
    className="h-10"
  />
</div>
```

#### 4. SelectBox Component

```typescript
import { SelectBox } from "@egcgsapps/egcgs.component.designsystem";

<SelectBox
  options={options}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Select option"
  className="w-full"
/>
```

#### 5. DatePicker Component

```typescript
import { DatePicker } from "@/design-system-components/DatePicker";

<DatePicker
  value={selectedDate}
  onChange={handleDateChange}
  placeholder="Select date"
/>
```

#### 6. Popover Component

```typescript
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow
} from "@/design-system-components/Popover";

<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent align="end" alignOffset={-20}>
    <PopoverArrow fill="CurrentColor" />
    <div>Popover content</div>
  </PopoverContent>
</Popover>
```

#### 7. Dialog/Modal Component

```typescript
import { Dialog } from "@/design-system-components/Dialog";

<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Dialog Title"
>
  <div>Dialog content</div>
</Dialog>
```

#### 8. Toast Notifications

```typescript
import { useToast } from "@egcgsapps/egcgs.component.designsystem";

const toast = useToast();

// Success toast
toast.success("Operation completed successfully");

// Error toast
toast.error("An error occurred");

// Warning toast
toast.warning("Please review your input");

// Info toast
toast.info("Information message");
```

## Icon System

### Remix Icons

```typescript
import {
  RiUserLine,
  RiLogoutCircleRLine,
  RiSettings5Line,
  RiQuestionnaireLine,
  RiTimeLine,
  RiAttachmentLine,
  RiChat3Line,
  RiSaveLine,
  RiLoader4Fill,
} from "@remixicon/react";

// Usage
<RiUserLine size={18} className="mr-3 text-gray-600" />
```

### Custom SVG Icons

```typescript
import logo from "@/assets/images/egc-logo.svg";
import EmailIcon from "@/assets/svgs-icons/Emaillogs.svg";

<img src={logo} alt="Logo" className="h-8" />
```

## Styling Patterns

### Tailwind CSS Setup

#### Global Styles (`index.css`)

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

@tailwind utilities;
@import "tailwindcss";

:root {
  font-family: Inter, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### Common Component Patterns

#### Card Component

```typescript
<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-gray-600">Card content</p>
</div>
```

#### Form Group

```typescript
<div className="flex flex-col gap-2 mb-4">
  <Label htmlFor="field">Field Label</Label>
  <Input id="field" className="h-10" />
  <span className="text-xs text-gray-500">Helper text</span>
</div>
```

#### Loading State

```typescript
<div className="flex items-center justify-center p-8">
  <RiLoader4Fill className="animate-spin text-primary" size={32} />
</div>
```

#### Empty State

```typescript
import NoDataFound from "@/components/NoDataFound";

<NoDataFound message="No data available" />
```

### Responsive Utilities

```typescript
// Mobile first approach
<div className="
  w-full              // Mobile
  md:w-1/2           // Tablet
  lg:w-1/3           // Desktop
  xl:w-1/4           // Large desktop
">
  Content
</div>
```

### Layout Utilities

```typescript
// Flexbox
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Spacing
<div className="p-4 m-2">  // padding: 1rem, margin: 0.5rem

// Positioning
<div className="fixed top-0 left-0 right-0 z-20">
```

## Utility Classes

### Custom Utilities

```typescript
// Text truncation
className = "truncate";

// Line clamp
className = "line-clamp-2";

// Hover effects
className = "hover:bg-gray-100 transition-colors duration-200";

// Focus states
className = "focus:ring-2 focus:ring-blue-500 focus:outline-none";

// Disabled states
className = "disabled:opacity-50 disabled:cursor-not-allowed";
```

## Accessibility Guidelines

### 1. Semantic HTML

```typescript
<button type="button">Click me</button>  // Not <div onClick={...}>
<nav>...</nav>
<main>...</main>
<header>...</header>
<footer>...</footer>
```

### 2. ARIA Labels

```typescript
<button aria-label="Close dialog">
  <RiCloseLine />
</button>

<input aria-describedby="helper-text" />
<span id="helper-text">Helper text</span>
```

### 3. Keyboard Navigation

```typescript
// Ensure focusable elements are keyboard accessible
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Interactive element
</div>
```

### 4. Color Contrast

- Maintain minimum 4.5:1 contrast ratio for normal text
- 3:1 for large text and UI components
- Use tools to verify contrast

## Component Development Checklist

- [ ] Follows naming conventions
- [ ] TypeScript types defined
- [ ] Accessible (ARIA, keyboard navigation)
- [ ] Responsive design
- [ ] Error states handled
- [ ] Loading states handled
- [ ] Empty states handled
- [ ] Props documentation
- [ ] Reusable and composable
- [ ] Performance optimized

## Best Practices

1. **Use design tokens** - Maintain consistency with predefined values
2. **Component composition** - Build complex UIs from simple components
3. **Prop interfaces** - Clear TypeScript interfaces for all components
4. **Controlled components** - Prefer controlled over uncontrolled components
5. **Accessibility first** - Build with accessibility in mind
6. **Mobile responsive** - Test on various screen sizes
7. **Performance** - Lazy load, memoize, and optimize re-renders
8. **Documentation** - Document component usage and props
