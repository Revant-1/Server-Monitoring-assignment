import { useStore } from '../store/useStore';
import { SystemOverview } from '../components/SystemOverview';
import { Alerts } from '../components/Alerts';
import { ServerList } from '../components/ServerList';
import { MetricsChart } from '../components/MetricsChart';
import { NetworkTrafficChart } from '../components/NetworkTrafficChart';
import { PerformanceInsights } from '../components/PerformanceInsights';

export const DashboardPage = () => {
  const { isDarkMode, selectedServer } = useStore();

  return (
    <div className="space-y-6">
      {/* System Overview Section */}
      <section aria-labelledby="system-overview">
        <h2 id="system-overview" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          System Overview
        </h2>
        <div className={`p-4 sm:p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <SystemOverview />
        </div>
      </section>

      {/* Alerts Section */}
      <section aria-labelledby="alerts-heading">
        <h2 id="alerts-heading" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Alert Status
        </h2>
        <div className={`p-4 sm:p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Alerts />
        </div>
      </section>

      {/* Servers Grid */}
      <section aria-labelledby="servers-heading">
        <h2 id="servers-heading" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Server Status
        </h2>
        <div className={`p-4 sm:p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <ServerList />
        </div>
      </section>

      {/* Performance Insights - Only show when a server is selected */}
      {selectedServer && (
        <section aria-labelledby="insights-heading">
          <h2 id="insights-heading" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Analysis for {selectedServer.name}
          </h2>
          <div className={`p-4 sm:p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <PerformanceInsights />
          </div>
        </section>
      )}

      {/* Resource Usage - Only show when a server is selected */}
      {selectedServer && (
        <section aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Resource Usage for {selectedServer.name}
          </h2>
          <div className={`p-4 sm:p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <MetricsChart />
          </div>
        </section>
      )}

      {/* Network Traffic - Only show when a server is selected */}
      {selectedServer && (
        <section aria-labelledby="network-heading">
          <h2 id="network-heading" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Network Traffic for {selectedServer.name}
          </h2>
          <div className={`p-4 sm:p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <NetworkTrafficChart />
          </div>
        </section>
      )}

      {/* Placeholder when no server is selected */}
      {!selectedServer && (
        <div className={`p-6 rounded-xl shadow-lg text-center ${
          isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
        }`} style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Select a server from the list above to view detailed performance metrics.</p>
        </div>
      )}
    </div>
  );
}; 