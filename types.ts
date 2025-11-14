export type ODataRecord = Record<string, any>;
export type ODataResult = ODataRecord | ODataRecord[];

export interface PresetService {
  nameKey: string;
  url: string;
  defaultQuery: string;
  descriptionKey: string;
  type: 'free' | 'paid';
  protocol: 'OData' | 'REST';
}

export interface CustomService {
  id: string;
  name: string;
  url: string;
  defaultQuery: string;
  description: string;
  type: 'free' | 'paid';
  isCustom: true;
  protocol: 'OData' | 'REST';
}

export type Service = PresetService | CustomService;

export interface AppError {
  summary: string;
  details: string;
}

export interface Filters {
  type: 'all' | 'free' | 'paid';
  status: 'all' | 'selectable' | 'disabled';
  lock: 'all' | 'locked' | 'unlocked';
  maxRanking: string;
  protocol: string;
}

export interface AppSettings {
  language: string;
  serviceUrl: string;
  query: string;
  selectionCounts: Record<string, number>;
  failureCounts: Record<string, number>;
  isManuallySorted: boolean;
  displayedServiceUrls: string[];
  disabledServices: string[];
  customServices: CustomService[];
  translatedDescriptions: Record<string, Record<string, string>>;
  hiddenPresetNameKeys: string[];
  lockedServices: string[];
}