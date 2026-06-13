import { useState } from 'react';

const MOODS = [
  { value: 'Busy', emoji: '🏃', label: 'Busy' },
  { value: 'Normal', emoji: '😊', label: 'Normal' },
  { value: 'Relaxed', emoji: '😌', label: 'Relaxed' },
];

const MEAL_TYPES = [
  { value: 'breakfast', emoji: '🌅', label: 'Breakfast' },
  { value: 'lunch', emoji: '☀️', label: 'Lunch' },
  { value: 'dinner', emoji: '🌙', label: 'Dinner' },
];

const COOKING_TIMES = [
  '15 minutes',
  '30 minutes',
  '45 minutes',
  '1 hour',
  '90 minutes',
];

const DIETS = ['Any', 'Vegetarian', 'Vegan', 'Non-Vegetarian', 'Keto', 'Jain'];

export default function MealPlanForm({ onSubmit, disabled }) {
  const [mood, setMood] = useState('Normal');
  const [mealType, setMealType] = useState('breakfast');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    onSubmit({
      mood,
      mealType,
      budget: form.budget.value,
      people: form.people.value,
      diet: form.diet.value,
      cookingTime: form.cookingTime.value,
      ingredients: form.ingredients.value,
      allergies: form.allergies.value,
      cuisinePreference: form.cuisinePreference.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mm-card space-y-6 p-6"
      aria-label="Meal plan form"
    >
      {/* ── Mood ── */}
      <fieldset>
        <legend className="mm-label w-full">Today's Mood</legend>
        <div className="grid grid-cols-3 gap-2">
          {MOODS.map((m) => (
            <button
              key={m.value}
              type="button"
              disabled={disabled}
              onClick={() => setMood(m.value)}
              className={`mood-pill ${mood === m.value ? 'active' : ''}`}
            >
              <span className="mood-emoji">{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── Meal Type ── */}
      <fieldset>
        <legend className="mm-label w-full">Which Meal?</legend>
        <div className="grid grid-cols-3 gap-2">
          {MEAL_TYPES.map((mt) => (
            <button
              key={mt.value}
              type="button"
              disabled={disabled}
              onClick={() => setMealType(mt.value)}
              className={`mood-pill ${mealType === mt.value ? 'active' : ''}`}
            >
              <span className="mood-emoji">{mt.emoji}</span>
              {mt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mm-divider" />

      {/* ── Budget + People ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mm-label">Budget (INR ₹)</label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold"
              style={{ color: 'var(--orange)' }}
            >₹</span>
            <input
              id="budget"
              name="budget"
              type="number"
              min="0"
              placeholder="500"
              disabled={disabled}
              className="mm-input pl-8"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="people" className="mm-label">Number of People</label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >👥</span>
            <input
              id="people"
              name="people"
              type="number"
              min="1"
              placeholder="2"
              disabled={disabled}
              className="mm-input pl-9"
              required
            />
          </div>
        </div>
      </div>

      {/* ── Diet + Cooking Time ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diet" className="mm-label">Diet Type</label>
          <select
            id="diet"
            name="diet"
            defaultValue="Any"
            disabled={disabled}
            className="mm-input"
            required
          >
            {DIETS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cookingTime" className="mm-label">Cooking Time</label>
          <select
            id="cookingTime"
            name="cookingTime"
            defaultValue="30 minutes"
            disabled={disabled}
            className="mm-input"
            required
          >
            {COOKING_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Ingredients ── */}
      <div>
        <label htmlFor="ingredients" className="mm-label">
          Ingredients on Hand
          <span className="ml-1 normal-case" style={{ color: 'var(--text-secondary)' }}>(optional)</span>
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          rows={3}
          placeholder="rice, lentils, onions, tomatoes..."
          disabled={disabled}
          className="mm-input resize-none"
        />
      </div>

      {/* ── Allergies + Cuisine ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="allergies" className="mm-label">
            Allergies
            <span className="ml-1 normal-case" style={{ color: 'var(--text-secondary)' }}>(optional)</span>
          </label>
          <input
            id="allergies"
            name="allergies"
            type="text"
            placeholder="e.g. peanuts, gluten"
            disabled={disabled}
            className="mm-input"
          />
        </div>
        <div>
          <label htmlFor="cuisinePreference" className="mm-label">
            Cuisine Preference
            <span className="ml-1 normal-case" style={{ color: 'var(--text-secondary)' }}>(optional)</span>
          </label>
          <input
            id="cuisinePreference"
            name="cuisinePreference"
            type="text"
            placeholder="e.g. South Indian"
            disabled={disabled}
            className="mm-input"
          />
        </div>
      </div>

      {/* ── Submit ── */}
      <button type="submit" disabled={disabled} className="mm-btn">
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-mm-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Planning your meal…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            ✨ Plan My Meal
          </span>
        )}
      </button>
    </form>
  );
}
