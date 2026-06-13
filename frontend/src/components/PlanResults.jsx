/* ────────────────────────────────
   PlanResults — premium dark UI
   ──────────────────────────────── */

const MEAL_LABELS = {
  breakfast: { label: 'Breakfast', emoji: '🌅' },
  lunch:     { label: 'Lunch',     emoji: '☀️' },
  dinner:    { label: 'Dinner',    emoji: '🌙' },
};

const GROCERY_ICONS = {
  produce: '🥦',
  pantry:  '🥫',
  dairy:   '🥛',
  other:   '🛍️',
};

/* ── Sub-components ── */

function ResultSection({ icon, title, children, className = '' }) {
  return (
    <section className={`mm-card mm-result-section p-5 ${className}`}>
      <div className="mm-section-title">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

function GroceryCategory({ category, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        {GROCERY_ICONS[category] || '📦'} {category}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="grocery-tag">{item}</span>
        ))}
      </div>
    </div>
  );
}

function normalizeSteps(todoList) {
  if (!todoList?.length) return [];
  return [...todoList]
    .map((item, index) => ({
      step: item.step ?? index + 1,
      instruction: item.instruction || item.task || '',
      time: item.time || null,
    }))
    .sort((a, b) => a.step - b.step);
}

/* ── Main Component ── */

export default function PlanResults({ plan, onReset }) {
  const steps = normalizeSteps(plan.todoList);
  const mealKey   = plan.mealPlan?.meal || 'breakfast';
  const mealMeta  = MEAL_LABELS[mealKey] || { label: 'Meal', emoji: '🍽️' };
  const { withinBudget, estimatedTotal, notes } = plan.budgetAnalysis || {};

  return (
    <div className="space-y-4">
      {/* Fallback notice */}
      {plan._fallback && (
        <div className="mm-badge mm-badge-amber animate-mm-fade-in flex items-center gap-2 rounded-xl px-4 py-3 text-sm">
          ⚠️ Showing a sample plan — AI is temporarily unavailable
        </div>
      )}

      {/* ── Meal Plan ── */}
      <ResultSection icon="🍳" title="Meal Plan">
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.18)' }}
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="text-lg">{mealMeta.emoji}</span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--orange)' }}>
              {mealMeta.label}
            </span>
          </div>
          <p className="text-xl font-bold text-white">{plan.mealPlan?.dish}</p>
          {plan.mealPlan?.description && (
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {plan.mealPlan.description}
            </p>
          )}
        </div>
      </ResultSection>

      {/* ── Budget ── */}
      <ResultSection icon="💰" title="Budget Analysis">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl font-extrabold text-white">₹{estimatedTotal}</span>
          <span className={`mm-badge ${withinBudget ? 'mm-badge-green' : 'mm-badge-red'}`}>
            {withinBudget ? '✓ Within budget' : '✗ Over budget'}
          </span>
        </div>
        {notes && (
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {notes}
          </p>
        )}
      </ResultSection>

      {/* ── Grocery List ── */}
      <ResultSection icon="🛒" title="Grocery List">
        <div className="space-y-4">
          {['produce', 'pantry', 'dairy', 'other'].map((cat) => (
            <GroceryCategory key={cat} category={cat} items={plan.groceryList?.[cat]} />
          ))}
        </div>
      </ResultSection>

      {/* ── Substitutions ── */}
      {plan.substitutions?.length > 0 && (
        <ResultSection icon="🔄" title="Smart Substitutions">
          <div className="space-y-3">
            {plan.substitutions.map((sub, i) => (
              <div
                key={i}
                className="rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}
              >
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  <span className="text-white">{sub.original}</span>
                  <span style={{ color: 'var(--orange)' }}>→</span>
                  <span className="text-white">{sub.substitute}</span>
                </div>
                {sub.reason && (
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {sub.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResultSection>
      )}

      {/* ── To-Do / Steps ── */}
      {steps.length > 0 && (
        <ResultSection icon="✅" title="Cooking Steps">
          <ol className="space-y-3">
            {steps.map((item) => (
              <li key={item.step} className="flex gap-3">
                <span className="step-circle shrink-0">{item.step}</span>
                <div className="pt-0.5">
                  {item.time && (
                    <span
                      className="mb-0.5 block text-xs font-semibold"
                      style={{ color: 'var(--orange)' }}
                    >
                      {item.time}
                    </span>
                  )}
                  <span className="text-sm leading-relaxed text-white">{item.instruction}</span>
                </div>
              </li>
            ))}
          </ol>
        </ResultSection>
      )}

      {/* ── Plan Again CTA ── */}
      <button
        onClick={onReset}
        className="mm-btn"
        style={{ marginTop: '0.5rem' }}
      >
        🔁 Plan Another Meal
      </button>
    </div>
  );
}
