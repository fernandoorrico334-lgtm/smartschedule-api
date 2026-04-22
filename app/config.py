from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "SmartSchedule AI"
    DATABASE_URL: str = "sqlite:///./smart_schedule.db"

    OPENAI_API_KEY: str = ""
    ENABLE_REAL_AI: bool = False

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()