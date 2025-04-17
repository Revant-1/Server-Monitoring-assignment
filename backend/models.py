from sqlalchemy import Column, Integer, String, Float, DateTime, Enum
from database import Base
import enum
from datetime import datetime

class AlertSeverity(enum.Enum):
    CRITICAL = "critical"
    MEDIUM = "medium"
    LOW = "low"

class Server(Base):
    __tablename__ = "servers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    ip_address = Column(String)
    status = Column(String)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, index=True)
    severity = Column(Enum(AlertSeverity))
    message = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class Metric(Base):
    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, index=True)
    cpu_usage = Column(Float)
    ram_usage = Column(Float)
    disk_usage = Column(Float)
    app_usage = Column(Float)
    network_traffic = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)