# Render Deployment Guide for Kingstown Seafood Backend

## Prerequisites
- Render account (free tier available)
- GitHub account (Render connects to GitHub)
- Backend code ready

## Step 1: Push Code to GitHub

1. **Initialize git repository** (if not already done):
```bash
cd "c:\Users\koppa\OneDrive\Desktop\kingstown - Copy - Copy"
git init
git add .
git commit -m "Initial commit - backend and frontend"
```

2. **Create GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `kingstown-seafood`)
   - Don't initialize with README (we have one)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/kingstown-seafood.git
git branch -M main
git push -u origin main
```

## Step 2: Create PostgreSQL Database on Render

1. **Log in to Render** at https://dashboard.render.com

2. **Create PostgreSQL database**:
   - Click "New" → "PostgreSQL"
   - Name: `kingstown-db`
   - Database: `kingstown_db`
   - User: `kingstown`
   - Region: Choose closest to your users
   - Plan: Free (recommended for testing)
   - Click "Create Database"

3. **Save connection details**:
   - Render will show the database connection string
   - Format: `postgresql://kingstown:PASSWORD@dpg-xxx.oregon-postgres.render.com/kingstown_db`
   - Copy this for later

## Step 3: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. **Ensure render.yaml is in backend folder**
   - Already created at `backend/render.yaml`

2. **Create Web Service**:
   - In Render dashboard, click "New" → "Web Service"
   - Connect your GitHub repository
   - Select `kingstown-seafood` repository
   - Render will detect `render.yaml` automatically
   - Root Directory: `backend`
   - Click "Create Web Service"

### Option B: Manual Configuration

1. **Create Web Service**:
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Name: `kingstown-backend`
   - Region: Same as database
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Add Environment Variables**:
   - Scroll to "Environment Variables"
   - Add:
     - `DATABASE_URL`: (paste your PostgreSQL connection string from Step 2)
     - `ENVIRONMENT`: `production`
     - `DEBUG`: `false`
     - `CORS_ORIGINS`: `https://your-frontend-url.onrender.com,http://localhost:3001,http://localhost:3002`

3. **Connect Database**:
   - Scroll to "Databases"
   - Click "Connect existing database"
   - Select `kingstown-db` from Step 2

4. **Click "Create Web Service"**

## Step 4: Run Database Migrations

After deployment, you need to run Alembic migrations:

1. **Open Render Shell**:
   - Go to your web service in Render dashboard
   - Click "Shell" tab

2. **Run migrations**:
```bash
alembic upgrade head
```

3. **Verify tables created**:
```bash
python -c "from app.db.database import engine; from app.models import product; from app.db.database import Base; Base.metadata.create_all(bind=engine); print('Tables created')"
```

## Step 5: Test Deployment

1. **Get your API URL**:
   - Render will provide a URL like: `https://kingstown-backend.onrender.com`

2. **Test health endpoint**:
```bash
curl https://kingstown-backend.onrender.com/health
```

3. **Test database health**:
```bash
curl https://kingstown-backend.onrender.com/health/db
```

4. **Test products endpoint**:
```bash
curl https://kingstown-backend.onrender.com/products
```

## Step 6: Update Frontend CORS

1. **Update backend CORS**:
   - Go to Render dashboard → kingstown-backend
   - Edit environment variable `CORS_ORIGINS`
   - Add your frontend URL (when deployed)

2. **Update frontend API calls**:
   - In frontend code, replace `http://localhost:8000` with your Render URL
   - Example: `https://kingstown-backend.onrender.com`

## Step 7: Deploy Frontend (Optional - Vercel)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd "c:\Users\koppa\OneDrive\Desktop\kingstown - Copy - Copy"
vercel
```

3. **Update backend CORS** with Vercel URL

## Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` environment variable
- Ensure database is running in Render
- Verify database credentials

### Migration Error
- Use Render Shell to run migrations manually
- Check Alembic configuration

### CORS Error
- Update `CORS_ORIGINS` to include your frontend URL
- Check browser console for specific error

### Build Failure
- Check Render logs
- Ensure all dependencies in requirements.txt
- Verify Python version compatibility

## Cost Summary

**Free Tier (Recommended for Testing):**
- PostgreSQL: Free (90 days, then $7/month)
- Web Service: Free (750 hours/month)
- **Total: $0/month (first 90 days), then $7/month**

**Paid Tier (Production):**
- PostgreSQL: $7/month
- Web Service: $7/month (starts after free)
- **Total: $14/month**

## Local Development After Deployment

Keep local development separate:

```bash
# Local development (SQLite)
cd backend
# .env has DATABASE_URL=sqlite:///./kingstown.db
venv\Scripts\activate
uvicorn app.main:app --reload

# Production uses PostgreSQL on Render
# No changes needed - environment variables handle it
```

## Next Steps

After successful deployment:

1. **Seed database** with product data from frontend
2. **Test API endpoints** with frontend
3. **Implement authentication** (JWT)
4. **Add order management** system
5. **Create admin panel** to view orders

## Monitoring

- **Render Dashboard**: View logs, metrics, and status
- **Health Endpoints**: `/health` and `/health/db`
- **Database**: Render PostgreSQL dashboard
