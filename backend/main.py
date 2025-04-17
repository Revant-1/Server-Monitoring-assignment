from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Server, Alert, Metric
from mock_data import generate_mock_data
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Server Monitoring API", version="1.0.0")

# Get allowed origins from environment variable or use default
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000,https://server-monitoring-assignment.vercel.app/").split(",")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize mock data on startup (run only if database is empty)
@app.on_event("startup")
def startup_event():
    db = next(get_db())
    server_count = db.query(Server).count()
    if server_count == 0:
        logger.info("Database is empty. Generating mock data...")
        generate_mock_data(db)
    else:
        logger.info("Database already populated. Skipping mock data generation.")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/v1/alerts", summary="Get alert counts by severity")
def get_alerts(db: Session = Depends(get_db)):
    """
    Returns the count of critical, medium, and low alerts.
    Example response: {"critical": 5, "medium": 10, "low": 5}
    """
    alerts = db.query(Alert).all()
    counts = {"critical": 0, "medium": 0, "low": 0}
    for alert in alerts:
        counts[alert.severity.value] += 1
    return counts

@app.get("/api/v1/server/usage", summary="Get server usage metrics")
def get_usage(server_id: int, db: Session = Depends(get_db)):
    """
    Returns CPU, RAM, disk, and application usage for a server.
    Query parameter: server_id (integer)
    Example response: [{"cpu_usage": 45.2, "ram_usage": 67.8, "disk_usage": 89.1, "app_usage": 34.5, "timestamp": "2025-04-17T10:00:00"}]
    """
    server = db.query(Server).filter(Server.id == server_id).first()
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    metrics = db.query(Metric).filter(Metric.server_id == server_id).order_by(Metric.timestamp.desc()).limit(50).all()
    return [
        {
            "cpu_usage": m.cpu_usage,
            "ram_usage": m.ram_usage,
            "disk_usage": m.disk_usage,
            "app_usage": m.app_usage,
            "timestamp": m.timestamp.isoformat()
        }
        for m in metrics
    ]

@app.get("/api/v1/network/traffic", summary="Get network traffic data")
def get_traffic(server_id: int, db: Session = Depends(get_db)):
    """
    Returns incoming network traffic data for a server.
    Query parameter: server_id (integer)
    Example response: [{"network_traffic": 500.7, "timestamp": "2025-04-17T10:00:00"}]
    """
    server = db.query(Server).filter(Server.id == server_id).first()
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    metrics = db.query(Metric).filter(Metric.server_id == server_id).order_by(Metric.timestamp.desc()).limit(50).all()
    return [
        {
            "network_traffic": m.network_traffic,
            "timestamp": m.timestamp.isoformat()
        }
        for m in metrics
    ]

@app.get("/api/v1/servers", summary="Get list of servers")
def get_servers(db: Session = Depends(get_db)):
    """
    Returns a list of all servers with their details.
    Example response: [{"id": 1, "name": "Server-1", "ip_address": "192.168.1.1", "status": "active"}]
    """
    servers = db.query(Server).all()
    return [
        {
            "id": s.id,
            "name": s.name,
            "ip_address": s.ip_address,
            "status": s.status
        }
        for s in servers
    ]
