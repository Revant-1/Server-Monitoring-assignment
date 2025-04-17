import { useStore } from '../store/useStore';
import { PerformanceOverview } from '../components/PerformanceOverview';
import { ServerList } from '../components/ServerList';
import { PerformanceInsights } from '../components/PerformanceInsights';

export const AnalyticsPage = () => {
  const { isDarkMode, selectedServer } = useStore();

  return (
    <div className="space-y-6">
      <section aria-labelledby="performance-overview">
        <h2 id="performance-overview" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Performance Analytics
        </h2>
        <div className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <PerformanceOverview />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section aria-labelledby="servers-selection">
          <h2 id="servers-selection" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Server Selection
          </h2>
          <div className={`p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <ServerList />
          </div>
        </section>

        {selectedServer ? (
          <section aria-labelledby="server-insights">
            <h2 id="server-insights" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Server Insights
            </h2>
            <div className={`p-6 rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <PerformanceInsights />
            </div>
          </section>
        ) : (
          <section aria-labelledby="server-instructions">
            <h2 id="server-instructions" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Server Details
            </h2>
            <div className={`p-6 rounded-xl shadow-lg flex items-center justify-center ${
              isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
            }`} style={{ minHeight: '300px' }}>
              <p className="text-center">
                Select a server from the list to view detailed performance insights
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}; 