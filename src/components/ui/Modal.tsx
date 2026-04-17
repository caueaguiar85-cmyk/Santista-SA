import React, { useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={[
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'transition-opacity duration-200',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      {/* Backdrop */}
      <div
        className={[
          'absolute inset-0 backdrop-blur-sm transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{ background: 'var(--t-overlay)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={[
          'relative w-full rounded-2xl flex flex-col max-h-[90vh]',
          'transition-all duration-200',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          sizeClasses[size],
        ].join(' ')}
        style={{
          background: 'var(--t-surface)',
          border: '1px solid var(--t-border)',
          boxShadow: 'var(--t-shadow-lg)',
        }}
      >
        {/* Header */}
        {title && (
          <>
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <h2
                className="font-heading text-lg font-semibold leading-tight"
                style={{ color: 'var(--t-text)' }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar modal"
                className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-150"
                style={{ color: 'var(--t-text-ter)' }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ borderTop: '1px solid var(--t-border)' }} />
          </>
        )}

        {!title && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="absolute top-4 right-4 z-10 inline-flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-150"
            style={{ color: 'var(--t-text-ter)' }}
          >
            <X size={18} />
          </button>
        )}

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
