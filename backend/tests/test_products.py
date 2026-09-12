from app.models.product import SourceType


def test_create_product(client):
    """Test creating a new product."""
    product_data = {
        "name": "Test Prawns",
        "description": "Test description",
        "category": "Prawns",
        "price": 890.0,
        "unit": "kg",
        "source_type": SourceType.FARM,
        "active": True
    }
    response = client.post("/products", json=product_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Prawns"
    assert data["category"] == "Prawns"
    assert data["price"] == 890.0
    assert "id" in data


def test_get_products(client):
    """Test getting all products."""
    # First create a product
    product_data = {
        "name": "Test Fish",
        "category": "Fish",
        "price": 150.0,
        "unit": "kg",
        "source_type": SourceType.FARM,
        "active": True
    }
    client.post("/products", json=product_data)
    
    # Get all products
    response = client.get("/products")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_get_product_by_id(client):
    """Test getting a product by ID."""
    # Create a product
    product_data = {
        "name": "Test Product",
        "category": "Prawns",
        "price": 500.0,
        "unit": "kg",
        "source_type": SourceType.POND,
        "active": True
    }
    create_response = client.post("/products", json=product_data)
    product_id = create_response.json()["id"]
    
    # Get the product
    response = client.get(f"/products/{product_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == product_id
    assert data["name"] == "Test Product"


def test_get_product_not_found(client):
    """Test getting a non-existent product."""
    response = client.get("/products/99999")
    assert response.status_code == 404


def test_update_product(client):
    """Test updating a product."""
    # Create a product
    product_data = {
        "name": "Original Name",
        "category": "Prawns",
        "price": 600.0,
        "unit": "kg",
        "source_type": SourceType.FARM,
        "active": True
    }
    create_response = client.post("/products", json=product_data)
    product_id = create_response.json()["id"]
    
    # Update the product
    update_data = {
        "name": "Updated Name",
        "price": 650.0
    }
    response = client.put(f"/products/{product_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Name"
    assert data["price"] == 650.0


def test_delete_product(client):
    """Test deleting a product (soft delete)."""
    # Create a product
    product_data = {
        "name": "To Delete",
        "category": "Fish",
        "price": 200.0,
        "unit": "kg",
        "source_type": SourceType.OCEAN,
        "active": True
    }
    create_response = client.post("/products", json=product_data)
    product_id = create_response.json()["id"]
    
    # Delete the product
    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 200
    
    # Verify it's marked as inactive
    get_response = client.get(f"/products/{product_id}")
    assert get_response.status_code == 200
    assert get_response.json()["active"] == False


def test_get_categories(client):
    """Test getting all categories."""
    # Create products in different categories
    client.post("/products", json={
        "name": "Prawns 1",
        "category": "Prawns",
        "price": 500.0,
        "unit": "kg",
        "source_type": SourceType.FARM,
        "active": True
    })
    client.post("/products", json={
        "name": "Fish 1",
        "category": "Fish",
        "price": 150.0,
        "unit": "kg",
        "source_type": SourceType.FARM,
        "active": True
    })
    
    # Get categories
    response = client.get("/products/categories")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert "Prawns" in data
    assert "Fish" in data


def test_search_products(client):
    """Test searching products."""
    # Create products
    client.post("/products", json={
        "name": "Vannamei Prawns",
        "category": "Prawns",
        "price": 890.0,
        "unit": "kg",
        "source_type": SourceType.FARM,
        "active": True
    })
    
    # Search
    response = client.get("/products?search=Vannamei")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert "Vannamei" in data[0]["name"]
