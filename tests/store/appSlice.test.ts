import { describe, expect, it } from '@jest/globals'
import reducer, { fetchHealth, type AppState } from '../../src/store/slices/appSlice'

describe('appSlice', () => {
  const initialState: AppState = {
    title: 'Enterprise Dashboard',
    isLoading: false,
    error: null,
  }

  it('handles fetchHealth.pending', () => {
    const next = reducer(initialState, { type: fetchHealth.pending.type })
    expect(next.isLoading).toBe(true)
    expect(next.error).toBeNull()
  })
})
