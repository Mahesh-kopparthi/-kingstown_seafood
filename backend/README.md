# Kingstown Seafood Backend

FastAPI backend for the Kingstown Seafood e-commerce platform.

## Setup Instructions

### Prerequisites
- Python 3.11+
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

### Installation

1. Copy environment file:
```bash
cp backend/.env.example backend/.env
```

2. Start services with Docker Compose:
```bash
docker-compose up -d
```

### Running Locally (without Docker)

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Set up PostgreSQL (ensure it's running on localhost:5432)

3. Run migrations:
```bash
alembic upgrade head
```

4. Start the server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Running Tests

```bash
cd backend
pytest
```

### API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Health Endpoints

- API Health: GET /health
- Database Health: GET /health/db

### Available Endpoints

#### Products
- GET /products - Get all products (with optional filters)
- GET /products/categories - Get all categories
- GET /products/{id} - Get product by ID
- POST /products - Create new product
- PUT /products/{id} - Update product
- DELETE /products/{id} - Delete product (soft delete)

### Architecture

```
React/Vite Frontend
       ↓
    FastAPI
       ↓
  API / Routes
       ↓
  Service Layer
       ↓
Repository / Data Access
       ↓
   PostgreSQL
```

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── api/                 # API routes
│   │   ├── health.py        # Health check endpoints
│   │   └── products.py      # Product endpoints
│   ├── models/              # SQLAlchemy models
│   │   ├── base.py         # Base model
│   │   └── product.py      # Product model
│   ├── schemas/             # Pydantic schemas
│   │   └── product.py      # Product schemas
│   ├── services/            # Business logic layer
│   │   └── product.py      # Product service
│   ├── repositories/        # Data access layer
│   │   └── product.py      # Product repository
│   ├── db/                  # Database configuration
│   │   └── database.py     # DB session and engine
│   └── core/                # Core configuration
│       └── config.py       # Settings
├── tests/                   # Test files
├── alembic/                 # Database migrations
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── Dockerfile              # Docker configuration
```
