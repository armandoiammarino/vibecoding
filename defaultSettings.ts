import type { AppSettings, PresetService, CustomService } from './types';
import { supportedLanguages } from './i18n';

export const PRESET_SERVICES: PresetService[] = [
  {
    nameKey: 'presets.s5p.name',
    url: 'https://s5phub.copernicus.eu/dhus/odata/v1/',
    defaultQuery: 'Products?$top=5',
    descriptionKey: 'presets.s5p.description',
    type: 'free',
    protocol: 'OData'
  },
  {
    nameKey: 'presets.s3.name',
    url: 'https://cophub.copernicus.eu/odata/v1/',
    defaultQuery: 'Products?$top=5',
    descriptionKey: 'presets.s3.description',
    type: 'free',
    protocol: 'OData'
  },
  {
    nameKey: 'presets.tripPin.name',
    url: 'https://services.odata.org/V4/TripPinServiceRW/',
    defaultQuery: 'People?$top=5',
    descriptionKey: 'presets.tripPin.description',
    type: 'free',
    protocol: 'OData'
  },
  {
    nameKey: 'presets.northwind.name',
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/',
    defaultQuery: 'Customers?$top=5',
    descriptionKey: 'presets.northwind.description',
    type: 'free',
    protocol: 'OData'
  }
];

const defaultCustomServices: CustomService[] = [
    {
        id: 'custom-default-1',
        name: 'Default Custom Service',
        url: 'https://services.odata.org/V4/(S(3o2w45p1azute55cf3aflsnm))/OData/OData.svc/',
        defaultQuery: 'Products?$top=3',
        description: 'A default custom service example.',
        type: 'paid',
        isCustom: true,
        protocol: 'OData'
    }
];

const getDefaultSettings = (): AppSettings => {
    const allServices = [...PRESET_SERVICES, ...defaultCustomServices];
    const initialCounts = allServices.reduce((acc, service) => {
        acc[service.url] = 0;
        return acc;
    }, {} as Record<string, number>);

    return {
        language: 'en',
        serviceUrl: PRESET_SERVICES[0].url,
        query: PRESET_SERVICES[0].defaultQuery,
        customServices: defaultCustomServices,
        selectionCounts: {
            ...initialCounts,
            [PRESET_SERVICES[1].url]: 2,
            [defaultCustomServices[0].url]: 3,
        },
        failureCounts: {
            ...initialCounts,
            [PRESET_SERVICES[2].url]: 1,
        },
        isManuallySorted: false,
        displayedServiceUrls: allServices.map(s => s.url),
        disabledServices: [PRESET_SERVICES[3].url],
        translatedDescriptions: {},
        hiddenPresetNameKeys: [],
        lockedServices: [],
    };
};

// Fix: Export the 'applyMigrations' function so it can be imported and used in other modules.
export const applyMigrations = (loadedSettings: Partial<AppSettings>): AppSettings => {
    const settings = getDefaultSettings();

    if (loadedSettings && typeof loadedSettings === 'object') {
        // Validate and merge simple properties
        if (typeof loadedSettings.language === 'string' && loadedSettings.language in supportedLanguages) settings.language = loadedSettings.language;
        if (typeof loadedSettings.serviceUrl === 'string') settings.serviceUrl = loadedSettings.serviceUrl;
        if (typeof loadedSettings.query === 'string') settings.query = loadedSettings.query;
        if (typeof loadedSettings.isManuallySorted === 'boolean') settings.isManuallySorted = loadedSettings.isManuallySorted;

        // Validate and merge array properties
        if (Array.isArray(loadedSettings.displayedServiceUrls)) settings.displayedServiceUrls = loadedSettings.displayedServiceUrls.filter(item => typeof item === 'string');
        if (Array.isArray(loadedSettings.disabledServices)) settings.disabledServices = loadedSettings.disabledServices.filter(item => typeof item === 'string');
        if (Array.isArray(loadedSettings.lockedServices)) settings.lockedServices = loadedSettings.lockedServices.filter(item => typeof item === 'string');
        if (Array.isArray(loadedSettings.hiddenPresetNameKeys)) settings.hiddenPresetNameKeys = loadedSettings.hiddenPresetNameKeys.filter(item => typeof item === 'string');

        // Validate and merge record properties
        const validateRecordNumber = (record: any): Record<string, number> => {
            const validRecord: Record<string, number> = {};
            if (typeof record === 'object' && record !== null) {
                Object.keys(record).forEach(key => {
                    if (typeof record[key] === 'number') {
                        validRecord[key] = record[key];
                    }
                });
            }
            return validRecord;
        };
        settings.selectionCounts = validateRecordNumber(loadedSettings.selectionCounts);
        settings.failureCounts = validateRecordNumber(loadedSettings.failureCounts);

        // Validate and merge custom services
        if (Array.isArray(loadedSettings.customServices)) {
            settings.customServices = loadedSettings.customServices.map(cs => {
                if (typeof cs !== 'object' || cs === null) return null;
                return {
                    id: typeof cs.id === 'string' ? cs.id : `custom-${Date.now()}`,
                    name: typeof cs.name === 'string' ? cs.name : 'Untitled Service',
                    url: typeof cs.url === 'string' ? cs.url : '',
                    description: typeof cs.description === 'string' ? cs.description : '',
                    defaultQuery: typeof cs.defaultQuery === 'string' ? cs.defaultQuery : '',
                    type: (cs.type === 'free' || cs.type === 'paid') ? cs.type : 'free',
                    protocol: (cs.protocol === 'OData' || cs.protocol === 'REST') ? cs.protocol : 'OData',
                    isCustom: true,
                };
            }).filter((cs): cs is CustomService => cs !== null && cs.url !== '');
        }
        
        // Validate and merge translated descriptions
        const cleanedTranslations: Record<string, Record<string, string>> = {};
        if (typeof loadedSettings.translatedDescriptions === 'object' && loadedSettings.translatedDescriptions !== null) {
            for (const url in loadedSettings.translatedDescriptions) {
                const urlTranslations = (loadedSettings.translatedDescriptions as any)[url];
                if (typeof urlTranslations === 'object' && urlTranslations !== null) {
                    cleanedTranslations[url] = {};
                    for (const lang in urlTranslations) {
                        if (typeof urlTranslations[lang] === 'string') {
                            cleanedTranslations[url][lang] = urlTranslations[lang];
                        }
                    }
                }
            }
        }
        settings.translatedDescriptions = cleanedTranslations;
    }
    
    // Final consistency pass: ensure all services have counters
    const allServices = [...PRESET_SERVICES, ...settings.customServices];
    allServices.forEach(s => {
        if (s.url && typeof settings.selectionCounts[s.url] !== 'number') settings.selectionCounts[s.url] = 0;
        if (s.url && typeof settings.failureCounts[s.url] !== 'number') settings.failureCounts[s.url] = 0;
    });

    return settings;
};


export const getInitialSettings = (storageKey?: string): AppSettings => {
    if (storageKey) {
        try {
            const savedSettings = localStorage.getItem(storageKey);
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                if (parsed && typeof parsed === 'object') {
                    return applyMigrations(parsed);
                }
            }
        } catch (e) {
            console.error("Could not parse saved settings, falling back to default.", e);
        }
    }
    return applyMigrations({}); // Run migrations on default settings to ensure consistency
};