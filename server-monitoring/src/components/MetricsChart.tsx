import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

export const MetricsChart = () => {
  const { selectedServer, isDarkMode } = useStore();
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['server-usage', selectedServer?.id],
    queryFn: () => selectedServer ? api.getServerUsage(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (!selectedServer) {
    return (
      <div className={`flex items-center justify-center h-[400px] ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Select a server to view metrics
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-[400px] ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Loading metrics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-[200px]">
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          CPU & RAM Usage
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={metrics}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
            />
            <YAxis stroke={isDarkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="cpu_usage" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorCpu)" 
              name="CPU"
            />
            <Area 
              type="monotone" 
              dataKey="ram_usage" 
              stroke="#82ca9d" 
              fillOpacity={1} 
              fill="url(#colorRam)" 
              name="RAM"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[200px]">
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Disk & App Usage
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
            />
            <YAxis stroke={isDarkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="disk_usage" 
              stroke="#ffc658" 
              strokeWidth={2}
              dot={false}
              name="Disk"
            />
            <Line 
              type="monotone" 
              dataKey="app_usage" 
              stroke="#ff7300" 
              strokeWidth={2}
              dot={false}
              name="App"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 