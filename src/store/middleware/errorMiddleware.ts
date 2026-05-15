import { type Middleware } from '@reduxjs/toolkit'

export const errorMiddleware: Middleware = () => (next) => (action) => next(action)
