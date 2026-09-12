from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.product import SourceType


class ProductBase(BaseModel):
    """Base product schema."""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    category: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    unit: str = Field(default="kg", max_length=50)
    image: Optional[str] = None
    source_type: SourceType = SourceType.FARM
    availability: Optional[str] = None
    active: bool = True
    badge: Optional[str] = None
    source: Optional[str] = None


class ProductCreate(ProductBase):
    """Schema for creating a product."""
    pass


class ProductUpdate(BaseModel):
    """Schema for updating a product."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    price: Optional[float] = Field(None, gt=0)
    unit: Optional[str] = Field(None, max_length=50)
    image: Optional[str] = None
    source_type: Optional[SourceType] = None
    availability: Optional[str] = None
    active: Optional[bool] = None
    badge: Optional[str] = None
    source: Optional[str] = None


class ProductResponse(ProductBase):
    """Schema for product response."""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
