
import React, { useState } from 'react';
import type { CustomService, Service } from '../types';

interface AddServiceFormProps {
  onAddService: (service: Omit<CustomService, 'id' | 'isCustom'>) => void;
  t: (key: string) => string;
  allServices: Service[];
}

export const AddServiceForm: React.FC<AddServiceFormProps> = ({ onAddService, t, allServices }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [defaultQuery, setDefaultQuery] = useState('');
  const [type, setType] = useState<'free' | 'paid'>('free');
  const [protocol, setProtocol] = useState<'OData' | 'REST'>('OData');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setName('');
    setUrl('');
    setDescription('');
    setDefaultQuery('');
    setType('free');
    setProtocol('OData');
    setFormError('');
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim() || !url.trim()) {
      setFormError('Service Name and URL are required.'); // This won't be visible due to `required` but is good practice.
      return;
    }
    if (!url.trim().startsWith('http')) {
        setFormError('URL must start with http or https.');
        return;
    }
    const urlExists = allServices.some(s => s.url.trim() === url.trim());
    if (urlExists) {
        setFormError(t('addServiceForm.urlExistsError'));
        return;
    }
    onAddService({ name, url, description, defaultQuery, type, protocol });
    resetForm();
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 shadow-md">
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className="flex justify-between items-center p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 rounded-lg"
      >
        <h2 className="text-lg font-semibold text-slate-200">{t('addServiceForm.title')}</h2>
        <svg className={`h-6 w-6 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="serviceName" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.nameLabel')}</label>
              <input id="serviceName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('addServiceForm.namePlaceholder')} required className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
            </div>
            <div>
              <label htmlFor="serviceUrl" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.urlLabel')}</label>
              <input id="serviceUrl" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t('addServiceForm.urlPlaceholder')} required className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.descriptionLabel')}</label>
            <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('addServiceForm.descriptionPlaceholder')} className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
          </div>
          <div>
            <label htmlFor="defaultQuery" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.queryLabel')}</label>
            <input id="defaultQuery" type="text" value={defaultQuery} onChange={(e) => setDefaultQuery(e.target.value)} placeholder={t('addServiceForm.queryPlaceholder')} className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-2">{t('addServiceForm.typeLabel')}</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="serviceType" value="free" checked={type === 'free'} onChange={() => setType('free')} className="form-radio bg-slate-700 border-slate-500 text-sky-500 focus:ring-sky-500" /><span>{t('addServiceForm.free')}</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="serviceType" value="paid" checked={type === 'paid'} onChange={() => setType('paid')} className="form-radio bg-slate-700 border-slate-500 text-sky-500 focus:ring-sky-500" /><span>{t('addServiceForm.paid')}</span></label>
              </div>
            </div>
             <div>
              <label htmlFor="serviceProtocol" className="block text-sm font-medium text-sky-300 mb-2">{t('addServiceForm.protocolLabel')}</label>
              <select id="serviceProtocol" value={protocol} onChange={(e) => setProtocol(e.target.value as 'OData' | 'REST')} className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition">
                <option value="OData">{t('addServiceForm.protocolOData')}</option>
                <option value="REST">{t('addServiceForm.protocolREST')}</option>
              </select>
            </div>
          </div>
          {formError && <p className="text-sm text-red-400">{formError}</p>}
          <div className="text-right">
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors">{t('addServiceForm.addButton')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
