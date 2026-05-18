# Generate Redux Slice Prompt

## Objective

Generate a Redux Toolkit slice with TypeScript types, async thunks, reducers, selectors, and comprehensive error handling.

## Tech Stack Requirements

- **Redux Toolkit** 2.11.2 - State management
- **React Redux** 9.2.0 - React bindings
- **TypeScript** ~6.0.2 - Type safety
- **Axios** 1.16.1 - HTTP client (if needed)

## Redux Architecture

```
src/store/
├── store.ts                  # Store configuration
├── hooks.ts                  # Typed hooks
├── slices/                   # Feature slices
│   └── [feature]Slice.ts
└── middleware/               # Custom middleware
    └── errorMiddleware.ts
```

## Slice Template

### File: `src/store/slices/[feature]Slice.ts`

```typescript
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { httpClient } from '../../services/api/httpClient'

// Types
interface [Feature]Item {
  id: string
  name: string
  // Add other fields
}

interface [Feature]State {
  items: [Feature]Item[]
  selectedItem: [Feature]Item | null
  loading: boolean
  error: string | null
  filters: {
    search: string
    status: string
  }
}

// Initial State
const initialState: [Feature]State = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
  },
}

// Async Thunks
export const fetch[Feature]Items = createAsyncThunk(
  '[feature]/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<[Feature]Item[]>('/api/[feature]')
      return response.data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch items')
    }
  }
)

export const create[Feature]Item = createAsyncThunk(
  '[feature]/createItem',
  async (item: Omit<[Feature]Item, 'id'>, { rejectWithValue }) => {
    try {
      const response = await httpClient.post<[Feature]Item>('/api/[feature]', item)
      return response.data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create item')
    }
  }
)

export const update[Feature]Item = createAsyncThunk(
  '[feature]/updateItem',
  async (item: [Feature]Item, { rejectWithValue }) => {
    try {
      const response = await httpClient.put<[Feature]Item>(`/api/[feature]/${item.id}`, item)
      return response.data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update item')
    }
  }
)

export const delete[Feature]Item = createAsyncThunk(
  '[feature]/deleteItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await httpClient.delete(`/api/[feature]/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete item')
    }
  }
)

