from fastapi import APIRouter
from sqlalchemy import text
from app.db.database import get_db

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint for API."""
    return {
        "status": "healthy",
        "service": "kingstown-seafood-api",
        "message": "API is running"
    }


@router.get("/health/db")
async def database_health_check():
    """Database health check endpoint."""
    try:
        db = next(get_db())
        result = db.execute(text("SELECT 1"))
        db.close()
        return {
            "status": "healthy",
            "service": "kingstown-seafood-database",
            "message": "Database connection successful"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "service": "kingstown-seafood-database",
            "message": f"Database connection failed: {str(e)}"
        }
