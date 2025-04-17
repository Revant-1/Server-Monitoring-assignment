import { Server } from '../services/api';
import { useStore } from '../store/useStore';
import { ComputerDesktopIcon, SignalIcon } from '@heroicons/react/24/outline';

interface ServerCardProps {
  server: Server;
  layout: 'grid' | 'list';
}

export const ServerCard = ({ server, layout }: ServerCardProps) => {
  const { selectedServer, setSelectedServer, isDarkMode } = useStore();
  const isSelected = selectedServer?.id === server.id;

  if (layout === 'list') {
    return (
      <div
        className={`p-3 sm:p-4 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-[1.01]
          ${isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-white hover:bg-gray-50'
          }
          ${isSelected
            ? 'ring-2 ring-blue-500 shadow-lg'
            : 'hover:shadow-xl'
          }`}
        onClick={() => setSelectedServer(server)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ComputerDesktopIcon className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {server.name}
              </h3>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                IP: {server.ip_address}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SignalIcon className={`h-5 w-5 ${
              server.status === 'active'
                ? 'text-green-500'
                : 'text-red-500'
            }`} />
            <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
              server.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {server.status}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-3 sm:p-4 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105
        ${isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'
        }
        ${isSelected
          ? 'ring-2 ring-blue-500 shadow-lg scale-105'
          : 'hover:shadow-xl'
        }`}
      onClick={() => setSelectedServer(server)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <ComputerDesktopIcon className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {server.name}
            </h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              IP: {server.ip_address}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <SignalIcon className={`h-5 w-5 ${
            server.status === 'active'
              ? 'text-green-500'
              : 'text-red-500'
          }`} />
          <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
            server.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {server.status}
          </span>
        </div>
      </div>
    </div>
  );
}; 