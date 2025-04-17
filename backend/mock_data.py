from sqlalchemy.orm import Session
from models import Server, Alert, Metric, AlertSeverity
from datetime import datetime, timedelta
import random
import logging

logger = logging.getLogger(__name__)

def generate_mock_data(db: Session):
    """
    Generates mock data for servers, alerts, and metrics.
    - 5 servers
    - 20 alerts (4 per server)
    - 100 metrics (20 per server)
    """
    logger.info("Generating mock data...")
    
    # Add servers
    servers = [
        Server(
            name=f"Server-{i}",
            ip_address=f"192.168.1.{i}",
            status="active"
        )
        for i in range(1, 6)
    ]
    db.add_all(servers)
    db.commit()
    logger.info("Added 5 servers")

    # Add alerts
    severities = [AlertSeverity.CRITICAL, AlertSeverity.MEDIUM, AlertSeverity.LOW]
    for server in servers:
        for _ in range(4):
            alert = Alert(
                server_id=server.id,
                severity=random.choice(severities),
                message=f"Sample alert for Server-{server.id}",
                timestamp=datetime.utcnow() - timedelta(days=random.randint(0, 30))
            )
            db.add(alert)
    db.commit()
    logger.info("Added 20 alerts")

    # Add metrics
    for server in servers:
        for _ in range(20):
            metric = Metric(
                server_id=server.id,
                cpu_usage=random.uniform(0, 100),
                ram_usage=random.uniform(0, 100),
                disk_usage=random.uniform(0, 100),
                app_usage=random.uniform(0, 100),
                network_traffic=random.uniform(0, 1000),
                timestamp=datetime.utcnow() - timedelta(hours=random.randint(0, 720))
            )
            db.add(metric)
    db.commit()
    logger.info("Added 100 metrics")