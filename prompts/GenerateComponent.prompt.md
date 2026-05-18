# Generate Component Prompt

## Objective

Generate a production-ready, reusable React component using the latest tech stack (React 19, TypeScript 6) based on specifications from `docs/components/ComponentTemplate.md` and `docs/components/DesignTemplate.md`.

## Tech Stack Requirements

- **React** 19.2.6 with functional components
- **TypeScript** ~6.0.2 with strict typing
- **Tailwind CSS** 3.4.19 for styling
- **React Error Boundary** for error handling (if needed)

## Component Structure

### File Location

Place components in the appropriate directory:

- **Shared components**: `src/components/[ComponentName]/[ComponentName].tsx`
- **Form components**: `src/components/forms/Form[ComponentName].tsx`
- **Common UI**: `src/components/common/[ComponentName].tsx`
- **Page-specific**: `src/pages/[PageName]/components/[ComponentName].tsx`

### Component Template

```typescript
import { type FC } from 'react'

interface [ComponentName]Props {
  // Define all props with TypeScript types
  children?: React.ReactNode
  className?: string
  // Add other props based on ComponentTemplate.md
}

export const [ComponentName]: FC<[ComponentName]Props> = ({
  children,
  className,
  // Destructure other props
}) => {
  // Component logic here

  return (
    <div className={cn('base-styles', className)}>
      {/* Component JSX */}
    </div>
  )
}
```

## Requirements Checklist

### 1. TypeScript Interface

- [ ] Create strongly-typed props interface
- [ ] Use TypeScript utility types (Pick, Omit, Partial) when appropriate
- [ ] Export interface for reusability
- [ ] Add JSDoc comments for complex props

### 2. Styling with Tailwind CSS

- [ ] Use semantic Tailwind utility classes
- [ ] Follow design tokens from `docs/design-system/DesignTokens.md`
- [ ] No inline styles or hardcoded hex colors
- [ ] Use `cn()` utility for conditional classes
- [ ] Implement responsive classes (sm:, md:, lg:, xl:)

### 3. Accessibility

- [ ] Add appropriate ARIA attributes (`aria-label`, `aria-describedby`, `role`)
- [ ] Ensure keyboard navigation support
- [ ] Use semantic HTML elements
- [ ] Add `alt` text for images
- [ ] Proper focus management
- [ ] Color contrast meets WCAG AA standards

### 4. State Management

- [ ] Use `useState` for local component state
- [ ] Use `useReducer` for complex state logic
- [ ] Implement controlled components for form inputs
- [ ] Handle loading states with proper UI feedback
- [ ] Handle error states with user-friendly messages

### 5. Error Handling

- [ ] Wrap async operations in try-catch blocks
- [ ] Display error messages accessibly
- [ ] Use ErrorBoundary for component-level errors (if needed)
- [ ] Log errors appropriately

### 6. Performance

- [ ] Use `React.memo()` for expensive re-renders
- [ ] Use `useCallback` for event handlers passed to children
- [ ] Use `useMemo` for expensive computations
- [ ] Lazy load heavy components if needed

### 7. Responsive Design

- [ ] Mobile-first approach
- [ ] Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- [ ] Test on different screen sizes
- [ ] Touch-friendly interactive elements (min 44x44px)

### 8. Component Export

```typescript
// Named export (preferred)
export const ComponentName = () => {};

// Default export for lazy loading
export default ComponentName;
```

## Example: Button Component

```typescript
import { type ButtonHTMLAttributes, type FC } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary',
    secondary: 'bg-surface text-primary hover:bg-surface-hover',
    outline: 'border border-border bg-transparent hover:bg-surface',
    ghost: 'hover:bg-surface hover:text-primary',
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
```

## Coding Standards

Follow the project's coding standards from `.github/copilot-instructions.md`:

- Use functional React components
- PascalCase for component names
- Keep components modular and reusable
- Prefer composition over inheritance
- Single Responsibility Principle

## Testing

Create corresponding test file: `tests/components/[ComponentName].test.tsx`

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '../../src/components/common/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

## Deliverables

1. Component file with full implementation
2. TypeScript interface exported
3. Accessibility attributes included
4. Responsive Tailwind styles
5. Error and loading states
6. Unit tests
7. JSDoc comments for complex logic
