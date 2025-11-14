
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Header } from './components/Header';
import { ApiForm } from './components/ApiForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ErrorModal } from './components/ErrorModal';
import { ServiceSelector } from './components/ServiceSelector';
import { AddServiceForm } from './components/AddServiceForm';
import { EditServiceModal } from './components/EditServiceModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { ClearSettingsConfirmationModal } from './components/ClearSettingsConfirmationModal';
import type { ODataResult, CustomService, Service, AppError, AppSettings, Filters, PresetService } from './types';
import { getTranslator, supportedLanguages } from './i18n';
import { getInitialSettings, PRESET_SERVICES, applyMigrations } from './defaultSettings';

const SETTINGS_KEY = 'eob-app-settings';

function App() {
  const [initialSettings] = useState(() => getInitialSettings(SETTINGS_KEY));
  
  const [serviceUrl, setServiceUrl] = useState<string>(initialSettings.serviceUrl);
  const [query, setQuery] = useState<string>(initialSettings.query);
  const [data, setData] = useState<ODataResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppError | null>(null);
  
  const [language, setLanguage] = useState(initialSettings.language);
  const t = getTranslator(language);

  const [customServices, setCustomServices] = useState<CustomService[]>(initialSettings.customServices);
  const [hiddenPresetNameKeys, setHiddenPresetNameKeys] = useState<string[]>(initialSettings.hiddenPresetNameKeys);
  
  const allServices = useMemo(() => [...PRESET_SERVICES, ...customServices], [customServices]);
  const allServicesMap = useMemo(() => allServices.reduce((acc, s) => { acc[s.url] = s; return acc; }, {} as Record<string, Service>), [allServices]);
  
  const [selectionCounts, setSelectionCounts] = useState<Record<string, number>>(initialSettings.selectionCounts);
  const [failureCounts, setFailureCounts] = useState<Record<string, number>>(initialSettings.failureCounts);
  
  const [isManuallySorted, setIsManuallySorted] = useState(initialSettings.isManuallySorted);
  const [disabledServices, setDisabledServices] = useState<string[]>(initialSettings.disabledServices);
  const [lockedServices, setLockedServices] = useState<string[]>(initialSettings.lockedServices);
  
  const [displayedServiceUrls, setDisplayedServiceUrls] = useState<string[]>(initialSettings.displayedServiceUrls);

  const [translatedDescriptions, setTranslatedDescriptions] = useState<Record<string, Record<string, string>>>(initialSettings.translatedDescriptions);
  
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  
  const importFileRef = useRef<HTMLInputElement>(null);

  const maxRankingValue = useMemo(() => {
    return Math.max(...Object.values(failureCounts).map(v => Number(v) || 0), 0);
  }, [failureCounts]);

  const [filters, setFilters] = useState<Filters>(() => {
    const initialMax = Math.max(...Object.values(initialSettings.failureCounts).map(v => Number(v) || 0), 0);
    return { type: 'all', status: 'all', lock: 'all', protocol: 'all', maxRanking: String(initialMax) };
  });
  
  const uniqueProtocols = useMemo(() => {
      const protocols = new Set(allServices.map(s => s.protocol));
      return ['all', ...Array.from(protocols)];
  }, [allServices]);

  const handleTranslateDescription = useCallback(async (service: CustomService, targetLang: string) => {
    const serviceUrl = service.url;
    const textToTranslate = service.description;

    if (!textToTranslate || targetLang === 'en') {
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const languageName = supportedLanguages[targetLang as keyof typeof supportedLanguages]?.name || targetLang;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Translate the following text to ${languageName}: "${textToTranslate}"`,
      });
      const translatedText = response.text;
      
      setTranslatedDescriptions(prev => ({
        ...prev,
        [serviceUrl]: { ...prev[serviceUrl], [targetLang]: translatedText || textToTranslate },
      }));

    } catch (err) {
      console.error("Translation failed:", err);
      setTranslatedDescriptions(prev => ({
        ...prev,
        [serviceUrl]: { ...prev[serviceUrl], [targetLang]: textToTranslate },
      }));
    }
  }, []);
  
  const visibleServices = useMemo(() => {
    return allServices.filter(s => 'isCustom' in s || !hiddenPresetNameKeys.includes(s.nameKey));
  }, [allServices, hiddenPresetNameKeys]);
  
  const automaticallySortedServices = useMemo(() => {
    return [...visibleServices].sort((a, b) => {
      const failureA = failureCounts[a.url] || 0;
      const failureB = failureCounts[b.url] || 0;
      if (failureA !== failureB) return failureA - failureB;
      
      const selectionA = selectionCounts[a.url] || 0;
      const selectionB = selectionCounts[b.url] || 0;
      return selectionB - selectionA;
    });
  }, [visibleServices, selectionCounts, failureCounts]);

  const displayedServices = useMemo(() => {
    const services = isManuallySorted
      ? displayedServiceUrls.map(url => allServicesMap[url]).filter(s => s && ('isCustom' in s || !hiddenPresetNameKeys.includes(s.nameKey)))
      : automaticallySortedServices;
    
    const displayedUrlsSet = new Set(services.map(s => s.url));
    const missingServices = visibleServices.filter(s => !displayedUrlsSet.has(s.url));
    
    return [...services, ...missingServices];

  }, [isManuallySorted, displayedServiceUrls, automaticallySortedServices, allServicesMap, hiddenPresetNameKeys, visibleServices]);
  
  const filteredServices = useMemo(() => {
    return displayedServices.filter(service => {
      const { type, status, maxRanking, lock, protocol } = filters;

      if (type !== 'all' && service.type !== type) return false;
      
      const isDisabled = disabledServices.includes(service.url);
      if (status === 'selectable' && isDisabled) return false;
      if (status === 'disabled' && !isDisabled) return false;
      
      const isLocked = lockedServices.includes(service.url);
      if (lock === 'locked' && !isLocked) return false;
      if (lock === 'unlocked' && isLocked) return false;

      if (protocol !== 'all' && service.protocol !== protocol) return false;

      if (maxRanking && (failureCounts[service.url] || 0) > parseInt(maxRanking, 10)) {
        return false;
      }
      return true;
    });
  }, [displayedServices, filters, disabledServices, failureCounts, lockedServices]);

  const handleFilterChange = (newFilters: Partial<Filters>) => setFilters(prev => ({ ...prev, ...newFilters }));
  const handleClearFilters = () => setFilters({ type: 'all', status: 'all', lock: 'all', protocol: 'all', maxRanking: String(maxRankingValue) });

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    const trimmedUrl = serviceUrl.trim();
    let fullUrl = trimmedUrl;
    if (fullUrl.endsWith('/')) {
      fullUrl = fullUrl.slice(0, -1);
    }
    fullUrl = `${fullUrl}/${query.trim().startsWith('/') ? query.trim().substring(1) : query.trim()}`;

    try {
      if (!trimmedUrl.startsWith('http')) {
        throw new Error(t('error.invalidUrl'));
      }

      const response = await fetch(fullUrl, {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        let summary = t('error.http', { status: String(response.status) });
        let details = `${response.status} ${response.statusText}`;
        try {
            const errorData = await response.json();
            const potentialMessage = errorData?.error?.message;
            if (typeof potentialMessage === 'string' && potentialMessage.trim()) {
                summary = potentialMessage;
            } else if (typeof potentialMessage === 'object' && potentialMessage !== null && 'value' in potentialMessage && typeof (potentialMessage as any).value === 'string') {
                summary = (potentialMessage as any).value;
            }
            details = JSON.stringify(errorData, null, 2);
        } catch (e) { details = await response.text(); }
        throw { summary, details };
      }
      
      const result = await response.json();
      setData(result.value || result);

    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'summary' in err && 'details' in err) {
          setError(err as AppError);
      } else if (err instanceof Error) {
        setError({
            summary: err.message === t('error.invalidUrl') ? err.message : t('error.network'),
            details: err.message,
        });
      } else {
        setError({ summary: t('error.unknown'), details: String(err) });
      }

      if (allServices.some(s => s.url === trimmedUrl)) {
        const newFailureCount = (failureCounts[trimmedUrl] || 0) + 1;
        setFailureCounts(prev => ({
          ...prev,
          [trimmedUrl]: newFailureCount
        }));
        if (newFailureCount > parseInt(filters.maxRanking, 10)) {
            setFilters(prev => ({ ...prev, maxRanking: String(newFailureCount) }));
        }
      }
    } finally {
      setLoading(false);
    }
  }, [serviceUrl, query, t, allServices, failureCounts, filters.maxRanking]);

  const applySettings = (settings: AppSettings) => {
    setLanguage(settings.language);
    setServiceUrl(settings.serviceUrl);
    setQuery(settings.query);
    setCustomServices(settings.customServices);
    setSelectionCounts(settings.selectionCounts);
    setFailureCounts(settings.failureCounts);
    setIsManuallySorted(settings.isManuallySorted);
    setDisplayedServiceUrls(settings.displayedServiceUrls);
    setDisabledServices(settings.disabledServices);
    setTranslatedDescriptions(settings.translatedDescriptions);
    setHiddenPresetNameKeys(settings.hiddenPresetNameKeys);
    setLockedServices(settings.lockedServices);
    
    const newMax = Math.max(...Object.values(settings.failureCounts).map(v => Number(v) || 0), 0);
    setFilters({ type: 'all', status: 'all', lock: 'all', protocol: 'all', maxRanking: String(newMax) });
  };

  const handleSaveSettings = () => {
    const currentSettings: AppSettings = {
      language,
      serviceUrl,
      query,
      customServices,
      selectionCounts,
      failureCounts,
      isManuallySorted,
      displayedServiceUrls: isManuallySorted ? displayedServices.map(s => s.url) : getInitialSettings().displayedServiceUrls,
      disabledServices,
      translatedDescriptions,
      hiddenPresetNameKeys,
      lockedServices,
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(currentSettings));
  };

  const handleRestoreSettings = () => {
    applySettings(getInitialSettings(SETTINGS_KEY));
  };

  const handleResetSettings = () => {
    applySettings(getInitialSettings());
  };

  const handleClearSavedSettings = () => {
    localStorage.removeItem(SETTINGS_KEY);
    handleResetSettings();
    setIsClearConfirmOpen(false);
  };
  
  const handleExportSettings = () => {
    const currentSettings: AppSettings = {
      language, serviceUrl, query, customServices, selectionCounts, failureCounts,
      isManuallySorted, displayedServiceUrls, disabledServices, translatedDescriptions,
      hiddenPresetNameKeys, lockedServices,
    };

    const services_snapshot = displayedServices.map(service => {
        const baseService = { ...service };
        const dynamicState = {
            selectionCount: selectionCounts[service.url] || 0,
            failureCount: failureCounts[service.url] || 0,
            isDisabled: disabledServices.includes(service.url),
            isLocked: lockedServices.includes(service.url)
        };
        if (!('isCustom' in baseService)) {
            (baseService as any).name = t(baseService.nameKey);
            (baseService as any).description = t(baseService.descriptionKey);
        }
        return { ...baseService, ...dynamicState };
    });

    const exportData = {
        ...currentSettings,
        services_snapshot
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'eob-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleImportSettings = () => {
    importFileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error('File content is not text');
        
        const parsedSettings = JSON.parse(text);
        if (parsedSettings && typeof parsedSettings === 'object') {
          const migratedSettings = applyMigrations(parsedSettings);
          applySettings(migratedSettings);
        } else {
          throw new Error('Invalid settings file format');
        }
      } catch (err) {
        console.error("Import failed:", err);
        setError({
          summary: t('error.importFailed'),
          details: err instanceof Error ? err.message : String(err)
        });
      } finally {
        if (importFileRef.current) {
          importFileRef.current.value = '';
        }
      }
    };
    reader.onerror = () => {
        setError({
          summary: t('error.importFailed'),
          details: 'Could not read the selected file.'
        });
    }
    reader.readAsText(file);
  };

  const handleSelectService = (url: string, query: string) => {
    if (serviceUrl !== url) {
        setSelectionCounts(prev => ({ ...prev, [url]: (prev[url] || 0) + 1 }));
    }
    setServiceUrl(url);
    setQuery(query);
  };

  const handleResetFailureCount = (url: string) => {
    const oldMax = maxRankingValue;
    const newCounts = {...failureCounts, [url]: 0 };
    setFailureCounts(newCounts);

    if (String(oldMax) === filters.maxRanking) {
        const newMax = Math.max(...Object.values(newCounts).map(v => Number(v) || 0), 0);
        setFilters(prev => ({ ...prev, maxRanking: String(newMax) }));
    }
  };

  const handleReorderServices = (reorderedServices: Service[]) => {
    setDisplayedServiceUrls(reorderedServices.map(s => s.url));
    if (!isManuallySorted) {
      setIsManuallySorted(true);
    }
  };
  
  const handleToggleSortMode = () => setIsManuallySorted(prev => !prev);
  const handleToggleServiceDisabled = (url: string) => {
    setDisabledServices(prev => prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]);
  };
  const handleToggleServiceLock = (url: string) => {
    setLockedServices(prev => prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]);
  };

  const handleAddCustomService = (serviceData: Omit<CustomService, 'id' | 'isCustom'>) => {
    const newService: CustomService = {
      ...serviceData,
      id: `custom-${Date.now()}`,
      isCustom: true,
    };
    setCustomServices(prev => [...prev, newService]);
    setFailureCounts(prev => ({...prev, [newService.url]: 0}));
    setSelectionCounts(prev => ({...prev, [newService.url]: 0}));
    setDisplayedServiceUrls(prev => [...prev, newService.url]);
    handleClearFilters();
  };
  
  const handleOpenEditModal = (service: Service) => setEditingService(service);
  const handleCloseEditModal = () => setEditingService(null);
  
  const handleUpdateService = (updatedData: Omit<CustomService, 'id' | 'isCustom'>) => {
    if (!editingService) return;

    const isPreset = !('isCustom' in editingService);
    const originalUrl = editingService.url;

    if (isPreset) {
      const presetService = editingService as PresetService;
      handleAddCustomService(updatedData);
      setHiddenPresetNameKeys(prev => [...new Set([...prev, presetService.nameKey])]);
    } else {
      setCustomServices(prev => prev.map(cs => cs.id === editingService.id ? { ...cs, ...updatedData } : cs));
    }
    
    if(originalUrl !== updatedData.url) {
      const migrateState = (prevState: Record<string, any>) => {
        const newState = {...prevState};
        if (originalUrl in newState) {
          newState[updatedData.url] = newState[originalUrl];
          delete newState[originalUrl];
        }
        return newState;
      }
      setSelectionCounts(migrateState);
      setFailureCounts(migrateState);
      setDisabledServices(prev => prev.map(url => url === originalUrl ? updatedData.url : url));
      setLockedServices(prev => prev.map(url => url === originalUrl ? updatedData.url : url));
      setDisplayedServiceUrls(prev => prev.map(url => url === originalUrl ? updatedData.url : url));

      if (serviceUrl === originalUrl) {
        setServiceUrl(updatedData.url);
      }
    }

    handleCloseEditModal();
    handleClearFilters();
  };

  const handleOpenDeleteModal = (service: Service) => setServiceToDelete(service);
  const handleCloseDeleteModal = () => setServiceToDelete(null);

  const handleDeleteService = () => {
    if (!serviceToDelete) return;

    const urlToDelete = serviceToDelete.url;

    if ('isCustom' in serviceToDelete) {
      setCustomServices(prev => prev.filter(cs => cs.id !== serviceToDelete.id));
    } else {
      setHiddenPresetNameKeys(prev => [...new Set([...prev, (serviceToDelete as PresetService).nameKey])]);
    }
    
    const cleanupState = (prevState: Record<string, any>) => {
      const newState = {...prevState};
      delete newState[urlToDelete];
      return newState;
    };
    setSelectionCounts(cleanupState);
    setFailureCounts(cleanupState);
    setDisabledServices(prev => prev.filter(url => url !== urlToDelete));
    setLockedServices(prev => prev.filter(url => url !== urlToDelete));
    setDisplayedServiceUrls(prev => prev.filter(url => url !== urlToDelete));
    
    if (serviceUrl === urlToDelete) {
      const firstService = PRESET_SERVICES[0];
      setServiceUrl(firstService.url);
      setQuery(firstService.defaultQuery);
    }
    
    handleCloseDeleteModal();
  };

  const handleCloneService = (serviceToClone: Service) => {
    try {
      const originalName = 'isCustom' in serviceToClone ? serviceToClone.name : t(serviceToClone.nameKey);
      
      const newClonedService: CustomService = {
        id: `custom-${Date.now()}`,
        name: `${t('serviceSelector.clonePrefix')}${originalName}`,
        url: '', // Intentionally cleared
        description: 'isCustom' in serviceToClone ? serviceToClone.description : t(serviceToClone.descriptionKey),
        defaultQuery: serviceToClone.defaultQuery,
        type: serviceToClone.type,
        protocol: serviceToClone.protocol,
        isCustom: true,
      };

      setCustomServices(prev => [...prev, newClonedService]);
      setDisplayedServiceUrls(prev => [...prev, newClonedService.url]);
      // Open edit modal immediately
      setEditingService(newClonedService);
    } catch (err) {
      console.error("Failed to clone service:", err);
      setError({ summary: t('error.unknown'), details: "Could not clone the service." });
    }
  };

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8">
      <input type="file" ref={importFileRef} onChange={handleFileChange} accept=".json" style={{ display: 'none' }} />
      <div className="max-w-4xl mx-auto space-y-8">
        <Header 
            t={t} 
            language={language} 
            setLanguage={setLanguage} 
            onSaveSettings={handleSaveSettings}
            onRestoreSettings={handleRestoreSettings}
            onResetSettings={handleResetSettings}
            onClearSavedSettings={() => setIsClearConfirmOpen(true)}
            onExportSettings={handleExportSettings}
            onImportSettings={handleImportSettings}
        />
        <main className="space-y-6">
          <ServiceSelector
            services={filteredServices}
            onSelect={handleSelectService}
            selectedUrl={serviceUrl}
            failureCounts={failureCounts}
            onResetFailureCount={handleResetFailureCount}
            onReorder={handleReorderServices}
            isManuallySorted={isManuallySorted}
            onToggleSortMode={handleToggleSortMode}
            disabledServices={disabledServices}
            onToggleDisabled={handleToggleServiceDisabled}
            lockedServices={lockedServices}
            onToggleLock={handleToggleServiceLock}
            t={t}
            language={language}
            translatedDescriptions={translatedDescriptions}
            onTranslateDescription={handleTranslateDescription}
            onEdit={handleOpenEditModal}
            onClone={handleCloneService}
            onDelete={handleOpenDeleteModal}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            uniqueProtocols={uniqueProtocols}
          />
          <AddServiceForm onAddService={handleAddCustomService} t={t} allServices={allServices} />
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink mx-4 text-slate-500">{t('divider')}</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>
          <ApiForm 
            serviceUrl={serviceUrl} 
            setServiceUrl={setServiceUrl}
            query={query}
            setQuery={setQuery}
            onFetch={handleFetchData}
            loading={loading}
            t={t}
          />
          <ResultsDisplay 
            loading={loading}
            data={data}
            t={t}
          />
        </main>
      </div>
      <ErrorModal 
        isOpen={!!error}
        error={error}
        onClose={() => setError(null)}
        t={t}
      />
      <EditServiceModal
        isOpen={!!editingService}
        service={editingService}
        onClose={handleCloseEditModal}
        onSave={handleUpdateService}
        t={t}
        allServices={allServices}
      />
      <DeleteConfirmationModal
        isOpen={!!serviceToDelete}
        serviceName={serviceToDelete ? ('isCustom' in serviceToDelete ? serviceToDelete.name : t(serviceToDelete.nameKey)) : ''}
        onConfirm={handleDeleteService}
        onCancel={handleCloseDeleteModal}
        t={t}
      />
      <ClearSettingsConfirmationModal
        isOpen={isClearConfirmOpen}
        onConfirm={handleClearSavedSettings}
        onCancel={() => setIsClearConfirmOpen(false)}
        t={t}
      />
    </div>
  );
}

export default App;
