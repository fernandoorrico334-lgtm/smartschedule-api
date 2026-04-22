\# SmartSchedule AI



Sistema de agendamento inteligente com IA desenvolvido em Python.



\## Funcionalidades



\- criação de solicitações de agendamento

\- sugestão automática de horários

\- classificação com IA

\- geração de mensagem personalizada

\- confirmação de horário

\- controle completo de status



\## Tecnologias



\- Python

\- FastAPI

\- SQLAlchemy

\- SQLite

\- Pydantic

\- OpenAI (opcional)



\## Fluxo



1\. Cliente envia solicitação de agendamento

2\. Sistema analisa objetivo e preferência

3\. IA classifica prioridade e gera resposta

4\. Sistema sugere um horário disponível

5\. Cliente confirma o horário

6\. Agendamento é salvo no banco



\## Como rodar



```bash

pip install -r requirements.txt

python -m uvicorn app.main:app --reload

