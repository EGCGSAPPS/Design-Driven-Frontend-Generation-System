export interface EmptyStateProps {
  title: string
  description: string
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <section className="card-surface text-center" aria-live="polite">
    <h2 className="text-base font-semibold">{title}</h2>
    <p className="mt-1 text-sm text-text-muted">{description}</p>
  </section>
)
