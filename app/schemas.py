from typing import Optional

from pydantic import BaseModel, Field, field_validator


class AppointmentCreate(BaseModel):
    nome: str = Field(..., min_length=2, max_length=120)
    whatsapp: str = Field(..., min_length=10, max_length=20)
    objetivo: str = Field(..., min_length=5, max_length=255)
    preferencia_horario: str = Field(..., min_length=2, max_length=50)

    @field_validator("nome", "objetivo", "preferencia_horario")
    @classmethod
    def clean_text(cls, value: str) -> str:
        return value.strip()

    @field_validator("whatsapp")
    @classmethod
    def validate_whatsapp(cls, value: str) -> str:
        cleaned = "".join(ch for ch in value if ch.isdigit())
        if len(cleaned) < 10 or len(cleaned) > 13:
            raise ValueError("WhatsApp inválido.")
        return cleaned


class AppointmentConfirm(BaseModel):
    horario_confirmado: str = Field(..., min_length=3, max_length=50)


class AppointmentResponse(BaseModel):
    id: int
    nome: str
    whatsapp: str
    objetivo: str
    preferencia_horario: str
    status: str
    prioridade_ia: Optional[str] = None
    resumo_ia: Optional[str] = None
    resposta_ia: Optional[str] = None
    horario_sugerido: Optional[str] = None
    horario_confirmado: Optional[str] = None
    observacao: Optional[str] = None

    class Config:
        from_attributes = True