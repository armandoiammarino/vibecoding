
import React from 'react';
import { supportedLanguages } from '../i18n';

interface LanguageSwitcherProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage, t }) => {
  const selectedLanguage = supportedLanguages[language as keyof typeof supportedLanguages];

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <label htmlFor="language-select" className="text-sm text-slate-400">{t('languageSwitcher.label')}:</label>
      <div className="flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-md py-1 px-2 focus-within:ring-2 focus-within:ring-sky-500">
         <img
            src={`https://flagcdn.com/w20/${selectedLanguage.flag}.png`}
            alt={`${selectedLanguage.name} flag`}
            className="h-4 rounded-sm"
          />
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent text-slate-200 text-sm focus:outline-none"
        >
          {Object.entries(supportedLanguages).map(([code, { name }]) => (
            <option key={code} value={code} className="bg-slate-700">
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};