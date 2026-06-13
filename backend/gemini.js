const { GoogleGenerativeAI } = require('@google/generative-ai');

function parseGeminiJson(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  return JSON.parse(cleaned);
}

function validatePlan(plan) {
  const required = [
    'mealPlan',
    'groceryList',
    'substitutions',
    'budgetAnalysis',
    'todoList',
  ];
  for (const key of required) {
    if (!(key in plan)) {
      throw new Error(`Missing key: ${key}`);
    }
  }
  if (!plan.mealPlan?.meal || !plan.mealPlan?.dish) {
    throw new Error('Invalid mealPlan shape');
  }
  if (!Array.isArray(plan.todoList) || plan.todoList.length === 0) {
    throw new Error('Invalid todoList shape');
  }
  for (const item of plan.todoList) {
    if (item.step == null || !item.instruction) {
      throw new Error('Invalid todoList item — expected step and instruction');
    }
  }
  return plan;
}

function buildPrompt(input) {
  const mealLabel = input.mealType.charAt(0).toUpperCase() + input.mealType.slice(1);

  return `You are MoodMeal, an AI cooking planner. Create a structured meal plan for ONE meal only: ${mealLabel}.

User inputs:
- Selected meal: ${mealLabel}
- Today's Mood: ${input.mood}
- Budget (INR): ${input.budget}
- Number of people: ${input.people}
- Diet: ${input.diet}
- Available cooking time: ${input.cookingTime}
- Ingredients on hand: ${input.ingredients || 'none specified'}
- Allergies: ${input.allergies || 'none'}
- Cuisine preference: ${input.cuisinePreference || 'any'}

Plan ONLY for ${mealLabel}. Do not include breakfast, lunch, or dinner outside the selected meal.
Consider the user's mood as context when suggesting meal complexity. Factor mood into your recommendations — no separate logic per mood.

For the cooking to-do list, provide clear numbered prep/cook steps in chronological order. Do NOT use clock times (no "07:00 AM" or "7:30 PM"). Each step should be one focused action.

Respond ONLY with valid JSON, no markdown formatting, no extra text, in this exact shape:
{
  "mealPlan": { "meal": "${input.mealType}", "dish": "...", "description": "..." },
  "groceryList": { "produce": [...], "pantry": [...], "dairy": [...], "other": [...] },
  "substitutions": [ { "original": "...", "substitute": "...", "reason": "..." } ],
  "budgetAnalysis": { "estimatedTotal": number, "withinBudget": boolean, "notes": "..." },
  "todoList": [ { "step": 1, "instruction": "..." }, { "step": 2, "instruction": "..." } ]
}`;
}

const MODEL_FALLBACKS = [
  'gemini-3.5-flash',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
];

function isQuotaError(err) {
  const msg = (err?.message || '').toLowerCase();
  const status = err?.status || err?.code;
  return (
    status === 429 ||
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('resource exhausted')
  );
}

async function generatePlan(input, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = buildPrompt(input);
  let lastError;

  for (let i = 0; i < MODEL_FALLBACKS.length; i++) {
    const modelName = MODEL_FALLBACKS[i];
    try {
      console.log(`[gemini] Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const plan = parseGeminiJson(text);
      return validatePlan(plan);
    } catch (err) {
      if (isQuotaError(err) && i < MODEL_FALLBACKS.length - 1) {
        console.warn(`[gemini] ${modelName} returned quota error — falling back to next model.`);
        await new Promise((r) => setTimeout(r, 500));
        lastError = err;
        continue;
      }
      throw err;
    }
  }

  throw lastError;
}

module.exports = { generatePlan, parseGeminiJson, validatePlan };
