import React, { useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

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

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      {/* Backdrop */}
      <div
        className={[
          'absolute inset-0 bg-black/70 backdrop-blur-sm',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={[
          'relative w-full bg-surface-2 rounded-2xl shadow-2xl border border-border',
          'flex flex-col max-h-[90vh]',
          'transition-all duration-300',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          sizeClasses[size],
        ].join(' ')}
      >
        {/* Header */}
        {title && (
          <>
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <h2 className="font-heading text-xl font-semibold text-primary leading-tight">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar modal"
                className={[
                  'shrink-0 inline-flex items-center justify-center',
                  'h-8 w-8 rounded-lg text-primary/50',
                  'hover:text-primary hover:bg-surface',
                  'transition-colors duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                ].join(' ')}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="border-t border-border" />
          </>
        )}

        {/* Close button when no title */}
        {!title && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className={[
              'absolute top-4 right-4 z-10',
              'inline-flex items-center justify-center',
              'h-8 w-8 rounded-lg text-primary/50',
              'hover:text-primary hover:bg-surface',
              'transition-colors duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
            ].join(' ')}
          >
            <CloseIcon />
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
