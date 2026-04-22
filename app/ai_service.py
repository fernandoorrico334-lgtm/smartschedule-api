from __future__ import annotations

from typing import Dict

from app.config import settings

if settings.ENABLE_REAL_AI:
    from openai import OpenAI
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
else:
    client = None


def qualify_appointment(
    nome: str,
    objetivo: str,
    preferencia_horario: str,
    horario_sugerido: str,
) -> Dict[str, str]:
    """
    Retorna:
    - prioridade_ia
    - resumo_ia
    - resposta_ia
    """

    if not settings.ENABLE_REAL_AI:
        objetivo_lower = objetivo.lower()

        if any(word in objetivo_lower for word in ["urgente", "hoje", "imediato"]):
            prioridade = "alta"
        elif any(word in objetivo_lower for word in ["avaliação", "treino", "consulta", "agendar"]):
            prioridade = "media"
        else:
            prioridade = "baixa"

        resumo = (
            f"Cliente interessado em '{objetivo}', com preferência de horário "
            f"'{preferencia_horario}'. Prioridade classificada como {prioridade}."
        )

        resposta = (
            f"Olá, {nome}! Recebemos seu pedido para '{objetivo}'. "
            f"Com base na sua preferência de horário ({preferencia_horario}), "
            f"tenho o horário {horario_sugerido} disponível. Deseja confirmar?"
        )

        return {
            "prioridade_ia": prioridade,
            "resumo_ia": resumo,
            "resposta_ia": resposta,
        }

    prompt = f"""
Você é um assistente de agendamento.
Analise os dados abaixo e retorne em JSON válido com as chaves:
prioridade_ia, resumo_ia, resposta_ia.

Regras:
- prioridade_ia deve ser: alta, media ou baixa
- resumo_ia deve ser objetivo
- resposta_ia deve ser uma mensagem profissional e amigável, pronta para WhatsApp

Dados:
Nome: {nome}
Objetivo: {objetivo}
Preferência de horário: {preferencia_horario}
Horário sugerido: {horario_sugerido}
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        temperature=0.3,
        messages=[
            {"role": "system", "content": "Você é um assistente comercial de agendamentos."},
            {"role": "user", "content": prompt},
        ],
    )

    content = response.choices[0].message.content or ""

    return {
        "prioridade_ia": "media",
        "resumo_ia": content[:300],
        "resposta_ia": (
            f"Olá, {nome}! Recebemos sua solicitação. "
            f"Tenho o horário {horario_sugerido} disponível. Deseja confirmar?"
        ),
    }