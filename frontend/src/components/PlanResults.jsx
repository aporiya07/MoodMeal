function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function GroceryCategory({ label, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <h3 className="mb-1 text-sm font-medium capitalize text-stone-700">{label}</h3>
      <ul className="list-inside list-disc text-sm text-stone-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function normalizeSteps(todoList) {
  if (!todoList?.length) return [];

  return [...todoList]
    .map((item, index) => ({
      step: item.step ?? index + 1,
      instruction: item.instruction || item.task || '',
    }))
    .sort((a, b) => a.step - b.step);
}

const MEAL_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
};

export default function PlanResults({ plan }) {
  const steps = normalizeSteps(plan.todoList);
  const mealLabel = MEAL_LABELS[plan.mealPlan?.meal] || 'Meal';

  return (
    <div className="space-y-4">
      {plan._fallback && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          Showing sample plan (AI unavailable)
        </p>
      )}

      <Section title="🍳 Meal Plan">
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="font-medium">{mealLabel}</dt>
            <dd className="font-medium text-stone-800">{plan.mealPlan.dish}</dd>
            {plan.mealPlan.description && (
              <dd className="mt-1 text-stone-600">{plan.mealPlan.description}</dd>
            )}
          </div>
        </dl>
      </Section>

      <Section title="🛒 Grocery List">
        <div className="grid gap-4 sm:grid-cols-2">
          <GroceryCategory label="produce" items={plan.groceryList.produce} />
          <GroceryCategory label="pantry" items={plan.groceryList.pantry} />
          <GroceryCategory label="dairy" items={plan.groceryList.dairy} />
          <GroceryCategory label="other" items={plan.groceryList.other} />
        </div>
      </Section>

      <Section title="🔄 Substitutions">
        {plan.substitutions?.length ? (
          <ul className="space-y-3 text-sm">
            {plan.substitutions.map((sub, index) => (
              <li key={index} className="rounded-lg bg-stone-50 p-3">
                <p>
                  <span className="font-medium">{sub.original}</span>
                  {' → '}
                  <span className="font-medium">{sub.substitute}</span>
                </p>
                <p className="mt-1 text-stone-600">{sub.reason}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-stone-500">No substitutions suggested.</p>
        )}
      </Section>

      <Section title="💰 Budget Analysis">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-lg font-semibold">
            ₹{plan.budgetAnalysis.estimatedTotal}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${plan.budgetAnalysis.withinBudget
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
              }`}
          >
            {plan.budgetAnalysis.withinBudget ? 'Within budget' : 'Over budget'}
          </span>
        </div>
        <p className="mt-2 text-sm text-stone-600">{plan.budgetAnalysis.notes}</p>
      </Section>

      <Section title="✅ Cooking To-Do List">
        <ol className="space-y-3 text-sm">
          {steps.map((item) => (
            <li key={item.step} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-700">
                {item.step}
              </span>
              <span className="pt-0.5">{item.instruction}</span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
