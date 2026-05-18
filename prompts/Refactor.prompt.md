# Refactor Code Prompt

## Objective

Refactor existing code to improve maintainability, reduce duplication, enhance type safety, optimize performance, and adhere to project standards while preserving existing functionality.

## Tech Stack Context

- **React** 19.2.6 - Use latest features and patterns
- **TypeScript** ~6.0.2 - Leverage strict type checking
- **Vite** 8.0.12 - Build tool optimization
- **Tailwind CSS** 3.4.19 - Utility-first styling
- **Redux Toolkit** 2.11.2 - State management
- **React Router DOM** 7.15.1 - Routing

## Refactoring Principles

### 1. Code Organization

- **Single Responsibility Principle**: Each function/component should do one thing
- **DRY (Don't Repeat Yourself)**: Extract common logic into reusable utilities
- **Separation of Concerns**: Separate business logic from UI
- **Modular Architecture**: Keep related code together

### 2. Type Safety

- **Strict TypeScript**: Use strict mode, avoid `any`
- **Type Inference**: Let TypeScript infer types when possible
- **Explicit Interfaces**: Define clear interfaces for props and data
- **Utility Types**: Use Pick, Omit, Partial, Required appropriately

### 3. Performance

- **Memoization**: Use `React.memo()`, `useMemo()`, `useCallback()`
- **Code Splitting**: Lazy load routes and heavy components
- **Bundle Size**: Remove unused imports and dependencies
- **Efficient Re-renders**: Optimize component updates

## Refactoring Patterns

### Pattern 1: Extract Custom Hooks

**Before:**

```typescript
const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Component logic...
};
```

**After:**

```typescript
// hooks/useDataFetch.ts
const useDataFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get(url);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Component
const MyComponent = () => {
  const { data, loading, error } = useDataFetch("/api/data");
  // Component logic...
};
```

### Pattern 2: Extract Utility Functions

**Before:**

```typescript
const Component1 = () => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return <div>{formatDate(someDate)}</div>
}

const Component2 = () => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return <div>{formatDate(anotherDate)}</div>
}
```

**After:**

```typescript
// utils/date.ts
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Components
const Component1 = () => <div>{formatDate(someDate)}</div>
const Component2 = () => <div>{formatDate(anotherDate)}</div>
```

### Pattern 3: Component Composition

**Before:**

```typescript
const UserProfile = ({ user, showActions }) => {
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {showActions && (
        <div className="actions">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  )
}
```

**After:**

```typescript
const UserAvatar = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="rounded-full h-16 w-16" />
)

const UserInfo = ({ name, email }: { name: string; email: string }) => (
  <div>
    <h2 className="text-xl font-semibold">{name}</h2>
    <p className="text-gray-600">{email}</p>
  </div>
)

const UserActions = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
  <div className="flex gap-2">
    <Button onClick={onEdit}>Edit</Button>
    <Button onClick={onDelete} variant="outline">Delete</Button>
  </div>
)

const UserProfile = ({ user, showActions, onEdit, onDelete }) => (
  <div className="flex items-center gap-4 p-4">
    <UserAvatar src={user.avatar} alt={user.name} />
    <UserInfo name={user.name} email={user.email} />
    {showActions && <UserActions onEdit={onEdit} onDelete={onDelete} />}
  </div>
)
```

### Pattern 4: Redux State to Custom Hook

**Before:**

```typescript
const MyComponent = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.feature.data);
  const loading = useAppSelector((state) => state.feature.loading);
  const error = useAppSelector((state) => state.feature.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Component logic...
};
```

**After:**

```typescript
// hooks/useFeature.ts
export const useFeature = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectFeatureData);
  const loading = useAppSelector(selectFeatureLoading);
  const error = useAppSelector(selectFeatureError);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return { data, loading, error };
};

// Component
const MyComponent = () => {
  const { data, loading, error } = useFeature();
  // Component logic...
};
```

### Pattern 5: Consolidate Type Definitions

**Before:**

```typescript
// File1.tsx
interface User {
  id: string;
  name: string;
}

// File2.tsx
interface User {
  id: string;
  name: string;
}
```

**After:**

```typescript
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile extends User {
  avatar: string;
  bio: string;
}

// Files
import type { User } from "../types/user";
```

### Pattern 6: Extract Constants

**Before:**

```typescript
const Component1 = () => {
  const maxLength = 255
  return <input maxLength={maxLength} />
}

const Component2 = () => {
  if (value.length > 255) {
    // error
  }
}
```

**After:**

```typescript
// constants/validation.ts
export const INPUT_MAX_LENGTH = 255
export const PASSWORD_MIN_LENGTH = 8

// Components
import { INPUT_MAX_LENGTH } from '../constants/validation'

const Component1 = () => <input maxLength={INPUT_MAX_LENGTH} />
const Component2 = () => {
  if (value.length > INPUT_MAX_LENGTH) {
    // error
  }
}
```

## Refactoring Checklist

### Code Quality

- [ ] Remove duplicated code
- [ ] Extract reusable functions/components
- [ ] Simplify complex conditionals
- [ ] Remove dead code
- [ ] Fix linting warnings
- [ ] Remove console.logs

### Type Safety

- [ ] Replace `any` with specific types
- [ ] Add missing type annotations
- [ ] Use const assertions where appropriate
- [ ] Define proper interfaces
- [ ] Use discriminated unions for variants

### Performance

- [ ] Memoize expensive computations
- [ ] Optimize re-renders
- [ ] Remove unnecessary dependencies
- [ ] Lazy load heavy components
- [ ] Debounce/throttle frequent operations

### Maintainability

- [ ] Consistent naming conventions
- [ ] Clear function/variable names
- [ ] Add JSDoc comments for complex logic
- [ ] Organize imports
- [ ] Follow project folder structure

### Testing

- [ ] Add missing tests
- [ ] Update tests after refactoring
- [ ] Ensure code coverage
- [ ] Test edge cases

### Accessibility

- [ ] Add ARIA attributes
- [ ] Ensure keyboard navigation
- [ ] Semantic HTML elements
- [ ] Focus management

### Styling

- [ ] Use Tailwind utility classes
- [ ] Remove inline styles
- [ ] Extract repeated class combinations
- [ ] Use design tokens
- [ ] Responsive classes

## Project Standards Compliance

Follow `.github/copilot-instructions.md`:

### Coding Standards

- [ ] Functional React components with TypeScript
- [ ] Keep code modular and reusable
- [ ] Avoid duplication in API and validation logic
- [ ] Feature-focused organization

### Architecture Rules

- [ ] Routes centralized in `src/routes`
- [ ] Shared platform concerns in `src/services`, `src/store`, `src/constants`
- [ ] Composition through hooks and components

### Naming Conventions

- [ ] Components: PascalCase
- [ ] Hooks: `use` prefix
- [ ] Constants: `UPPER_SNAKE_CASE`
- [ ] File names reflect exported symbols

### Tailwind Rules

- [ ] Use theme tokens from `tailwind.config.ts`
- [ ] No inline styles or hardcoded colors
- [ ] Semantic utility combinations

### Redux Rules

- [ ] Async logic in `createAsyncThunk`
- [ ] Use typed hooks
- [ ] Normalized, serializable state

### Form Rules

- [ ] React Hook Form components
- [ ] Zod schemas from `src/validations`
- [ ] Accessible error messages

## Refactoring Process

1. **Understand**: Read and understand existing code
2. **Identify**: Spot code smells and improvement opportunities
3. **Plan**: Create refactoring strategy
4. **Test**: Ensure tests exist before refactoring
5. **Refactor**: Make incremental changes
6. **Verify**: Run tests after each change
7. **Review**: Check against coding standards
8. **Document**: Update comments/docs if needed

## Testing After Refactoring

```typescript
// Ensure all tests pass
yarn test

// Check for type errors
yarn build

// Lint code
yarn lint
```

## Common Refactoring Scenarios

### 1. Large Component → Smaller Components

Break down 500+ line components into focused, reusable pieces

### 2. Props Drilling → Context/Redux

When passing props through 3+ levels, use context or Redux

### 3. Inline Logic → Custom Hooks

Extract component logic into reusable hooks

### 4. Hard-coded Values → Constants

Move magic numbers/strings to constant files

### 5. Repeated Patterns → Utility Functions

Create helper functions for common operations

### 6. Complex State → useReducer/Redux

Simplify complex state management

### 7. Callback Hell → Async/Await

Modernize promise chains

### 8. Class Components → Functional Components

Convert to functional with hooks (if any remain)

## Deliverables

1. Refactored code following standards
2. Maintained or improved test coverage
3. Updated type definitions
4. Documentation updates (if needed)
5. No breaking changes (unless planned)
6. Performance improvements (measured)
7. Reduced code duplication
8. Improved readability and maintainability
