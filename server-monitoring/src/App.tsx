import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServerList } from './components/ServerList.tsx';
import { MetricsChart } from './components/MetricsChart';
import { Alerts } from './components/Alerts';
import { Header } from './components/Header';
import { useStore } from './store/useStore';
import { SystemOverview } from './components/SystemOverview';
import { NetworkTrafficChart } from './components/NetworkTrafficChart';
import { PerformanceInsights } from './components/PerformanceInsights';
import { Navigation, MobileNavigation } from './components/Navigation';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ExportPage } from './pages/ExportPage';

// Create a placeholder component for pages not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => {
  const { isDarkMode } = useStore();
  return (
    <div className={`flex items-center justify-center p-12 rounded-xl shadow-lg ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`} style={{ minHeight: '300px' }}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{title} Page</h2>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          This page is coming soon. Check back later for updates!
        </p>
      </div>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000, // Consider data fresh for 1 second
    },
  },
});

function AppContent() {
  const { isDarkMode } = useStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <Navigation />
          </div>
          <div className="flex-grow pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/export" element={<ExportPage />} />
            </Routes>
          </div>
        </div>
      </main>
      
      <MobileNavigation />
      
      {/* Footer */}
      <footer className={`mt-12 py-6 ${
        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © {new Date().getFullYear()} Server Monitoring Dashboard
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="text-sm hover:underline focus:outline-none">Documentation</button>
              <button className="text-sm hover:underline focus:outline-none">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
