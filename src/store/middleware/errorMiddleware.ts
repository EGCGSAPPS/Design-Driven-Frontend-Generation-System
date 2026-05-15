import { type Middleware } from '@reduxjs/toolkit'

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof action.type === 'string' &&
    action.type.endsWith('/rejected')
  ) {
    const error = 'error' in action ? action.error : undefined
    if (error && typeof error === 'object' && error !== null && 'message' in error) {
      console.error('Redux async action failed:', error.message)
    }
  }

  return next(action)
}
