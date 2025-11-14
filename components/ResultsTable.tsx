
import React from 'react';
import type { ODataRecord } from '../types';

interface ResultsTableProps {
  data: ODataRecord[];
  t: (key: string) => string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ data, t }) => {
  if (!data || data.length === 0) {
    return <p className="text-slate-400">{t('results.noData')}</p>;
  }

  const headers = Object.keys(data[0]);

  const renderCell = (value: any) => {
    if (value === null || value === undefined) {
      return <span className="text-slate-500">null</span>;
    }
    if (typeof value === 'object') {
      return (
        <pre className="text-xs bg-slate-900 p-2 rounded overflow-x-auto">
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      );
    }
    return String(value);
  };

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-slate-800/50 divide-y divide-slate-700">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-700/50 transition-colors">
                {headers.map((header) => (
                  <td key={`${rowIndex}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 align-top">
                    {renderCell(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};