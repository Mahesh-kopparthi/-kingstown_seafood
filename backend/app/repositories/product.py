from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from app.models.product import Product, SourceType


class ProductRepository:
    """Repository for product data access operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(self, product_data: dict) -> Product:
        """Create a new product."""
        db_product = Product(**product_data)
        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)
        return db_product

    def get_by_id(self, product_id: int) -> Optional[Product]:
        """Get a product by ID."""
        return self.db.query(Product).filter(Product.id == product_id).first()

    def get_all(self, active_only: bool = True) -> List[Product]:
        """Get all products, optionally filtering by active status."""
        query = self.db.query(Product)
        if active_only:
            query = query.filter(Product.active == True)
        return query.order_by(Product.created_at.desc()).all()

    def get_by_category(self, category: str, active_only: bool = True) -> List[Product]:
        """Get products by category."""
        query = self.db.query(Product).filter(Product.category == category)
        if active_only:
            query = query.filter(Product.active == True)
        return query.order_by(Product.created_at.desc()).all()

    def get_by_source_type(self, source_type: SourceType, active_only: bool = True) -> List[Product]:
        """Get products by source type."""
        query = self.db.query(Product).filter(Product.source_type == source_type)
        if active_only:
            query = query.filter(Product.active == True)
        return query.order_by(Product.created_at.desc()).all()

    def search(self, query: str, active_only: bool = True) -> List[Product]:
        """Search products by name or description."""
        search_query = self.db.query(Product).filter(
            or_(
                Product.name.ilike(f"%{query}%"),
                Product.description.ilike(f"%{query}%"),
                Product.category.ilike(f"%{query}%"),
            )
        )
        if active_only:
            search_query = search_query.filter(Product.active == True)
        return search_query.order_by(Product.created_at.desc()).all()

    def update(self, product_id: int, product_data: dict) -> Optional[Product]:
        """Update a product."""
        db_product = self.get_by_id(product_id)
        if not db_product:
            return None
        for key, value in product_data.items():
            setattr(db_product, key, value)
        self.db.commit()
        self.db.refresh(db_product)
        return db_product

    def delete(self, product_id: int) -> bool:
        """Delete a product (soft delete by setting active=False)."""
        db_product = self.get_by_id(product_id)
        if not db_product:
            return False
        db_product.active = False
        self.db.commit()
        return True

    def get_categories(self, active_only: bool = True) -> List[str]:
        """Get all unique product categories."""
        query = self.db.query(Product.category).distinct()
        if active_only:
            query = query.filter(Product.active == True)
        return [category[0] for category in query.all()]
