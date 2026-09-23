# FarmerPocket

FarmerPocket is a modern, parametric micro-insurance platform designed to provide instant, weather-triggered payouts for farmers. By combining a reliable backend architecture with a dynamic, user-friendly frontend, FarmerPocket ensures that farmers get seamless access to financial protection without bureaucratic delays.

## Features & Architecture

- **Parametric Micro-Insurance**: Smart engine evaluates weather conditions against policy stages to trigger automatic payouts.
- **Secure Authentication**: Integrated Firebase Auth synced securely with the Postgres backend.
- **Wallet & Payouts**: Real-time wallet tracking and Razorpay payment integration for fast top-ups and claim settlements.
- **Dynamic Frontend**: A highly responsive, feature-sliced UI tailored for farm and policy management.

## Tech Stack

### Frontend
- **Framework:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS v4
- **Architecture:** Feature-Sliced Design
- **State/Data:** TanStack Query & Router

### Backend
- **Framework:** FastAPI (Python 3.13)
- **Database:** PostgreSQL (managed with SQLAlchemy 2 & Alembic)
- **Integrations:** Firebase Admin SDK (Auth & Storage), Razorpay API

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.11+
- PostgreSQL
- Firebase Project setup
- Razorpay API credentials

### Backend Setup

\\\ash
cd backend
python -m venv .venv
# Activate the virtual environment
# Windows: .venv\Scripts\activate
# Unix: source .venv/bin/activate
pip install -r requirements.txt

# Run migrations (ensure database URL is set in .env)
alembic upgrade head

# Start the dev server
uvicorn app.main:app --reload
\\\

### Frontend Setup

\\\ash
cd frontend
npm install

# Start the dev server
npm run dev
\\\

## Deployment & Security

- Ensure .env files are fully populated according to the .env.example configurations.
- Use secure, properly restricted Firebase Admin SDK credentials.
- In production, set \CORS_ORIGINS\ explicitly in the backend.

