
import React from 'react';

interface SettingsControlsProps {
  onSave: () => void;
  onRestore: () => void;
  onReset: () => void;
  onClearSaved: () => void;
  onExport: () => void;
  onImport: () => void;
  t: (key: string) => string;
}

export const SettingsControls: React.FC<SettingsControlsProps> = ({ onSave, onRestore, onReset, onClearSaved, onExport, onImport, t }) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={onExport}
        className="px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {t('settings.export')}
      </button>
       <button
        onClick={onImport}
        className="px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {t('settings.import')}
      </button>
      <button
        onClick={onSave}
        className="px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {t('settings.save')}
      </button>
      <button
        onClick={onRestore}
        className="px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {t('settings.restore')}
      </button>
      <button
        onClick={onReset}
        className="px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {t('settings.reset')}
      </button>
      <button
        onClick={onClearSaved}
        className="px-3 py-1.5 border border-red-600/50 bg-red-900/20 text-sm font-medium rounded-md text-red-400 hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500"
      >
        {t('settings.clearSaved')}
      </button>
    </div>
  );
};
