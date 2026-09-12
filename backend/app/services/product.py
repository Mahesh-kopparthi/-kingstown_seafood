from typing import List, Optional
from app.models.product import Product, SourceType
from app.repositories.product import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate


class ProductService:
    """Service layer for product business logic."""

    def __init__(self, db):
        self.repository = ProductRepository(db)

    def create_product(self, product_data: ProductCreate) -> Product:
        """Create a new product."""
        return self.repository.create(product_data.model_dump())

    def get_product(self, product_id: int) -> Optional[Product]:
        """Get a product by ID."""
        return self.repository.get_by_id(product_id)

    def get_all_products(self, active_only: bool = True) -> List[Product]:
        """Get all products."""
        return self.repository.get_all(active_only=active_only)

    def get_products_by_category(self, category: str, active_only: bool = True) -> List[Product]:
        """Get products by category."""
        return self.repository.get_by_category(category, active_only=active_only)

    def get_products_by_source_type(self, source_type: SourceType, active_only: bool = True) -> List[Product]:
        """Get products by source type."""
        return self.repository.get_by_source_type(source_type, active_only=active_only)

    def search_products(self, query: str, active_only: bool = True) -> List[Product]:
        """Search products."""
        return self.repository.search(query, active_only=active_only)

    def update_product(self, product_id: int, product_data: ProductUpdate) -> Optional[Product]:
        """Update a product."""
        update_data = product_data.model_dump(exclude_unset=True)
        if not update_data:
            return self.repository.get_by_id(product_id)
        return self.repository.update(product_id, update_data)

    def delete_product(self, product_id: int) -> bool:
        """Delete a product (soft delete)."""
        return self.repository.delete(product_id)

    def get_all_categories(self, active_only: bool = True) -> List[str]:
        """Get all unique categories."""
        return self.repository.get_categories(active_only=active_only)
