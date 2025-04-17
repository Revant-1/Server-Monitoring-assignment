# Server Monitoring Dashboard

A modern, responsive dashboard for monitoring server performance metrics in real-time.

![Dashboard](https://github.com/user-attachments/assets/88c7ee8b-84e5-4e96-99d6-bab3427c24f7)
![Analytics-page](https://github.com/user-attachments/assets/12cd6dbe-c607-41ab-a383-5e9431ed3f08)
![Export-page](https://github.com/user-attachments/assets/f87e94a5-64cf-4b09-8037-b3d6cd6e4ff1)



## Features

- **Real-time Performance Monitoring**: Track CPU, RAM, disk usage, and network traffic
- **Multi-page Dashboard**: Dedicated pages for monitoring, analytics, and data export
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in different environments
- **Data Export**: Export server metrics in various formats (CSV, JSON, Report)
- **Interactive Charts**: Visualize server metrics with beautiful, responsive charts
- **Intelligent Insights**: Get automated performance analysis for your servers
- **Search and Filter**: Quickly find specific servers

## Project Structure

The project consists of two main components:

### Backend (Python/FastAPI)

The backend is built with FastAPI and provides the server monitoring API:

- **FastAPI**: RESTful API framework for Python
- **SQLAlchemy**: ORM for database operations
- **Mock Data**: Simulated server metrics for demonstration
- **Live Metrics**: CPU, RAM, disk, network traffic, and application data

### Frontend (React/TypeScript)

The frontend is built with React and TypeScript, providing an intuitive UI:

- **React**: Component-based UI library
- **TypeScript**: Static typing for better code quality
- **React Query**: Data fetching and caching
- **Recharts**: Responsive charting library
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Navigation between pages
- **Zustand**: State management

## API Endpoints

The backend exposes the following API endpoints:

- **GET /api/v1/servers**: List all servers
- **GET /api/v1/alerts**: Get alert counts by severity
- **GET /api/v1/server/usage**: Get server usage metrics (CPU, RAM, disk, app)
- **GET /api/v1/network/traffic**: Get network traffic data

## Code Organization

The frontend codebase follows a modular structure:

```
src/
├── components/         # Reusable UI components
├── pages/              # Page components for routing
├── services/           # API service layer
├── store/              # State management
└── App.tsx             # Main application component
```

### Key Components

- **ServerList**: Displays and filters servers with responsive grid/list views
- **MetricsChart**: Visualizes resource usage metrics
- **NetworkTrafficChart**: Displays network traffic with trends and analysis
- **PerformanceInsights**: Provides intelligent analysis of server performance
- **SystemOverview**: Shows system-wide metrics and health status
- **DataExport**: Exports server data in multiple formats

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.9+)

### Installation

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend

1. Navigate to the server-monitoring directory:
   ```bash
   cd server-monitoring
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` (or the port Vite assigns)

## Design Decisions

### Responsive Design

The dashboard is built with a mobile-first approach using Tailwind CSS, ensuring that all components adapt seamlessly to different screen sizes:

- **Flexible Layouts**: Grid/list toggle for server display
- **Responsive Charts**: Charts resize based on available screen space
- **Mobile Navigation**: Bottom navigation bar on mobile devices
- **Adaptive Typography**: Text size adjusts based on screen size

### Performance Optimization

The application is optimized for performance in several ways:

- **React Query Caching**: Minimizes API calls
- **Conditional Rendering**: Only renders components when needed
- **Lazy Loading**: Defers loading of components until needed
- **Memoization**: Prevents unnecessary re-renders

### User Experience

Special attention was paid to the user experience:

- **Dark/Light Mode**: Automatic detection of system preference with toggle
- **Intuitive Navigation**: Clear organization of data
- **Data Visualization**: Multiple chart types for better understanding
- **Helpful Insights**: Automated analysis of server performance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Heroicons](https://heroicons.com/) 
