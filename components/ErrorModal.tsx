
import React, { useState, useEffect } from 'react';
import type { AppError } from '../types';

interface ErrorModalProps {
  isOpen: boolean;
  error: AppError | null;
  onClose: () => void;
  t: (key: string) => string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, error, onClose, t }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Hide details when modal is closed/reopened
    if (!isOpen) {
      setShowDetails(false);
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      aria-labelledby="error-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-full max-w-md mx-4 p-6 text-slate-200 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-slate-100" id="error-modal-title">
              {t('errorModal.title')}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-slate-400">
                {error?.summary || t('errorModal.defaultSummary')}
              </p>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 bg-slate-900 border border-slate-700 rounded-md p-3 max-h-48 overflow-y-auto">
              <pre className="text-xs text-slate-400 whitespace-pre-wrap break-all">
                  <code>{error?.details}</code>
              </pre>
          </div>
        )}

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:items-center">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            onClick={onClose}
          >
            {t('errorModal.acknowledge')}
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-600 shadow-sm px-4 py-2 bg-slate-700 text-base font-medium text-slate-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
            onClick={() => setShowDetails(prev => !prev)}
          >
            {showDetails ? t('errorModal.hideDetails') : t('errorModal.details')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple animation for the modal
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.3s ease-out forwards;
  }
`;
document.head.append(style);