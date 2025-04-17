import { useStore } from '../store/useStore';
import { SunIcon, MoonIcon, ServerIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ServerIcon className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
            Server Monitor
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300
            ${isDarkMode ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-600 hover:text-gray-800'}`}
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </header>
  );
}; 