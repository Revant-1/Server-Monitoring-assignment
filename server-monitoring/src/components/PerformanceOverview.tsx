import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

export const PerformanceOverview = () => {
  const { isDarkMode } = useStore();
  
  const { data: servers } = useQuery({
    queryKey: ['servers'],
    queryFn: api.getServers,
  });
  
  const { data: alerts } = useQuery({
    queryKey: ['alerts'],
    queryFn: api.getAlerts,
  });

  // Calculate server distribution by status
  const serverStatusData = [
    {
      name: 'Active',
      value: servers?.filter(server => server.status === 'active').length || 0,
      color: '#10B981' // green-500
    },
    {
      name: 'Inactive',
      value: servers?.filter(server => server.status !== 'active').length || 0,
      color: '#EF4444' // red-500
    }
  ];
  
  // Calculate alert distribution
  const alertData = alerts ? [
    { name: 'Critical', value: alerts.critical, color: '#EF4444' }, // red-500
    { name: 'Medium', value: alerts.medium, color: '#F59E0B' }, // amber-500
    { name: 'Low', value: alerts.low, color: '#10B981' } // green-500
  ] : [];
  
  // Simulated performance scores for radar chart (in a real app, calculate from actual metrics)
  const performanceScores = [
    { subject: 'CPU', score: 85, fullMark: 100 },
    { subject: 'Memory', score: 70, fullMark: 100 },
    { subject: 'Disk', score: 90, fullMark: 100 },
    { subject: 'Network', score: 95, fullMark: 100 },
    { subject: 'Response Time', score: 75, fullMark: 100 },
    { subject: 'Availability', score: 98, fullMark: 100 },
  ];

  // Calculate total servers and alerts
  const totalServers = servers?.length || 0;
  const totalAlerts = alertData.reduce((sum, item) => sum + item.value, 0);
  
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 rounded shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const ResponsivePie = ({ data, title }: { data: any[], title: string }) => (
    <div className="h-64 sm:h-72 md:h-80">
      <h4 className={`text-center font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius="70%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Server Status Pie Chart */}
        <div className={`p-4 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <ResponsivePie 
            data={serverStatusData} 
            title={`Server Status (${totalServers} Total)`} 
          />
        </div>
        
        {/* Alert Distribution Pie Chart */}
        <div className={`p-4 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <ResponsivePie 
            data={alertData} 
            title={`Alert Distribution (${totalAlerts} Total)`} 
          />
        </div>
      </div>
      
      {/* Radar Chart for System Performance */}
      <div className={`p-4 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h4 className={`text-center font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          System Performance Metrics
        </h4>
        <div className="h-64 sm:h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceScores}>
              <PolarGrid stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563', fontSize: window.innerWidth < 640 ? 10 : 12 }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563' }} 
              />
              <Radar 
                name="Performance" 
                dataKey="score" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1F2937' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard 
          title="System Uptime" 
          value="99.98%" 
          description="Last 30 days" 
          trend="up" 
          color="green"
        />
        <KpiCard 
          title="Avg Response Time" 
          value="124ms" 
          description="Last 24 hours" 
          trend="down" 
          color="green"
        />
        <KpiCard 
          title="Peak CPU Usage" 
          value="78%" 
          description="Last 24 hours" 
          trend="up" 
          color="yellow"
        />
        <KpiCard 
          title="Memory Usage" 
          value="64%" 
          description="Current average" 
          trend="stable" 
          color="blue"
        />
      </div>
    </div>
  );
};

interface KpiCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  color: 'red' | 'green' | 'yellow' | 'blue';
}

const KpiCard = ({ title, value, description, trend, color }: KpiCardProps) => {
  const { isDarkMode } = useStore();
  
  const getColorClasses = () => {
    if (color === 'red') return isDarkMode ? 'text-red-400' : 'text-red-600';
    if (color === 'green') return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (color === 'yellow') return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    return isDarkMode ? 'text-blue-400' : 'text-blue-600';
  };
  
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };
  
  return (
    <div className={`p-3 sm:p-4 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h4 className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {title}
      </h4>
      <div className="flex items-baseline mt-1">
        <p className={`text-xl sm:text-2xl font-bold ${getColorClasses()}`}>
          {value}
        </p>
        <span className={`ml-2 text-xs sm:text-sm font-medium ${
          trend === 'up' 
            ? isDarkMode ? 'text-green-400' : 'text-green-600'
            : trend === 'down'
              ? isDarkMode ? 'text-green-400' : 'text-green-600'
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {getTrendIcon()}
        </span>
      </div>
      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {description}
      </p>
    </div>
  );
}; 