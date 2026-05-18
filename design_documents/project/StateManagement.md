# State Management with Redux Toolkit

## Overview

This application uses Redux Toolkit for predictable state management, providing a centralized store for application data with TypeScript support.

## Architecture

```
Redux Store
├── Store Configuration (store/index.ts)
├── Root Reducer (store/reducer.ts)
├── Typed Hooks (store/store-hook.ts)
└── Slices (store/slices/)
    ├── actions.slice.ts
    ├── actionSave.slice.ts
    ├── allissues.slice.ts
    ├── userGroup.slice.ts
    └── ... (more slices)
```

## Store Configuration

### 1. Store Setup (`store/index.ts`)

```typescript
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Root Reducer (`store/reducer.ts`)

```typescript
import { combineReducers } from "@reduxjs/toolkit";

// Import all slices
import actionsReducer from "./slices/actions.slice";
import actionSaveReducer from "./slices/actionSave.slice";
import allIssuesReducer from "./slices/allissues.slice";
import userGroupReducer from "./slices/userGroup.slice";
// ... more reducers

const rootReducer = combineReducers({
  actions: actionsReducer,
  actionSave: actionSaveReducer,
  allIssues: allIssuesReducer,
  userGroup: userGroupReducer,
  // ... more reducers
});

export default rootReducer;
```

### 3. Typed Hooks (`store/store-hook.ts`)

```typescript
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### 4. Provider Setup (`main.tsx`)

```typescript
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_APP_PATH}>
      <Provider store={store}>
        <App />
        <ToastProvider />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
```

## Creating Redux Slices

### Basic Slice Structure

```typescript
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type RootState } from "..";

// Define types
interface DataItem {
  id: number;
  name: string;
  // ... more fields
}

interface SliceState {
  data: DataItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

// Initial state
const initialState: SliceState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

// Async thunk for API calls
export const fetchData = createAsyncThunk(
  "slice/fetchData",
  async (args: { param: string }) => {
    const response = await fetch(`/api/endpoint?param=${args.param}`);
    return response.json();
  },
);

// Create slice
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    // Synchronous actions
    setData: (state, action: PayloadAction<DataItem[]>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = [];
    },
    updateItem: (state, action: PayloadAction<DataItem>) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Async action handlers
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "An error occurred";
      });
  },
});

// Export actions
export const { setData, clearData, updateItem } = dataSlice.actions;

// Selectors
export const selectData = (state: RootState) => state.dataSlice.data;
export const selectIsLoading = (state: RootState) => state.dataSlice.isLoading;
export const selectIsError = (state: RootState) => state.dataSlice.isError;

// Export reducer
export default dataSlice.reducer;
```

## Advanced Patterns

### 1. Normalized State with Entities

```typescript
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
}

const itemsAdapter = createEntityAdapter<Item>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const itemsSlice = createSlice({
  name: "items",
  initialState: itemsAdapter.getInitialState({
    isLoading: false,
  }),
  reducers: {
    addItem: itemsAdapter.addOne,
    addItems: itemsAdapter.addMany,
    updateItem: itemsAdapter.updateOne,
    removeItem: itemsAdapter.removeOne,
  },
});

// Selectors
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
} = itemsAdapter.getSelectors((state: RootState) => state.items);
```

### 2. Async Thunks with Authentication

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";
import { acquireAccessToken } from "@/auth-config";

