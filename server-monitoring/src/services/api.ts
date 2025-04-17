import axios from 'axios';

// Use environment variable for API URL with a fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface Server {
  id: number;
  name: string;
  ip_address: string;
  status: string;
}

export interface Metric {
  cpu_usage: number;
  ram_usage: number;
  disk_usage: number;
  app_usage: number;
  timestamp: string;
}

export interface NetworkTraffic {
  network_traffic: number;
  timestamp: string;
}

export interface AlertCounts {
  critical: number;
  medium: number;
  low: number;
}

export const api = {
  getServers: async (): Promise<Server[]> => {
    const response = await axios.get(`${API_BASE_URL}/servers`);
    return response.data;
  },

  getServerUsage: async (serverId: number): Promise<Metric[]> => {
    const response = await axios.get(`${API_BASE_URL}/server/usage?server_id=${serverId}`);
    return response.data;
  },

  getNetworkTraffic: async (serverId: number): Promise<NetworkTraffic[]> => {
    const response = await axios.get(`${API_BASE_URL}/network/traffic?server_id=${serverId}`);
    return response.data;
  },

  getAlerts: async (): Promise<AlertCounts> => {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  }
}; 