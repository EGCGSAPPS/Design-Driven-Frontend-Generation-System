import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWithRetry } from '../../services/api/httpClient'

export interface AppState {
  title: string
  isLoading: boolean
  error: string | null
}

const initialState: AppState = {
  title: 'Enterprise Dashboard',
  isLoading: false,
  error: null,
}

export const fetchHealth = createAsyncThunk('app/fetchHealth', async () => {
  const data = await getWithRetry<{ status: string }>('/health')
  return data.status
})

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealth.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchHealth.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchHealth.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Health check failed'
      })
  },
})

export default appSlice.reducer
