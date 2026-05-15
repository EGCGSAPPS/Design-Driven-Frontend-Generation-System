import { type PropsWithChildren } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const Fallback = () => <div className="card-surface text-danger">Something went wrong.</div>

export const ErrorBoundary = ({ children }: PropsWithChildren) => (
  <ReactErrorBoundary fallbackRender={Fallback}>{children}</ReactErrorBoundary>
)
