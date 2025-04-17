import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  HomeIcon,
  ChartBarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export const Navigation = () => {
  const { isDarkMode } = useStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
    { name: 'Export', path: '/export', icon: ArrowDownTrayIcon }
  ];
  
  return (
    <nav className={`hidden md:block ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } rounded-xl shadow-lg p-4 sticky top-6`}>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive(item.path)
                ? isDarkMode 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-blue-50 text-blue-600'
                : isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-5 w-5 mr-3 ${
              isActive(item.path)
                ? 'text-blue-500'
                : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export const MobileNavigation = () => {
  const { isDarkMode } = useStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
    { name: 'Export', path: '/export', icon: ArrowDownTrayIcon }
  ];
  
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-10 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } shadow-lg`}>
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center py-3 flex-1 ${
              isActive(item.path)
                ? isDarkMode 
                  ? 'text-blue-400' 
                  : 'text-blue-600'
                : isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
            }`}
          >
            <item.icon className={`h-6 w-6 ${
              isActive(item.path)
                ? 'text-blue-500'
                : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}; 