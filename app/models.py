from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(120), nullable=False)
    whatsapp = Column(String(20), nullable=False)
    objetivo = Column(String(255), nullable=False)
    preferencia_horario = Column(String(50), nullable=False)

    status = Column(String(50), nullable=False, default="novo")
    prioridade_ia = Column(String(20), nullable=True)
    resumo_ia = Column(Text, nullable=True)
    resposta_ia = Column(Text, nullable=True)

    horario_sugerido = Column(String(50), nullable=True)
    horario_confirmado = Column(String(50), nullable=True)
    observacao = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )