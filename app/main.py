from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config import settings
from app.database import Base, engine, get_db
from app.models import Appointment
from app.schemas import AppointmentConfirm, AppointmentCreate, AppointmentResponse
from app.services import confirm_appointment, create_appointment, get_available_slots

# Cria as tabelas no banco
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# CORS liberado para desenvolvimento e integração com seu front
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://smartschedule-site.vercel.app",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def healthcheck():
    return {
        "status": "ok",
        "service": settings.APP_NAME,
        "message": "API online e funcionando",
    }


@app.get("/slots")
def list_slots(db: Session = Depends(get_db)):
    return {"available_slots": get_available_slots(db)}


@app.post("/appointments", response_model=AppointmentResponse, status_code=201)
def create_appointment_endpoint(
    payload: AppointmentCreate,
    db: Session = Depends(get_db),
):
    appointment = create_appointment(
        db=db,
        nome=payload.nome,
        whatsapp=payload.whatsapp,
        objetivo=payload.objetivo,
        preferencia_horario=payload.preferencia_horario,
    )
    return appointment


@app.get("/appointments", response_model=list[AppointmentResponse])
def list_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).order_by(Appointment.id.desc()).all()


@app.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    return appointment


@app.put("/appointments/{appointment_id}/confirm", response_model=AppointmentResponse)
def confirm_appointment_endpoint(
    appointment_id: int,
    payload: AppointmentConfirm,
    db: Session = Depends(get_db),
):
    appointment = confirm_appointment(
        db=db,
        appointment_id=appointment_id,
        horario_confirmado=payload.horario_confirmado,
    )

    if not appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")

    return appointment