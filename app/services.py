from __future__ import annotations

from sqlalchemy.orm import Session

from app.ai_service import qualify_appointment
from app.models import Appointment

AVAILABLE_SLOTS = [
    "09:00",
    "10:30",
    "14:00",
    "15:30",
    "17:00",
]


def get_taken_slots(db: Session) -> list[str]:
    rows = (
        db.query(Appointment.horario_confirmado)
        .filter(Appointment.horario_confirmado.isnot(None))
        .all()
    )
    return [row[0] for row in rows if row[0]]


def get_available_slots(db: Session) -> list[str]:
    taken = set(get_taken_slots(db))
    return [slot for slot in AVAILABLE_SLOTS if slot not in taken]


def choose_best_slot(preferencia_horario: str, available_slots: list[str]) -> str | None:
    if not available_slots:
        return None

    preferencia = preferencia_horario.lower()

    morning_slots = ["09:00", "10:30"]
    afternoon_slots = ["14:00", "15:30", "17:00"]

    if "manhã" in preferencia or "manha" in preferencia:
        for slot in morning_slots:
            if slot in available_slots:
                return slot

    if "tarde" in preferencia:
        for slot in afternoon_slots:
            if slot in available_slots:
                return slot

    if "qualquer" in preferencia or "indiferente" in preferencia:
        return available_slots[0]

    return available_slots[0]


def create_appointment(
    db: Session,
    nome: str,
    whatsapp: str,
    objetivo: str,
    preferencia_horario: str,
) -> Appointment:
    available_slots = get_available_slots(db)
    best_slot = choose_best_slot(preferencia_horario, available_slots)

    appointment = Appointment(
        nome=nome,
        whatsapp=whatsapp,
        objetivo=objetivo,
        preferencia_horario=preferencia_horario,
        status="qualificado",
        horario_sugerido=best_slot,
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    ai_result = qualify_appointment(
        nome=nome,
        objetivo=objetivo,
        preferencia_horario=preferencia_horario,
        horario_sugerido=best_slot or "sem horário disponível no momento",
    )

    appointment.prioridade_ia = ai_result["prioridade_ia"]
    appointment.resumo_ia = ai_result["resumo_ia"]
    appointment.resposta_ia = ai_result["resposta_ia"]
    appointment.status = "horario_sugerido" if best_slot else "sem_horario"
    appointment.observacao = (
        "Horário sugerido com sucesso."
        if best_slot
        else "Nenhum horário disponível no momento."
    )

    db.commit()
    db.refresh(appointment)

    return appointment


def confirm_appointment(db: Session, appointment_id: int, horario_confirmado: str) -> Appointment | None:
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        return None

    # Se já estiver confirmado no mesmo horário, apenas retorna sem erro
    if appointment.horario_confirmado == horario_confirmado:
        appointment.observacao = f"Agendamento já estava confirmado para {horario_confirmado}."
        db.commit()
        db.refresh(appointment)
        return appointment

    # Busca horários confirmados por OUTROS agendamentos
    taken_slots = (
        db.query(Appointment.horario_confirmado)
        .filter(
            Appointment.horario_confirmado.isnot(None),
            Appointment.id != appointment_id
        )
        .all()
    )
    taken_slots = [row[0] for row in taken_slots if row[0]]

    if horario_confirmado in taken_slots:
        appointment.observacao = "Horário indisponível ou já reservado."
        db.commit()
        db.refresh(appointment)
        return appointment

    appointment.horario_confirmado = horario_confirmado
    appointment.status = "agendado"
    appointment.observacao = f"Agendamento confirmado para {horario_confirmado}."

    db.commit()
    db.refresh(appointment)

    return appointment