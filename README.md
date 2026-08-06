# PocketCover

PocketCover is a modern parametric micro-insurance platform providing instant payouts. 
Phase 1 focuses on building a solid enterprise engineering foundation.

## Tech Stack
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, Feature-Sliced Design.
- **Backend**: FastAPI, Python 3.13, SQLAlchemy 2, Alembic, PostgreSQL (Supabase ready).

## Quick Start
See `docs/ARCHITECTURE.md` for full context.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
# activate venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```
