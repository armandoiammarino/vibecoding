
import React, { useState, useEffect } from 'react';
import type { Service, CustomService, Filters } from '../types';
import { FilterPanel } from './FilterPanel';

interface ServiceDescriptionProps {
  service: Service;
  language: string;
  translatedDescriptions: Record<string, Record<string, string>>;
  onTranslateDescription: (service: CustomService, lang: string) => Promise<void>;
  t: (key: string) => string;
}

const ServiceDescription: React.FC<ServiceDescriptionProps> = ({ service, language, translatedDescriptions, onTranslateDescription, t }) => {
  const [isTranslating, setIsTranslating] = useState(false);

  if (!('isCustom' in service)) {
    return <p className="text-sm text-slate-400 mt-1">{t(service.descriptionKey)}</p>;
  }

  const cachedTranslation = translatedDescriptions[service.url]?.[language];

  useEffect(() => {
    // Check specifically for `undefined` to handle cases where a translation is an empty string.
    if (language !== 'en' && cachedTranslation === undefined && !isTranslating && service.description) {
      setIsTranslating(true);
      onTranslateDescription(service, language).finally(() => {
        setIsTranslating(false);
      });
    }
  }, [language, service, cachedTranslation, isTranslating, onTranslateDescription]);

  let content;
  if (language === 'en') {
    content = service.description;
  } else if (cachedTranslation) {
    content = cachedTranslation;
  } else if (isTranslating) {
    content = t('results.translating');
  } else {
    content = service.description || '';
  }
  
  return <p className="text-sm text-slate-400 mt-1">{content}</p>;
};

