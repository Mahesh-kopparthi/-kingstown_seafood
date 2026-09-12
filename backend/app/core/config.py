from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./kingstown.db"
    POSTGRES_USER: str = "kingstown"
    POSTGRES_PASSWORD: str = "kingstown_password"
    POSTGRES_DB: str = "kingstown_db"

    # API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:3001,http://localhost:3002"

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    USE_SQLITE: bool = True

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
