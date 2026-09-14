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

# Mount static files for frontend
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")
    app.mount("/images", StaticFiles(directory=os.path.join(static_dir, "images")), name="images")
    app.mount("/data", StaticFiles(directory=os.path.join(static_dir, "data")), name="data")

# Include routers
app.include_router(health.router, prefix="/api")
app.include_router(products.router, prefix="/api")


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
    """Serve React SPA for all non-API and non-static routes."""
    # Skip if it's an API route or static asset
    if full_path.startswith("api/") or full_path.startswith("assets/") or full_path.startswith("images/") or full_path.startswith("data/"):
        return {"message": "Route not found"}
    
    static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
    index_file = os.path.join(static_dir, "index.html")
    
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Frontend not built yet. Run 'npm run build' in the root directory."}