interface ServiceSelectorProps {
  services: Service[];
  onSelect: (url: string, query: string) => void;
  selectedUrl: string;
  failureCounts: Record<string, number>;
  onResetFailureCount: (url:string) => void;
  onReorder: (services: Service[]) => void;
  isManuallySorted: boolean;
  onToggleSortMode: () => void;
  disabledServices: string[];
  onToggleDisabled: (url: string) => void;
  lockedServices: string[];
  onToggleLock: (url: string) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  language: string;
  translatedDescriptions: Record<string, Record<string, string>>;
  onTranslateDescription: (service: CustomService, lang: string) => Promise<void>;
  onEdit: (service: Service) => void;
  onClone: (service: Service) => void;
  onDelete: (service: Service) => void;
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onClearFilters: () => void;
  uniqueProtocols: string[];
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ 
  services, onSelect, selectedUrl, failureCounts, onResetFailureCount, onReorder,
  isManuallySorted, onToggleSortMode, disabledServices, onToggleDisabled,
  lockedServices, onToggleLock, t, language, translatedDescriptions,
  onTranslateDescription, onEdit, onClone, onDelete, filters, onFilterChange, onClearFilters,
  uniqueProtocols
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const service = services[index];
    if (disabledServices.includes(service.url) || lockedServices.includes(service.url)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/service-index', String(index));
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => setDraggedIndex(index), 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) { setDropTargetIndex(index); }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setDropTargetIndex(null); };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    const newServices = [...services];
    const [draggedItem] = newServices.splice(draggedIndex, 1);
    newServices.splice(dropIndex, 0, draggedItem);
    
    onReorder(newServices);
    cleanupDragState();
  };

  const handleDragEnd = () => cleanupDragState();
  const cleanupDragState = () => { setDraggedIndex(null); setDropTargetIndex(null); };

  const handleSelectService = (url: string, query: string) => {
    if (disabledServices.includes(url) || lockedServices.includes(url)) return;
    onSelect(url, query);
    setIsOpen(false);
  };

  const selectedService = services.find(s => s.url === selectedUrl);
  const getServiceName = (service: Service) => 'isCustom' in service ? service.name : t(service.nameKey);

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 shadow-md">
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }}
        role="button" tabIndex={0} aria-expanded={isOpen}
        className="flex justify-between items-center p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 rounded-lg"
      >
        <div>
          <span className="text-sm font-medium text-sky-300">{t('serviceSelector.currentServiceLabel')}</span>
          <p className={`font-semibold text-slate-100 mt-1 ${!selectedService ? 'italic text-slate-400' : ''}`}>
            {selectedService ? getServiceName(selectedService) : t('serviceSelector.noneSelected')}
          </p>
          {selectedService && <p className="text-xs text-slate-400 mt-1 font-mono break-all">{selectedService.url}</p>}
        </div>
        <svg className={`h-6 w-6 text-slate-400 transform transition-transform duration-200 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="p-4 border-t border-slate-700">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-semibold text-slate-200 text-center sm:text-left">{t('serviceSelector.title')}</h2>
            <button onClick={onToggleSortMode} className="px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500">
              {t('serviceSelector.sortBy', { mode: isManuallySorted ? t('serviceSelector.sortMode.custom') : t('serviceSelector.sortMode.ranking') })}
            </button>
          </div>
          
          <FilterPanel t={t} filters={filters} onFilterChange={onFilterChange} onClearFilters={onClearFilters} uniqueProtocols={uniqueProtocols} />
          
          <div className="space-y-3 mt-4">
            {services.map((service, index) => {
              const isSelected = service.url === selectedUrl;
              const failureCount = failureCounts[service.url] || 0;
              const isBeingDragged = draggedIndex === index;
              const isDropTarget = dropTargetIndex === index;
              const isDisabled = disabledServices.includes(service.url);
              const isLocked = lockedServices.includes(service.url);
              const isInteractive = !isDisabled && !isLocked;
              const uniqueKey = 'isCustom' in service ? service.id : service.nameKey;
              const name = 'isCustom' in service ? service.name : t(service.nameKey);
              
              return (
                <div key={uniqueKey} onClick={() => handleSelectService(service.url, service.defaultQuery)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectService(service.url, service.defaultQuery)}}
                  role="button" tabIndex={isInteractive ? 0 : -1} aria-pressed={isSelected} aria-disabled={!isInteractive}
                  draggable={isInteractive} onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, index)} onDragEnd={handleDragEnd}
                  className={`rounded-lg p-4 border transition-all duration-200 flex flex-col md:flex-row justify-between items-start group relative gap-4 ${
                    !isInteractive 
                      ? 'bg-slate-800/20 border-slate-700/50 opacity-60 cursor-not-allowed' 
                      : `cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 ${
                          isSelected ? 'bg-sky-900/40 border-sky-600' : 'bg-slate-800/50 border-slate-700 hover:border-sky-600 hover:bg-slate-800'
                        }`
                  } ${isBeingDragged ? 'opacity-50' : ''}`}>
                  {isDropTarget && <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500 rounded-full" />}
                  <div className="flex items-start flex-grow w-full">
                     <div className={`text-slate-500 mr-4 pt-1 ${isInteractive ? 'cursor-grab' : ''}`} aria-label={isInteractive ? "Drag to reorder" : undefined}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="6" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="18" r="1.5" fill="currentColor"/><circle cx="15" cy="18" r="1.5" fill="currentColor"/></svg>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 flex-wrap">
                        {'isCustom' in service && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        )}
                        <h3 className={`font-bold ${isInteractive && isSelected ? 'text-sky-300' : 'text-slate-200'} ${isInteractive ? 'group-hover:text-sky-300' : ''}`}>{name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${service.type === 'paid' ? 'bg-amber-800 text-amber-200' : 'bg-green-800 text-green-200'}`}>{t(`addServiceForm.${service.type}`)}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{service.protocol}</span>
                      </div>
                      <ServiceDescription service={service} language={language} t={t} translatedDescriptions={translatedDescriptions} onTranslateDescription={onTranslateDescription} />
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-end gap-2 flex-wrap w-full md:w-auto md:pl-2">
                    <div className="text-center">
                      <span className="text-xs font-medium text-slate-500">{t('serviceSelector.rankingLabel')}</span>
                      <p className={`font-bold text-lg ${failureCount > 0 ? 'text-red-400' : 'text-slate-200'}`}>{failureCount}</p>
                      {failureCount > 0 && <button onClick={(e) => { e.stopPropagation(); onResetFailureCount(service.url); }} className="text-xs text-sky-400 hover:text-sky-300 hover:underline focus:outline-none focus:ring-1 focus:ring-sky-500 rounded mt-1">{t('serviceSelector.reset')}</button>}
                    </div>
                     <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onToggleLock(service.url); }}
                          title={isLocked ? t('serviceSelector.unlockService') : t('serviceSelector.lockService')}
                          disabled={isDisabled}
                          className="p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLocked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 hover:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm5-3a3 3 0 00-3 3v2h6V7a3 3 0 00-3-3z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 hover:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2a1 1 0 102 0V7a5 5 0 00-5-5z" />
                            </svg>
                          )}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onToggleDisabled(service.url); }} disabled={isLocked} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 w-[80px] text-center ${isDisabled ? 'bg-slate-700 text-slate-400' : 'bg-green-900/70 text-green-300'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                          {isDisabled ? t('serviceSelector.disabled') : t('serviceSelector.selectable')}
                        </button>
                      </div>
                      <div className="flex w-full gap-2">
                         <button onClick={(e) => { e.stopPropagation(); onEdit(service); }} disabled={!isInteractive} title={t('serviceSelector.edit')} className="p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 rounded-md flex-grow text-center border border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onClone(service); }} disabled={!isInteractive} title={t('serviceSelector.clone')} className="p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 rounded-md flex-grow text-center border border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(service); }} disabled={!isInteractive} title={t('serviceSelector.delete')} className="p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 rounded-md flex-grow text-center border border-red-600/50 text-red-400 hover:bg-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                    </div>
                     <div className="flex flex-col items-center justify-center gap-2 ml-2">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected && isInteractive ? 'border-sky-500 bg-sky-600' : 'border-slate-500'} ${isInteractive ? 'group-hover:border-sky-500' : ''}`}>
                            {isSelected && isInteractive && <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
