# PocketCover Architecture & Conventions

## 1. Overview
PocketCover is an enterprise-grade parametric micro-insurance platform. This documentation details the architectural decisions, folder structure, design system usage, and development workflow established during Phase 1.

## 2. Frontend Architecture (Feature-Sliced Design)

The React 19 frontend follows Feature-Sliced Design (FSD) for scalable domain boundaries:
- `app/`: Global settings, providers, router configuration, and global styles (`index.css`).
- `processes/`: Complex business logic spanning multiple features/pages (future use).
- `pages/`: Route-level composition components.
- `widgets/`: Compositional UI blocks (e.g., Header, DashboardShell).
- `features/`: Discrete units of user value (e.g., BuyInsurance, ConnectWallet).
- `entities/`: Business domain logic and state (e.g., Policy, User).
- `shared/`: Highly reusable, context-agnostic modules (UI components, generic API clients, design tokens).

**Conventions:**
- Use TanStack Router for type-safe routing.
- Use TanStack Query for remote state.
- Use Zustand for global UI state.
- React Aria is the base layer for accessible components.
- Strict TypeScript mode is enabled; never use `any`.

## 3. Backend Architecture (Enterprise FastAPI)

The Python 3.13 backend uses a modular, layered architecture:
- `api/`: API routing and controllers (FastAPI routers).
- `core/`: Application config, security, and global dependencies.
- `db/`: SQLAlchemy setup and base declarative models.
- `models/`: SQLAlchemy ORM models.
- `schemas/`: Pydantic V2 models for request validation and serialization.
- `services/`: Business logic layer.
- `repositories/`: Data access layer (CRUD operations isolating DB from logic).
- `dependencies/`: FastAPI injectables (Auth, Session).
- `background/`: Celery/background task definitions (future use).

**Conventions:**
- AsyncPG driver is strictly used for non-blocking DB access.
- Supabase PostgreSQL is the target deployment.
- Strict type hinting using `mypy`/`pyright` patterns.
- `ruff` used for formatting and linting.

## 4. Design System (Tailwind CSS v4)

We extracted the Material Design 3 semantic token system from the original prototype.
- **Tokens** are declared in `frontend/src/app/index.css` via the `@theme` directive.
- Avoid using arbitrary values in classes (e.g., `text-[#123]`); always extend the theme if a color is missing.
- Global spacing (`--spacing-gutter`, `--spacing-section-padding`) should be used for layout consistency.

## 5. Development Workflow

1. **Linting & Formatting**: Husky ensures `lint-staged` runs Prettier (frontend), oxlint (frontend), and Ruff (backend) prior to commit.
2. **Path Aliasing**: Use `@/` to import from the frontend `src/` directory.

### Getting Started
**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
python -m venv .venv
# Activate venv
pip install -r requirements.txt # (assuming frozen)
uvicorn app.main:app --reload
```
