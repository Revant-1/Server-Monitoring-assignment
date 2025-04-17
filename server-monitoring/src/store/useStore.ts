import { create } from 'zustand';
import { Server } from '../services/api';

interface DashboardState {
  selectedServer: Server | null;
  setSelectedServer: (server: Server | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useStore = create<DashboardState>((set) => ({
  selectedServer: null,
  setSelectedServer: (server) => set({ selectedServer: server }),
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
})); 