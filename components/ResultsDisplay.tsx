
import React from 'react';
import type { ODataResult } from '../types';
import { ResultsTable } from './ResultsTable';
import { JsonViewer } from './JsonViewer';

interface ResultsDisplayProps {
  loading: boolean;
  data: ODataResult | null;
  t: (key: string) => string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ loading, data, t }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-16 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-slate-300">{t('results.loading')}</p>
        </div>
      </div>
    );
  }

  if (data) {
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
      return <ResultsTable t={t} data={data} />;
    }
    if (typeof data === 'object' && data !== null) {
        return <JsonViewer t={t} data={data} />;
    }
  }

  return (
    <div className="text-center p-16 bg-slate-800/50 rounded-lg border border-dashed border-slate-600">
      <p className="text-slate-400">{t('results.placeholder')}</p>
    </div>
  );
};