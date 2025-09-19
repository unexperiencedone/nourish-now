import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalOverlayManager');
  }
  return context;
};

const ModalOverlay = ({ isOpen, onClose, children, title, size = 'default', showCloseButton = true }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus trap setup
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabIndex="-1"])';
      const modal = document.querySelector('[data-modal="true"]');
      
      if (modal) {
        const firstFocusableElement = modal?.querySelectorAll(focusableElements)?.[0];
        const focusableContent = modal?.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent?.[focusableContent?.length - 1];

        // Focus first element
        if (firstFocusableElement) {
          firstFocusableElement?.focus();
        }

        // Handle tab key for focus trap
        const handleTabKey = (e) => {
          if (e?.key === 'Tab') {
            if (e?.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement?.focus();
                e?.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableElement) {
                firstFocusableElement?.focus();
                e?.preventDefault();
              }
            }
          }
        };

        // Handle escape key
        const handleEscapeKey = (e) => {
          if (e?.key === 'Escape') {
            onClose();
          }
        };

        document.addEventListener('keydown', handleTabKey);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
          document.removeEventListener('keydown', handleTabKey);
          document.removeEventListener('keydown', handleEscapeKey);
        };
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-card rounded-lg shadow-soft-lg border border-border w-full ${sizeClasses?.[size]} max-h-[90vh] overflow-hidden transition-all duration-300 transform`}
        data-modal="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            {title && (
              <h2 id="modal-title" className="text-lg font-heading font-semibold text-foreground">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
                className="w-8 h-8 text-muted-foreground hover:text-foreground"
                aria-label="Close modal"
              />
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ModalOverlayManager = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = (modalConfig) => {
    const modalId = Date.now()?.toString();
    const modal = {
      id: modalId,
      ...modalConfig,
      isOpen: true
    };
    
    setModals(prev => [...prev, modal]);
    return modalId;
  };

  const closeModal = (modalId) => {
    setModals(prev => prev?.filter(modal => modal?.id !== modalId));
  };

  const closeAllModals = () => {
    setModals([]);
  };

  const updateModal = (modalId, updates) => {
    setModals(prev => prev?.map(modal => 
      modal?.id === modalId ? { ...modal, ...updates } : modal
    ));
  };

  // Mobile-specific modal handling
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const contextValue = {
    openModal,
    closeModal,
    closeAllModals,
    updateModal,
    modals,
    isMobile
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {/* Render all active modals */}
      {modals?.map((modal) => (
        <ModalOverlay
          key={modal?.id}
          isOpen={modal?.isOpen}
          onClose={() => closeModal(modal?.id)}
          title={modal?.title}
          size={isMobile ? 'full' : modal?.size}
          showCloseButton={modal?.showCloseButton}
        >
          {modal?.content}
        </ModalOverlay>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalOverlayManager;