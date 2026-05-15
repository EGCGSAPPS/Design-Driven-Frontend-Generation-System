import { type PropsWithChildren } from 'react'

export interface ModalProps extends PropsWithChildren {
  title: string
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4" role="presentation">
      <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-lg rounded-lg bg-panel p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary" aria-label="Close modal">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
