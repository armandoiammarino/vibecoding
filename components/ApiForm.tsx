
import React from 'react';

interface ApiFormProps {
  serviceUrl: string;
  setServiceUrl: (url: string) => void;
  query: string;
  setQuery: (query: string) => void;
  onFetch: () => void;
  loading: boolean;
  t: (key: string) => string;
}

export const ApiForm: React.FC<ApiFormProps> = ({ serviceUrl, setServiceUrl, query, setQuery, onFetch, loading, t }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFetch();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <label htmlFor="serviceUrl" className="block text-sm font-medium text-sky-300 mb-2">
            {t('apiForm.urlLabel')}
          </label>
          <input
            type="text"
            id="serviceUrl"
            value={serviceUrl}
            onChange={(e) => setServiceUrl(e.target.value)}
            placeholder="https://s5phub.copernicus.eu/dhus/odata/v1/"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          />
        </div>
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-sky-300 mb-2">
            {t('apiForm.queryLabel')}
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Products?$top=5"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          />
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Spinner />
              {t('apiForm.fetching')}
            </>
          ) : (
            t('apiForm.fetch')
          )}
        </button>
      </div>
    </form>
  );
};

const Spinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);