// Slice
const [feature]Slice = createSlice({
  name: '[feature]',
  initialState,
  reducers: {
    // Synchronous actions
    setSelectedItem: (state, action: PayloadAction<[Feature]Item | null>) => {
      state.selectedItem = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    clearError: (state) => {
      state.error = null
    },
    reset[Feature]: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Items
    builder
      .addCase(fetch[Feature]Items.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetch[Feature]Items.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetch[Feature]Items.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create Item
    builder
      .addCase(create[Feature]Item.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create[Feature]Item.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create[Feature]Item.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update Item
    builder
      .addCase(update[Feature]Item.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update[Feature]Item.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(update[Feature]Item.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete Item
    builder
      .addCase(delete[Feature]Item.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(delete[Feature]Item.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addCase(delete[Feature]Item.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

// Actions
export const {
  setSelectedItem,
  setSearchFilter,
  setStatusFilter,
  clearFilters,
  clearError,
  reset[Feature],
} = [feature]Slice.actions

// Selectors
export const select[Feature]Items = (state: RootState) => state.[feature].items
export const select[Feature]Loading = (state: RootState) => state.[feature].loading
export const select[Feature]Error = (state: RootState) => state.[feature].error
export const selectSelected[Feature]Item = (state: RootState) => state.[feature].selectedItem
export const select[Feature]Filters = (state: RootState) => state.[feature].filters

// Memoized selectors (using createSelector if needed)
export const selectFiltered[Feature]Items = (state: RootState) => {
  const items = state.[feature].items
  const filters = state.[feature].filters

  return items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStatus = filters.status === 'all' || item.status === filters.status
    return matchesSearch && matchesStatus
  })
}

// Reducer
export default [feature]Slice.reducer

// Type exports
export type { [Feature]Item, [Feature]State }
```

## Store Integration

### 1. Add to Root Reducer

Update `src/store/store.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import [feature]Reducer from './slices/[feature]Slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [feature]: [feature]Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 2. Use Typed Hooks

File: `src/store/hooks.ts`

```typescript
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

## Usage in Components

```typescript
import { type FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetch[Feature]Items,
  select[Feature]Items,
  select[Feature]Loading,
  select[Feature]Error,
  setSearchFilter,
} from '../../store/slices/[feature]Slice'

export const [Feature]Page: FC = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(select[Feature]Items)
  const loading = useAppSelector(select[Feature]Loading)
  const error = useAppSelector(select[Feature]Error)

  useEffect(() => {
    dispatch(fetch[Feature]Items())
  }, [dispatch])

  const handleSearch = (search: string) => {
    dispatch(setSearchFilter(search))
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

## Requirements Checklist

### 1. State Shape

- [ ] Define TypeScript interfaces for state
- [ ] Set appropriate initial state
- [ ] Keep state normalized
- [ ] Make state serializable

### 2. Async Thunks

- [ ] Create thunks for async operations
- [ ] Use proper TypeScript generics
- [ ] Handle errors with `rejectWithValue`
- [ ] Return appropriate data types

### 3. Reducers

- [ ] Create synchronous reducers for simple updates
- [ ] Use Immer (built-in) for immutable updates
- [ ] Handle all async thunk states (pending, fulfilled, rejected)
- [ ] Keep reducer logic pure

### 4. Selectors

- [ ] Export basic selectors
- [ ] Create memoized selectors for computed values
- [ ] Use descriptive selector names
- [ ] Type selectors with RootState

### 5. Error Handling

- [ ] Catch errors in async thunks
- [ ] Store error messages in state
- [ ] Provide clear error messages
- [ ] Add action to clear errors

### 6. Loading States

- [ ] Set loading to true on pending
- [ ] Set loading to false on fulfilled/rejected
- [ ] Show loading indicators in UI

### 7. Type Safety

- [ ] Export all types
- [ ] Use TypeScript for all actions
- [ ] Type async thunk payloads
- [ ] Use typed hooks

## Testing

Create test file: `tests/store/[feature]Slice.test.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit'
import [feature]Reducer, {
  fetch[Feature]Items,
  setSearchFilter,
} from '../../src/store/slices/[feature]Slice'

describe('[feature]Slice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [feature]: [feature]Reducer,
      },
    })
  })

  it('should set search filter', () => {
    store.dispatch(setSearchFilter('test'))
    expect(store.getState().[feature].filters.search).toBe('test')
  })

  it('should handle pending state', () => {
    store.dispatch(fetch[Feature]Items.pending(''))
    expect(store.getState().[feature].loading).toBe(true)
    expect(store.getState().[feature].error).toBe(null)
  })

  it('should handle fulfilled state', () => {
    const items = [{ id: '1', name: 'Item 1' }]
    store.dispatch(fetch[Feature]Items.fulfilled(items, ''))
    expect(store.getState().[feature].loading).toBe(false)
    expect(store.getState().[feature].items).toEqual(items)
  })

  it('should handle rejected state', () => {
    const error = 'Failed to fetch'
    store.dispatch(fetch[Feature]Items.rejected(null, '', undefined, error))
    expect(store.getState().[feature].loading).toBe(false)
    expect(store.getState().[feature].error).toBe(error)
  })
})
```

## Best Practices

- Keep async logic in `createAsyncThunk`
- Use typed hooks from `src/store/hooks.ts`
- Keep state normalized and serializable
- Use selector functions for derived state
- Handle loading and error states
- Follow Redux Toolkit patterns
- Test reducers and thunks

## Deliverables

1. Redux slice file
2. Async thunks for API calls
3. Synchronous reducers
4. Selectors (basic and memoized)
5. TypeScript types
6. Store integration
7. Unit tests
8. Error handling
