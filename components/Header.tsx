
import React from 'react';
import { Clock } from './Clock';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SettingsControls } from './SettingsControls';

interface HeaderProps {
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
  onSaveSettings: () => void;
  onRestoreSettings: () => void;
  onResetSettings: () => void;
  onClearSavedSettings: () => void;
  onExportSettings: () => void;
  onImportSettings: () => void;
}


export const Header: React.FC<HeaderProps> = ({ t, language, setLanguage, onSaveSettings, onRestoreSettings, onResetSettings, onClearSavedSettings, onExportSettings, onImportSettings }) => (
  <header className="text-center">
    <div className="flex items-center justify-center gap-4">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 00-9-9m9 9a9 9 0 009-9M3 12a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9h18" />
      </svg>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
        {t('header.title')}
      </h1>
    </div>
    <p className="mt-2 text-lg text-slate-400">
      {t('header.subtitle')}
    </p>
    <Clock language={language} />
    <LanguageSwitcher t={t} language={language} setLanguage={setLanguage} />
    <SettingsControls
      t={t}
      onSave={onSaveSettings}
      onRestore={onRestoreSettings}
      onReset={onResetSettings}
      onClearSaved={onClearSavedSettings}
      onExport={onExportSettings}
      onImport={onImportSettings}
    />
  </header>
);
