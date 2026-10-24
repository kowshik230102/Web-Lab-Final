# PlayVerse — Online Gaming Portal

A full-stack Web Engineering Lab Final MVP for discovering and playing free HTML5 browser games. It includes a React/Vite/TypeScript/Tailwind frontend and an Express/SQLite API.

## Included

- Responsive home, browsing, category, game detail/player, Premium, information, contact, admin, and 404 pages
- Working search, category filters, sorting, dynamic related games, local playable Snake, Memory Match, and Tic Tac Toe
- SQLite schema (using Node.js built-in `node:sqlite`), seed data, and secured admin CRUD for games and categories
- JWT authentication with bcrypt password hashing; public management endpoints are not exposed
- Honest local-only contact form behavior and clearly marked advertisement/premium placeholders

## Run locally

1. Install Node.js 20+.
2. In the project root run `npm install`, then `npm run install:all`.
3. Optionally copy `backend/.env.example` to `backend/.env` and set a non-default `JWT_SECRET` and admin credentials.
4. Run `npm run dev`.
5. Open `http://localhost:5173`; the API runs on port `3001`.

For a production frontend build, run `npm run build`. For the API, run `npm start --prefix backend`.

## Admin demo

Go to `/admin`. With no `.env`, development credentials are `admin` / `PlayVerseAdmin!2026`. Change these before any non-local deployment.

## Verification summary

- Frontend build: `npm run build`
- API health: `GET /api/health`
- Authentication protection: admin routes require `Authorization: Bearer <token>`

The generated `backend/playverse.db` is persistent local SQLite data and is intentionally excluded from source control.
