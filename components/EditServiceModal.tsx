
import React, { useState, useEffect } from 'react';
import type { Service, CustomService } from '../types';

interface EditServiceModalProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (updatedData: Omit<CustomService, 'id' | 'isCustom'>) => void;
  t: (key: string) => string;
  allServices: Service[];
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({ isOpen, service, onClose, onSave, t, allServices }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [defaultQuery, setDefaultQuery] = useState('');
  const [type, setType] = useState<'free' | 'paid'>('free');
  const [protocol, setProtocol] = useState<'OData' | 'REST'>('OData');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (service) {
      const serviceName = 'isCustom' in service ? service.name : t(service.nameKey);
      const serviceDesc = 'isCustom' in service ? service.description : t(service.descriptionKey);
      setName(serviceName);
      setUrl(service.url);
      setDescription(serviceDesc);
      setDefaultQuery(service.defaultQuery);
      setType(service.type);
      setProtocol(service.protocol || 'OData');
      setFormError('');
    }
  }, [service, t]);

  if (!isOpen || !service) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !url.trim()) {
      setFormError('Service Name and URL are required.');
      return;
    }
    if (!url.trim().startsWith('http')) {
        setFormError('URL must start with http or https.');
        return;
    }
    
    const editingServiceId = 'isCustom' in service ? service.id : service.nameKey;
    const urlExists = allServices.some(s => {
      const currentServiceId = 'isCustom' in s ? s.id : s.nameKey;
      if (editingServiceId === currentServiceId) {
        return false;
      }
      return s.url.trim() === url.trim();
    });

    if (urlExists) {
        setFormError(t('addServiceForm.urlExistsError'));
        return;
    }

    onSave({ name, url, description, defaultQuery, type, protocol });
  };
  
  const getServiceName = (s: Service) => 'isCustom' in s ? s.name : t(s.nameKey);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      role="dialog" aria-modal="true" aria-labelledby="edit-service-modal-title"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-full max-w-lg mx-4 text-slate-200 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700">
            <h3 className="text-xl leading-6 font-medium text-slate-100" id="edit-service-modal-title">
              {t('editServiceModal.title')}
            </h3>
             <p className="text-sm text-slate-400 mt-1">{getServiceName(service)}</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="edit-serviceName" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.nameLabel')}</label>
                        <input id="edit-serviceName" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
                    </div>
                    <div>
                        <label htmlFor="edit-serviceUrl" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.urlLabel')}</label>
                        <input id="edit-serviceUrl" type="url" value={url} onChange={(e) => setUrl(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
                    </div>
                </div>
                <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.descriptionLabel')}</label>
                    <input id="edit-description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
                </div>
                <div>
                    <label htmlFor="edit-defaultQuery" className="block text-sm font-medium text-sky-300 mb-1">{t('addServiceForm.queryLabel')}</label>
                    <input id="edit-defaultQuery" type="text" value={defaultQuery} onChange={(e) => setDefaultQuery(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-sky-300 mb-2">{t('addServiceForm.typeLabel')}</label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="edit-serviceType" value="free" checked={type === 'free'} onChange={() => setType('free')} className="form-radio bg-slate-700 border-slate-500 text-sky-500 focus:ring-sky-500" /><span>{t('addServiceForm.free')}</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="edit-serviceType" value="paid" checked={type === 'paid'} onChange={() => setType('paid')} className="form-radio bg-slate-700 border-slate-500 text-sky-500 focus:ring-sky-500" /><span>{t('addServiceForm.paid')}</span></label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="edit-serviceProtocol" className="block text-sm font-medium text-sky-300 mb-2">{t('addServiceForm.protocolLabel')}</label>
                        <select id="edit-serviceProtocol" value={protocol} onChange={(e) => setProtocol(e.target.value as 'OData' | 'REST')} className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition">
                            <option value="OData">{t('addServiceForm.protocolOData')}</option>
                            <option value="REST">{t('addServiceForm.protocolREST')}</option>
                        </select>
                    </div>
                </div>
                {formError && <p className="text-sm text-red-400">{formError}</p>}
            </div>
            <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors">{t('editServiceModal.cancel')}</button>
                <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors">{t('editServiceModal.save')}</button>
            </div>
        </form>
      </div>
    </div>
  );
};
