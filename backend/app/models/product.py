from sqlalchemy import Column, String, Integer, Float, Boolean, Text, Enum
from sqlalchemy.orm import relationship
import enum
from app.models.base import BaseModel


class SourceType(str, enum.Enum):
    """Seafood source type."""
    FARM = "FARM"
    POND = "POND"
    OCEAN = "OCEAN"


class Product(BaseModel):
    """Product model for seafood items."""
    __tablename__ = "products"

    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False, index=True)
    price = Column(Float, nullable=False)
    unit = Column(String(50), nullable=False, default="kg")
    image = Column(String(500), nullable=True)
    source_type = Column(Enum(SourceType), nullable=False, default=SourceType.FARM)
    availability = Column(String(100), nullable=True)
    active = Column(Boolean, default=True, nullable=False)
    badge = Column(String(100), nullable=True)
    source = Column(String(100), nullable=True)
