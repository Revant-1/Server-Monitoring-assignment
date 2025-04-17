import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

export const NetworkTrafficChart = () => {
  const { selectedServer, isDarkMode } = useStore();
  const { data: trafficData, isLoading } = useQuery({
    queryKey: ['network-traffic', selectedServer?.id],
    queryFn: () => selectedServer ? api.getNetworkTraffic(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
    refetchInterval: 5000,
  });

  if (!selectedServer) {
    return (
      <div className={`flex items-center justify-center h-[200px] ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Select a server to view network traffic
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-[200px] ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Loading network data...
      </div>
    );
  }

  // Calculate some additional metrics
  const trafficStats = {
    average: trafficData?.length 
      ? trafficData.reduce((sum, item) => sum + item.network_traffic, 0) / trafficData.length 
      : 0,
    max: trafficData?.length 
      ? Math.max(...trafficData.map(item => item.network_traffic)) 
      : 0,
    min: trafficData?.length 
      ? Math.min(...trafficData.map(item => item.network_traffic)) 
      : 0,
  };

  // Format traffic data for tooltip
  const formatTraffic = (value: number) => {
    if (value > 1000) {
      return `${(value / 1000).toFixed(2)} GB/s`;
    }
    return `${value.toFixed(2)} MB/s`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Network Traffic for {selectedServer.name}
        </h3>
        <div className="flex space-x-4">
          <div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Avg:
            </span>
            <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatTraffic(trafficStats.average)}
            </span>
          </div>
          <div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Max:
            </span>
            <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatTraffic(trafficStats.max)}
            </span>
          </div>
          <div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Min:
            </span>
            <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatTraffic(trafficStats.min)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
              />
              <YAxis 
                stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
                tickFormatter={formatTraffic}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1F2937' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value) => [formatTraffic(value as number), 'Traffic']}
              />
              <Area 
                type="monotone" 
                dataKey="network_traffic" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorTraffic)" 
                name="Network Traffic"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
              />
              <YAxis 
                stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
                tickFormatter={formatTraffic}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1F2937' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value) => [formatTraffic(value as number), 'Traffic']}
              />
              <Legend />
              <Bar 
                dataKey="network_traffic" 
                fill="#3B82F6" 
                name="Network Traffic" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 