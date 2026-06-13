# MoodMeal — AI cooking planner

Structured daily meal planning based on your mood, budget, diet, and ingredients on hand.

## Prerequisites

- Node.js 18+

## Environment setup

Create a `.env` file in the `Warm-Up-Challenge` folder (or copy from `example.env`):

```
GEMINI_API_KEY=your_api_key_here
```

The backend loads this via `dotenv` — the key is never exposed to the frontend.

## Install & run

Open two terminals:

**Backend** (port 3001):

```bash
cd Warm-Up-Challenge/backend
npm install
npm run dev
```

**Frontend** (port 5173):

```bash
cd Warm-Up-Challenge/frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How it works

1. Fill in mood, budget, people, diet, cooking time, and optional fields.
2. Frontend sends a `POST /api/plan` request to the Express backend.
3. Backend calls Gemini (`gemini-2.0-flash`) with all inputs in one prompt.
4. Response is parsed as JSON and rendered in five sections: meal plan, grocery list, substitutions, budget analysis, and cooking to-do list.
5. If the AI call or JSON parsing fails, a hardcoded mock plan is returned so the UI never breaks.

## Manual test checklist

- [ ] Form validates required fields
- [ ] Loading spinner appears on submit
- [ ] All five result sections render after submit
- [ ] Backend returns valid JSON (AI or fallback mock)
- [ ] Fallback banner shows when `_fallback: true`

## Hackathon submission blurb

MoodMeal is an AI cooking planner that builds structured daily meal plans based on your mood, budget, diet, and ingredients on hand.
