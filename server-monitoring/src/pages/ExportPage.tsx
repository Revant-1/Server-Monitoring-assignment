import { useStore } from '../store/useStore';
import { DataExport } from '../components/DataExport';
import { ServerList } from '../components/ServerList';

export const ExportPage = () => {
  const { isDarkMode } = useStore();

  return (
    <div className="space-y-6">
      <section aria-labelledby="export-heading">
        <h2 id="export-heading" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Data Export
        </h2>
        <div className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <DataExport />
        </div>
      </section>

      <section aria-labelledby="server-selection">
        <h2 id="server-selection" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Server Selection
        </h2>
        <div className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="max-w-3xl mx-auto">
            <ServerList />
          </div>
        </div>
      </section>

      <section aria-labelledby="export-instructions">
        <h2 id="export-instructions" className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Export Instructions
        </h2>
        <div className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="space-y-4 max-w-3xl mx-auto">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How to Use Exported Data
            </h3>
            
            <div className="space-y-2">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className={`text-base font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CSV Format</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Export data in CSV format for use in spreadsheet applications like Microsoft Excel, Google Sheets,
                  or LibreOffice Calc. Perfect for creating custom charts or performing additional calculations.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className={`text-base font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>JSON Format</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Export data in JSON format for programmatic use. Ideal for integrating with other applications
                  or for processing with custom scripts.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className={`text-base font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Report Format</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Export a formatted text report suitable for documentation or archiving purposes. Contains all
                  the key metrics in a human-readable format.
                </p>
              </div>
            </div>
            
            <div className={`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 ${
              isDarkMode ? 'bg-yellow-900/20 text-yellow-100' : 'bg-yellow-50 text-yellow-800'
            }`}>
              <p className="text-sm">
                <strong>Note:</strong> Exported data is a snapshot of the current metrics at the time of export.
                For continuous monitoring, set up scheduled exports or use our API for integration with your monitoring tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 