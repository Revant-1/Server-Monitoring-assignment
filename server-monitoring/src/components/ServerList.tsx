import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { ServerCard } from './ServerCard';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const ServerList = () => {
  const { isDarkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [serverListLayout, setServerListLayout] = useState<'grid' | 'list'>('grid');
  const { data: servers, isLoading, error } = useQuery({
    queryKey: ['servers'],
    queryFn: api.getServers,
  });

  const filteredServers = servers?.filter(server => 
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    server.ip_address.includes(searchTerm)
  );

  const handleLayoutChange = (layout: 'grid' | 'list') => {
    setServerListLayout(layout);
  };

  if (isLoading) return <div className="text-center py-8">Loading servers...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading servers</div>;

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className={`relative rounded-md shadow-sm flex-grow max-w-md`}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            className={`block w-full rounded-md border-0 py-2 pl-10 pr-4 text-sm 
              ${isDarkMode 
                ? 'bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500' 
                : 'bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-600'
              } 
              focus:ring-2 outline-none transition-all duration-200`}
            placeholder="Search servers by name or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => handleLayoutChange('grid')}
            className={`p-2 rounded ${
              serverListLayout === 'grid'
                ? isDarkMode 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-blue-50 text-blue-600'
                : isDarkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => handleLayoutChange('list')}
            className={`p-2 rounded ${
              serverListLayout === 'list'
                ? isDarkMode 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-blue-50 text-blue-600'
                : isDarkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {filteredServers?.length === 0 ? (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No servers found matching "{searchTerm}"
        </div>
      ) : (
        serverListLayout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredServers?.map((server) => (
              <ServerCard key={server.id} server={server} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {filteredServers?.map((server) => (
              <ServerCard key={server.id} server={server} layout="list" />
            ))}
          </div>
        )
      )}
    </div>
  );
}; 