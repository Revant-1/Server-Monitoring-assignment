import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { ArrowDownTrayIcon, DocumentTextIcon, TableCellsIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const DataExport = () => {
  const { selectedServer, isDarkMode } = useStore();
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Get server usage data
  const { data: metrics } = useQuery({
    queryKey: ['server-usage', selectedServer?.id],
    queryFn: () => selectedServer ? api.getServerUsage(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
  });

  // Get network traffic data
  const { data: networkData } = useQuery({
    queryKey: ['network-traffic', selectedServer?.id],
    queryFn: () => selectedServer ? api.getNetworkTraffic(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
  });

  // Get all servers for full export option

  const handleExport = () => {
    setIsExporting(true);
    
    // Create export data based on format
    setTimeout(() => {
      if (exportFormat === 'csv') {
        exportAsCSV();
      } else if (exportFormat === 'json') {
        exportAsJSON();
      } else {
        // Mock PDF export (in a real app, you'd use a library like jsPDF)
        mockPDFExport();
      }
      
      setIsExporting(false);
      setExportSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1000);
  };

  const exportAsCSV = () => {
    // Generate CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Timestamp,CPU Usage,RAM Usage,Disk Usage,App Usage,Network Traffic\n";
    
    // Combine metrics and network data by timestamp
    const combinedData = metrics?.map(metric => {
      const matchingNetwork = networkData?.find(n => n.timestamp === metric.timestamp);
      return {
        ...metric,
        network_traffic: matchingNetwork?.network_traffic || 0
      };
    });
    
    // Add data rows
    combinedData?.forEach(item => {
      csvContent += `${item.timestamp},${item.cpu_usage},${item.ram_usage},${item.disk_usage},${item.app_usage},${item.network_traffic}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `server_data_${selectedServer?.name}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  const exportAsJSON = () => {
    // Generate JSON content
    const combinedData = metrics?.map(metric => {
      const matchingNetwork = networkData?.find(n => n.timestamp === metric.timestamp);
      return {
        ...metric,
        network_traffic: matchingNetwork?.network_traffic || 0
      };
    });
    
    const jsonData = JSON.stringify({
      server: selectedServer,
      data: combinedData,
      exportDate: new Date().toISOString()
    }, null, 2);
    
    // Create blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `server_data_${selectedServer?.name}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  
  const mockPDFExport = () => {
    // In a real app, this would use a library like jsPDF to generate a PDF
    // For this demo, we'll just simulate it with a text file
    const textContent = `Server Monitoring Report
Generated: ${new Date().toLocaleString()}
Server: ${selectedServer?.name} (${selectedServer?.ip_address})
Status: ${selectedServer?.status}

PERFORMANCE METRICS:
-------------------
${metrics?.map(metric => 
  `${new Date(metric.timestamp).toLocaleString()}
   CPU: ${metric.cpu_usage}%
   RAM: ${metric.ram_usage}%
   Disk: ${metric.disk_usage}%
   App: ${metric.app_usage}%
   Network: ${networkData?.find(n => n.timestamp === metric.timestamp)?.network_traffic || 0} MB/s
  `).join('\n\n')}
`;
    
    // Create blob and download link
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `server_report_${selectedServer?.name}_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const ExportOption = ({ value, icon: Icon, label, description }: any) => (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
        exportFormat === value
          ? isDarkMode 
            ? 'bg-blue-900/30 ring-2 ring-blue-500' 
            : 'bg-blue-50 ring-2 ring-blue-500'
          : isDarkMode 
            ? 'hover:bg-gray-700' 
            : 'hover:bg-gray-100'
      }`}
      onClick={() => setExportFormat(value)}
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-lg mr-3 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</h4>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <ArrowDownTrayIcon className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Export Server Data
        </h3>
      </div>
      
      {!selectedServer ? (
        <div className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Please select a server to export its data
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExportOption 
              value="csv" 
              icon={TableCellsIcon} 
              label="CSV Format" 
              description="Export as CSV for spreadsheet applications" 
            />
            <ExportOption 
              value="json" 
              icon={DocumentTextIcon} 
              label="JSON Format" 
              description="Export as JSON for programmatic use" 
            />
            <ExportOption 
              value="pdf" 
              icon={ChartBarIcon} 
              label="Report Format" 
              description="Export as formatted text report" 
            />
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting || !selectedServer}
            className={`flex items-center justify-center px-4 py-2 rounded-md font-medium ${
              isExporting
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors duration-200 w-full md:w-auto`}
          >
            {isExporting ? (
              <span>Exporting...</span>
            ) : (
              <>
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                <span>Export Data for {selectedServer.name}</span>
              </>
            )}
          </button>
          
          {exportSuccess && (
            <div className={`text-center py-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              Data exported successfully!
            </div>
          )}
        </>
      )}
    </div>
  );
}; 