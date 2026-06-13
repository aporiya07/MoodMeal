const initialForm = {
  mood: 'Normal',
  mealType: 'breakfast',
  budget: '',
  people: '',
  diet: '',
  cookingTime: '',
  ingredients: '',
  allergies: '',
  cuisinePreference: '',
};

export default function MealPlanForm({ onSubmit, disabled }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    onSubmit({
      mood: form.mood.value,
      mealType: form.mealType.value,
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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mood" className="mb-1 block text-sm font-medium">
            Today&apos;s Mood
          </label>
          <select
            id="mood"
            name="mood"
            defaultValue={initialForm.mood}
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
            required
          >
            <option value="Busy">Busy</option>
            <option value="Normal">Normal</option>
            <option value="Relaxed">Relaxed</option>
          </select>
        </div>
        <div>
          <label htmlFor="mealType" className="mb-1 block text-sm font-medium">
            Meal to plan
          </label>
          <select
            id="mealType"
            name="mealType"
            defaultValue={initialForm.mealType}
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
            required
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-1 block text-sm font-medium">
            Budget (INR)
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            placeholder="500"
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="people" className="mb-1 block text-sm font-medium">
            Number of people
          </label>
          <input
            id="people"
            name="people"
            type="number"
            min="1"
            placeholder="2"
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="diet" className="mb-1 block text-sm font-medium">
          Diet
        </label>
        <input
          id="diet"
          name="diet"
          type="text"
          placeholder="e.g. vegetarian"
          disabled={disabled}
          className="w-full rounded-lg border border-stone-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="cookingTime" className="mb-1 block text-sm font-medium">
          Available cooking time
        </label>
        <input
          id="cookingTime"
          name="cookingTime"
          type="text"
          placeholder="e.g. 45 minutes"
          disabled={disabled}
          className="w-full rounded-lg border border-stone-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="ingredients" className="mb-1 block text-sm font-medium">
          Ingredients on hand <span className="text-stone-400">(optional)</span>
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          rows={3}
          placeholder="rice, lentils, onions..."
          disabled={disabled}
          className="w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="allergies" className="mb-1 block text-sm font-medium">
            Allergies <span className="text-stone-400">(optional)</span>
          </label>
          <input
            id="allergies"
            name="allergies"
            type="text"
            placeholder="e.g. peanuts"
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="cuisinePreference" className="mb-1 block text-sm font-medium">
            Cuisine preference <span className="text-stone-400">(optional)</span>
          </label>
          <input
            id="cuisinePreference"
            name="cuisinePreference"
            type="text"
            placeholder="e.g. South Indian"
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-orange-600 px-4 py-2.5 font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Plan my meal
      </button>
    </form>
  );
}
