from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.db.database import engine, Base
from app.api import health, products

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Kingstown Seafood API",
    description="Backend API for Kingstown Seafood e-commerce platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api")
app.include_router(products.router, prefix="/api")

# Mount static files for frontend
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.get("/api")
async def api_root():
    """API root endpoint."""
    return {
        "message": "Kingstown Seafood API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/api/health"
    }


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    """Serve React SPA for all non-API routes."""
    static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
    index_file = os.path.join(static_dir, "index.html")
    
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Frontend not built yet. Run 'npm run build' in the root directory."}
