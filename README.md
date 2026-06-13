# MoodMeal — AI cooking planner

Structured meal planning based on your mood, budget, diet, and ingredients on hand.

## Repo size

**Only source code is pushed (~50 KB).** Do not commit `node_modules/` or `dist/` — they are gitignored. Run `npm install` locally after cloning.

## Prerequisites

- Node.js 18+

## Environment setup

Copy `example.env` to `.env` in this folder:

```
GEMINI_API_KEY=your_api_key_here
```

The API key stays server-side only.

## Local development

```bash
# Install dependencies (one-time)
npm run install:all

# Terminal 1 — backend (port 3001)
npm run dev:backend

# Terminal 2 — frontend (port 5173)
npm run dev:frontend
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Render (free)

1. Push this repo to [GitHub](https://github.com/aporiya07/MoodMeal)
2. Go to [render.com](https://render.com) → **New +** → **Blueprint**
3. Connect the `MoodMeal` repo — Render reads `render.yaml` automatically
4. Set **GEMINI_API_KEY** in the Render dashboard environment variables
5. Deploy — you get a single URL serving both frontend and API

Or manually: **New Web Service** → connect repo → build command:

```bash
npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend
```

Start command:

```bash
NODE_ENV=production node backend/server.js
```

## How it works

1. Pick a meal (breakfast / lunch / dinner), mood, budget, and preferences.
2. Frontend calls `POST /api/plan`.
3. Backend calls Gemini with all inputs in one prompt.
4. Results show meal plan, grocery list, substitutions, budget analysis, and numbered cooking steps.
5. If AI fails, a mock plan is returned so the UI never breaks.

## Hackathon submission blurb

MoodMeal is an AI cooking planner that builds structured daily meal plans based on your mood, budget, diet, and ingredients on hand.
