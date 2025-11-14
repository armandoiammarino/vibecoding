
import React from 'react';
import type { ODataRecord } from '../types';

interface JsonViewerProps {
  data: ODataRecord;
  t: (key: string) => string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data, t }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
        <div className="px-4 py-2 bg-slate-800 text-sm text-slate-400">
            {t('results.jsonResponse')}
        </div>
        <pre className="p-4 text-sm text-slate-200 overflow-x-auto">
            <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
    </div>
  );
};