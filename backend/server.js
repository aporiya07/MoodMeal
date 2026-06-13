const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { getMockPlan } = require('./mockPlan');
const { generatePlan } = require('./gemini');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  })
);
app.use(express.json({ limit: '32kb' }));

function sanitizeInput(body) {
  const mood = ['Busy', 'Normal', 'Relaxed'].includes(body.mood)
    ? body.mood
    : 'Normal';

  const budget = Math.min(Math.max(Number(body.budget) || 0, 0), 100000);
  const people = Math.min(Math.max(Number(body.people) || 1, 1), 20);

  const trim = (value) => (typeof value === 'string' ? value.trim().slice(0, 500) : '');

  const mealType = ['breakfast', 'lunch', 'dinner'].includes(body.mealType)
    ? body.mealType
    : 'breakfast';

  return {
    mood,
    mealType,
    budget,
    people,
    diet: trim(body.diet) || 'vegetarian',
    cookingTime: trim(body.cookingTime) || '1 hour',
    ingredients: trim(body.ingredients),
    allergies: trim(body.allergies),
    cuisinePreference: trim(body.cuisinePreference),
  };
}

app.post('/api/plan', async (req, res) => {
  const input = sanitizeInput(req.body || {});

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const plan = await generatePlan(input, apiKey);
    return res.json(plan);
  } catch (err) {
    console.error('Plan generation failed, using mock:', err.message);
    return res.json(getMockPlan(input));
  }
});

app.listen(PORT, () => {
  console.log(`MoodMeal backend running on http://localhost:${PORT}`);
});
