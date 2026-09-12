from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.services.product import ProductService
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.models.product import SourceType

router = APIRouter(prefix="/products", tags=["products"])


def get_product_service(db: Session = Depends(get_db)) -> ProductService:
    """Dependency to get product service."""
    return ProductService(db)


@router.get("", response_model=List[ProductResponse])
async def get_products(
    active_only: bool = Query(True, description="Filter by active products only"),
    category: Optional[str] = Query(None, description="Filter by category"),
    source_type: Optional[SourceType] = Query(None, description="Filter by source type"),
    search: Optional[str] = Query(None, description="Search query"),
    service: ProductService = Depends(get_product_service)
):
    """Get all products with optional filters."""
    if category:
        return service.get_products_by_category(category, active_only=active_only)
    elif source_type:
        return service.get_products_by_source_type(source_type, active_only=active_only)
    elif search:
        return service.search_products(search, active_only=active_only)
    else:
        return service.get_all_products(active_only=active_only)


@router.get("/categories", response_model=List[str])
async def get_categories(
    active_only: bool = Query(True, description="Filter by active products only"),
    service: ProductService = Depends(get_product_service)
):
    """Get all unique product categories."""
    return service.get_all_categories(active_only=active_only)


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    service: ProductService = Depends(get_product_service)
):
    """Get a specific product by ID."""
    product = service.get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=ProductResponse, status_code=201)
async def create_product(
    product_data: ProductCreate,
    service: ProductService = Depends(get_product_service)
):
    """Create a new product."""
    return service.create_product(product_data)


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    service: ProductService = Depends(get_product_service)
):
    """Update a product."""
    product = service.update_product(product_id, product_data)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    service: ProductService = Depends(get_product_service)
):
    """Delete a product (soft delete)."""
    success = service.delete_product(product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
