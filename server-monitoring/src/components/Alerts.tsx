import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { ExclamationTriangleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const Alerts = () => {
  const { isDarkMode } = useStore();
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: api.getAlerts,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (isLoading) {
    return (
      <div className={`text-center p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Loading alerts...
      </div>
    );
  }

  const AlertCard = ({ type, count, icon: Icon }: { type: string; count: number; icon: any }) => (
    <div className={`p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`h-8 w-8 ${
            type === 'Critical' ? 'text-red-500' :
            type === 'Medium' ? 'text-yellow-500' : 'text-green-500'
          }`} />
          <div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {type}
            </h3>
            <p className={`text-3xl font-bold ${
              type === 'Critical' ? 'text-red-600 dark:text-red-400' :
              type === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
            }`}>
              {count}
            </p>
          </div>
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Active Alerts
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <AlertCard
        type="Critical"
        count={alerts?.critical || 0}
        icon={ExclamationTriangleIcon}
      />
      <AlertCard
        type="Medium"
        count={alerts?.medium || 0}
        icon={ExclamationCircleIcon}
      />
      <AlertCard
        type="Low"
        count={alerts?.low || 0}
        icon={InformationCircleIcon}
      />
    </div>
  );
}; 