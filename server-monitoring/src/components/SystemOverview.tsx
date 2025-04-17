import { useQuery } from '@tanstack/react-query';
import { api, Server } from '../services/api';
import { useStore } from '../store/useStore';
import { ArrowDownIcon, ArrowUpIcon, ServerStackIcon, BoltIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export const SystemOverview = () => {
  const { isDarkMode } = useStore();
  const [uptime, setUptime] = useState(0);
  
  // Get all servers
  const { data: servers } = useQuery({
    queryKey: ['servers'],
    queryFn: api.getServers,
  });
  
  // Get alerts
  const { data: alerts } = useQuery({
    queryKey: ['alerts'],
    queryFn: api.getAlerts,
  });

  // Calculate system health score based on servers and alerts
  const calculateHealthScore = (): number => {
    if (!servers || !alerts) return 0;

    // Calculate base score (100%)
    let baseScore = 100;
    
    // Deduct points for each critical alert (10 points each)
    baseScore -= alerts.critical * 10;
    
    // Deduct points for each medium alert (5 points each)
    baseScore -= alerts.medium * 5;
    
    // Deduct points for each low alert (2 points each)
    baseScore -= alerts.low * 2;
    
    // Count inactive servers
    const inactiveServers = servers.filter(server => server.status !== 'active').length;
    
    // Deduct 15 points for each inactive server
    baseScore -= inactiveServers * 15;
    
    // Ensure score doesn't go below 0
    return Math.max(0, baseScore);
  };
  
  // Get active servers count
  const getActiveServersCount = (): number => {
    if (!servers) return 0;
    return servers.filter(server => server.status === 'active').length;
  };
  
  // Simulate uptime increasing
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format uptime to readable format
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };
  
  const healthScore = calculateHealthScore();
  const activeServers = getActiveServersCount();
  const totalServers = servers?.length || 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Health Score */}
      <div className={`p-6 rounded-xl shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            System Health
          </h3>
          <BoltIcon className={`h-6 w-6 ${
            healthScore > 80 ? 'text-green-500' :
            healthScore > 60 ? 'text-yellow-500' : 'text-red-500'
          }`} />
        </div>
        <div className="mt-2">
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-xl font-bold ${
                  healthScore > 80 ? 'text-green-500' :
                  healthScore > 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {healthScore}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mt-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <div
                style={{ width: `${healthScore}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  healthScore > 80 ? 'bg-green-500' :
                  healthScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Server Status */}
      <div className={`p-6 rounded-xl shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Server Status
          </h3>
          <ServerStackIcon className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeServers}/{totalServers}
            </span>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Servers Online
            </p>
          </div>
          <div className={`text-sm font-semibold rounded-full px-3 py-1 ${
            activeServers === totalServers
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
          }`}>
            {activeServers === totalServers ? 'All Online' : 'Partial'}
          </div>
        </div>
      </div>
      
      {/* Alert Summary */}
      <div className={`p-6 rounded-xl shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Alert Summary
          </h3>
          <div className={`flex items-center space-x-1 ${
            (alerts?.critical || 0) > 0
              ? 'text-red-500'
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {(alerts?.critical || 0) > 0 && (
              <ArrowUpIcon className="h-4 w-4" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <span className="text-xl font-bold text-red-500">{alerts?.critical || 0}</span>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Critical</p>
          </div>
          <div>
            <span className="text-xl font-bold text-yellow-500">{alerts?.medium || 0}</span>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Medium</p>
          </div>
          <div>
            <span className="text-xl font-bold text-green-500">{alerts?.low || 0}</span>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Low</p>
          </div>
        </div>
      </div>
      
      {/* System Uptime */}
      <div className={`p-6 rounded-xl shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            System Uptime
          </h3>
          <ClockIcon className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        </div>
        <div>
          <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatUptime(uptime)}
          </span>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Last Reboot: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}; 