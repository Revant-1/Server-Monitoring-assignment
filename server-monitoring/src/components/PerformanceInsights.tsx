import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { LightBulbIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

export const PerformanceInsights = () => {
  const { selectedServer, isDarkMode } = useStore();
  
  const { data: metrics } = useQuery({
    queryKey: ['server-usage', selectedServer?.id],
    queryFn: () => selectedServer ? api.getServerUsage(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
  });

  if (!selectedServer || !metrics || metrics.length === 0) {
    return null;
  }

  // Generate insights based on the metrics data
  const generateInsights = () => {
    const insights = [];
    
    // Calculate averages
    const cpuAvg = metrics.reduce((sum, m) => sum + m.cpu_usage, 0) / metrics.length;
    const ramAvg = metrics.reduce((sum, m) => sum + m.ram_usage, 0) / metrics.length;
    const diskAvg = metrics.reduce((sum, m) => sum + m.disk_usage, 0) / metrics.length;
    
    // Identify trends (using last 5 points if available)
    const recentPoints = metrics.slice(-5);
    const cpuTrend = recentPoints.length > 1 
      ? recentPoints[recentPoints.length - 1].cpu_usage - recentPoints[0].cpu_usage 
      : 0;
    const ramTrend = recentPoints.length > 1 
      ? recentPoints[recentPoints.length - 1].ram_usage - recentPoints[0].ram_usage 
      : 0;
    
    // CPU usage insights
    if (cpuAvg > 80) {
      insights.push({
        type: 'warning',
        message: 'High average CPU usage detected. Consider optimizing applications or upgrading hardware.',
        metric: 'CPU',
        value: `${cpuAvg.toFixed(1)}%`
      });
    } else if (cpuAvg < 20) {
      insights.push({
        type: 'info',
        message: 'Low CPU utilization. This server might be underutilized.',
        metric: 'CPU',
        value: `${cpuAvg.toFixed(1)}%`
      });
    }
    
    // RAM usage insights
    if (ramAvg > 85) {
      insights.push({
        type: 'warning',
        message: 'Memory usage is high. Consider adding more RAM or optimizing applications.',
        metric: 'RAM',
        value: `${ramAvg.toFixed(1)}%`
      });
    }
    
    // Disk space insights
    if (diskAvg > 90) {
      insights.push({
        type: 'critical',
        message: 'Disk space critically low. Free up space to prevent system failures.',
        metric: 'Disk',
        value: `${diskAvg.toFixed(1)}%`
      });
    } else if (diskAvg > 75) {
      insights.push({
        type: 'warning',
        message: 'Disk space is getting low. Consider cleanup or expansion.',
        metric: 'Disk',
        value: `${diskAvg.toFixed(1)}%`
      });
    }
    
    // Resource trend insights
    if (cpuTrend > 15) {
      insights.push({
        type: 'warning',
        message: 'CPU usage is trending upward significantly. Monitor for potential issues.',
        metric: 'CPU Trend',
        value: `+${cpuTrend.toFixed(1)}%`,
        trend: 'up'
      });
    }
    
    if (ramTrend > 10) {
      insights.push({
        type: 'warning',
        message: 'Memory usage is increasing. Check for memory leaks.',
        metric: 'RAM Trend',
        value: `+${ramTrend.toFixed(1)}%`,
        trend: 'up'
      });
    }
    
    // Add default insight if no issues found
    if (insights.length === 0) {
      insights.push({
        type: 'success',
        message: 'All server metrics within normal parameters.',
        metric: 'Overall',
        value: 'Good'
      });
    }
    
    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <LightBulbIcon className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Performance Insights
        </h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'critical' 
                ? 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500' 
                : insight.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20 dark:border-yellow-500'
                  : insight.type === 'success'
                    ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500'
                    : 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className={`font-semibold mr-2 ${
                    insight.type === 'critical' 
                      ? 'text-red-700 dark:text-red-400' 
                      : insight.type === 'warning'
                        ? 'text-yellow-700 dark:text-yellow-400'
                        : insight.type === 'success'
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-blue-700 dark:text-blue-400'
                  }`}>
                    {insight.metric}:
                  </span>
                  <span className="font-bold">
                    {insight.value}
                  </span>
                  {insight.trend && (
                    insight.trend === 'up' 
                      ? <ArrowTrendingUpIcon className="h-4 w-4 ml-1 text-red-500" /> 
                      : <ArrowTrendingDownIcon className="h-4 w-4 ml-1 text-green-500" />
                  )}
                </div>
                <p className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600' 
                }`}>
                  {insight.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 