export const fetchProtectedData = createAsyncThunk(
  "data/fetchProtected",
  async (args: { endpoint: string }) => {
    const accessToken = await acquireAccessToken();

    const response = await fetch(`${API_URL}/${args.endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  },
);
```

### 3. Tab-Based State Management

```typescript
interface TabData {
  [tabKey: string]: {
    data: any;
    isLoading: boolean;
    formData: any;
  };
}

interface TabState {
  tabs: TabData;
}

const initialState: TabState = {
  tabs: {},
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabData: (
      state,
      action: PayloadAction<{ tabKey: string; data: any }>,
    ) => {
      const { tabKey, data } = action.payload;
      if (!state.tabs[tabKey]) {
        state.tabs[tabKey] = { data: null, isLoading: false, formData: {} };
      }
      state.tabs[tabKey].data = data;
    },
    setTabFormData: (
      state,
      action: PayloadAction<{ tabKey: string; formData: any }>,
    ) => {
      const { tabKey, formData } = action.payload;
      if (!state.tabs[tabKey]) {
        state.tabs[tabKey] = { data: null, isLoading: false, formData: {} };
      }
      state.tabs[tabKey].formData = formData;
    },
  },
});

// Parameterized selectors
export const selectTabData = (state: RootState, tabKey: string) =>
  state.tabs.tabs[tabKey]?.data;

export const selectTabFormData = (state: RootState, tabKey: string) =>
  state.tabs.tabs[tabKey]?.formData;
```

### 4. Integration with Toast Service

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";
import toastService from "@/services/toast.service";

export const saveData = createAsyncThunk(
  "data/save",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const result = await response.json();

      // Show success toast
      toastService.showToast({
        type: "success",
        message: "Data saved successfully",
      });

      return result;
    } catch (error) {
      // Show error toast
      toastService.showToast({
        type: "error",
        message: error.message || "Failed to save data",
      });

      return rejectWithValue(error.message);
    }
  },
);
```

## Using Redux in Components

### 1. Reading State

```typescript
import { useAppSelector } from "@/store/store-hook";
import { selectData, selectIsLoading } from "@/store/slices/data.slice";

function MyComponent() {
  const data = useAppSelector(selectData);
  const isLoading = useAppSelector(selectIsLoading);

  // Or access state directly
  const items = useAppSelector((state) => state.dataSlice.data);

  return (
    <div>
      {isLoading ? <Loader /> : <DataList data={data} />}
    </div>
  );
}
```

### 2. Dispatching Actions

```typescript
import { useAppDispatch } from "@/store/store-hook";
import { fetchData, setData } from "@/store/slices/data.slice";

function MyComponent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch async thunk
    dispatch(fetchData({ param: "value" }));
  }, [dispatch]);

  const handleUpdate = () => {
    // Dispatch synchronous action
    dispatch(setData(newData));
  };

  return <button onClick={handleUpdate}>Update</button>;
}
```

### 3. Parameterized Selectors

```typescript
import { useAppSelector } from "@/store/store-hook";
import { selectTabData } from "@/store/slices/tabs.slice";
import type { RootState } from "@/store";

function TabComponent({ tabKey }: { tabKey: string }) {
  const tabData = useAppSelector((state: RootState) =>
    selectTabData(state, tabKey)
  );

  return <div>{tabData?.name}</div>;
}
```

## Performance Optimization

### 1. Memoized Selectors (Reselect)

```typescript
import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state: RootState) => state.items.data;
const selectFilter = (state: RootState) => state.items.filter;

export const selectFilteredItems = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    return items.filter((item) => item.name.includes(filter));
  },
);
```

### 2. Selective Re-renders

```typescript
// Only re-render when specific fields change
const name = useAppSelector((state) => state.user.name);
const email = useAppSelector((state) => state.user.email);

// Instead of
const user = useAppSelector((state) => state.user);
```

## Best Practices

### 1. Slice Organization

```
slices/
├── feature1.slice.ts      // Feature-based slices
├── feature2.slice.ts
├── ui.slice.ts            // UI state
└── user.slice.ts          // User data
```

### 2. Action Naming Conventions

```typescript
// Pattern: domain/action
"users/fetch";
"users/update";
"posts/create";
"ui/toggleModal";
```

### 3. Type Safety

```typescript
// Always type your state
interface State {
  data: Data[]; // Not: any
  status: "idle" | "loading" | "succeeded" | "failed"; // Use union types
}

// Type action payloads
setUser: (state, action: PayloadAction<User>) => {
  state.user = action.payload;
};
```

### 4. Error Handling

```typescript
extraReducers: (builder) => {
  builder.addCase(fetchData.rejected, (state, action) => {
    state.isError = true;
    state.errorMessage = action.error.message || "Unknown error";
    // Log to error tracking service
    console.error("Fetch failed:", action.error);
  });
};
```

### 5. Loading States

```typescript
// Use standard loading states
type LoadingState = "idle" | "loading" | "succeeded" | "failed";

interface State {
  status: LoadingState;
  error: string | null;
}
```

## Common Patterns

### 1. Optimistic Updates

```typescript
const updateItem = createAsyncThunk(
  "items/update",
  async (item: Item, { rejectWithValue, dispatch }) => {
    // Optimistically update UI
    dispatch(itemSlice.actions.updateItemOptimistic(item));

    try {
      const response = await api.updateItem(item);
      return response.data;
    } catch (error) {
      // Revert on failure
      dispatch(itemSlice.actions.revertUpdate(item.id));
      return rejectWithValue(error.message);
    }
  },
);
```

### 2. Polling

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    dispatch(fetchLatestData());
  }, 5000);

  return () => clearInterval(interval);
}, [dispatch]);
```

### 3. Reset State

```typescript
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
});
```

## Testing Redux

### Test Async Thunks

```typescript
import { fetchData } from "./data.slice";

test("fetches data successfully", async () => {
  const result = await store.dispatch(fetchData({ param: "test" }));
  expect(result.payload).toEqual(expectedData);
});
```

### Test Reducers

```typescript
import reducer, { setData } from "./data.slice";

test("sets data", () => {
  const newState = reducer(initialState, setData(mockData));
  expect(newState.data).toEqual(mockData);
});
```

## Debugging

### Redux DevTools

```typescript
// Automatically enabled in development
// View actions, state changes, and time-travel debugging
```

### Logging Middleware

```typescript
const logger = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
```
