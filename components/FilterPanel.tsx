
import React from 'react';
import type { Filters } from '../types';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onClearFilters: () => void;
  t: (key: string) => string;
  uniqueProtocols: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onClearFilters, t, uniqueProtocols }) => {
  return (
    <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
      <h3 className="text-md font-semibold text-slate-300 mb-3">{t('filterPanel.title')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* Type Filter */}
        <div>
          <label htmlFor="filter-type" className="block text-sm font-medium text-sky-300 mb-1">{t('filterPanel.typeLabel')}</label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value as Filters['type'] })}
            className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 transition text-sm"
          >
            <option value="all">{t('filterPanel.typeOptions.all')}</option>
            <option value="free">{t('filterPanel.typeOptions.free')}</option>
            <option value="paid">{t('filterPanel.typeOptions.paid')}</option>
          </select>
        </div>
        
        {/* Status Filter */}
        <div>
          <label htmlFor="filter-status" className="block text-sm font-medium text-sky-300 mb-1">{t('filterPanel.statusLabel')}</label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as Filters['status'] })}
            className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 transition text-sm"
          >
            <option value="all">{t('filterPanel.statusOptions.all')}</option>
            <option value="selectable">{t('filterPanel.statusOptions.selectable')}</option>
            <option value="disabled">{t('filterPanel.statusOptions.disabled')}</option>
          </select>
        </div>
        
        {/* Lock Filter */}
        <div>
          <label htmlFor="filter-lock" className="block text-sm font-medium text-sky-300 mb-1">{t('filterPanel.lockLabel')}</label>
          <select
            id="filter-lock"
            value={filters.lock}
            onChange={(e) => onFilterChange({ lock: e.target.value as Filters['lock'] })}
            className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 transition text-sm"
          >
            <option value="all">{t('filterPanel.lockOptions.all')}</option>
            <option value="locked">{t('filterPanel.lockOptions.locked')}</option>
            <option value="unlocked">{t('filterPanel.lockOptions.unlocked')}</option>
          </select>
        </div>
        
        {/* Protocol Filter */}
        <div>
          <label htmlFor="filter-protocol" className="block text-sm font-medium text-sky-300 mb-1">{t('filterPanel.protocolLabel')}</label>
          <select
            id="filter-protocol"
            value={filters.protocol}
            onChange={(e) => onFilterChange({ protocol: e.target.value })}
            className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 transition text-sm"
          >
            {uniqueProtocols.map(p => (
              <option key={p} value={p}>
                {p === 'all' ? t('filterPanel.protocolOptions.all') : p}
              </option>
            ))}
          </select>
        </div>

        {/* Max Ranking Filter */}
        <div>
          <label htmlFor="filter-ranking" className="block text-sm font-medium text-sky-300 mb-1">{t('filterPanel.rankingLabel')}</label>
          <input
            type="number"
            id="filter-ranking"
            min="0"
            value={filters.maxRanking}
            onChange={(e) => onFilterChange({ maxRanking: e.target.value })}
            placeholder={t('filterPanel.rankingPlaceholder')}
            className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 transition text-sm"
          />
        </div>

        {/* Clear Button */}
        <div>
          <button
            onClick={onClearFilters}
            className="w-full px-3 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
          >
            {t('filterPanel.clearButton')}
          </button>
        </div>
      </div>
    </div>
  );
};