const MEAL_MOCKS = {
  breakfast: {
    dish: 'Masala oats with vegetables',
    description: 'Quick, hearty oats with sautéed onions, tomatoes, and spices.',
    steps: [
      { step: 1, instruction: 'Chop onions, tomatoes, and any available vegetables.' },
      { step: 2, instruction: 'Heat oil in a pan, add cumin and mustard seeds until they splutter.' },
      { step: 3, instruction: 'Sauté onions and vegetables for 3–4 minutes.' },
      { step: 4, instruction: 'Add oats and water/milk, stir in turmeric, salt, and pepper.' },
      { step: 5, instruction: 'Simmer for 5–7 minutes until creamy, garnish with coriander, and serve hot.' },
    ],
  },
  lunch: {
    dish: 'Dal tadka with jeera rice and cucumber raita',
    description: 'Comforting lentil curry with cumin rice and cooling yogurt side.',
    steps: [
      { step: 1, instruction: 'Rinse toor dal and pressure cook with turmeric until soft.' },
      { step: 2, instruction: 'Wash and soak rice for 10 minutes, then cook with cumin seeds.' },
      { step: 3, instruction: 'Prepare tadka: heat ghee, add garlic, dried red chili, and asafoetida.' },
      { step: 4, instruction: 'Pour tadka over cooked dal, simmer 5 minutes, and adjust salt.' },
      { step: 5, instruction: 'Mix grated cucumber into yogurt with salt; serve dal, rice, and raita together.' },
    ],
  },
  dinner: {
    dish: 'Paneer bhurji with roti and green salad',
    description: 'Scrambled paneer with spices, fresh roti, and a simple salad.',
    steps: [
      { step: 1, instruction: 'Knead whole wheat dough and set aside to rest for 15 minutes.' },
      { step: 2, instruction: 'Dice onions, tomatoes, and green chilies; crumble paneer.' },
      { step: 3, instruction: 'Heat oil, sauté onions and chilies until golden, add tomatoes and spices.' },
      { step: 4, instruction: 'Add crumbled paneer, cook 5–6 minutes, and finish with coriander.' },
      { step: 5, instruction: 'Roll and cook rotis on a hot tawa; toss salad and serve with paneer bhurji.' },
    ],
  },
};

function getMockPlan(input = {}) {
  const mood = input.mood || 'Normal';
  const budget = Number(input.budget) || 500;
  const people = Number(input.people) || 2;
  const mealType = ['breakfast', 'lunch', 'dinner'].includes(input.mealType)
    ? input.mealType
    : 'breakfast';
  const meal = MEAL_MOCKS[mealType];

  return {
    mealPlan: {
      meal: mealType,
      dish: `${meal.dish} — ${mood.toLowerCase()}-day option for ${people}`,
      description: meal.description,
    },
    groceryList: {
      produce: ['onions', 'tomatoes', 'cucumber', 'green chilies', 'coriander'],
      pantry: ['oats', 'toor dal', 'rice', 'wheat flour', 'spices'],
      dairy: ['paneer', 'yogurt', 'milk'],
      other: ['cooking oil', 'ghee'],
    },
    substitutions: [
      {
        original: 'paneer',
        substitute: 'tofu or extra lentils',
        reason: 'Budget-friendly protein swap if paneer prices are high',
      },
    ],
    budgetAnalysis: {
      estimatedTotal: Math.min(budget, 420),
      withinBudget: 420 <= budget,
      notes: `Sample ${mealType} plan for a ${mood.toLowerCase()} day. Estimated cost for ${people} people in INR.`,
    },
    todoList: meal.steps,
    _fallback: true,
  };
}

module.exports = { getMockPlan };
