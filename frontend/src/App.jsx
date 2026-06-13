import { useState } from 'react';
import { fetchPlan } from './api';
import MealPlanForm from './components/MealPlanForm';
import LoadingSpinner from './components/LoadingSpinner';
import PlanResults from './components/PlanResults';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setStatus('loading');
    setError('');
    setPlan(null);

    try {
      const result = await fetchPlan(formData);
      setPlan(result);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setPlan(null);
    setError('');
  };

  return (
    <>
      {/* Animated gradient background */}
      <div className="mm-bg" />

      <div className="mx-auto min-h-screen max-w-2xl px-4 py-10 pb-20">
        {/* ── Header ── */}
        <header className="mb-10 text-center">
          <div className="animate-mm-float mb-4 inline-block text-5xl">🍽️</div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Mood<span style={{ color: 'var(--orange)' }}>Meal</span>
          </h1>
          <p className="mt-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            AI-powered meal plans tailored to your mood, budget &amp; pantry
          </p>
        </header>

        {/* ── Form ── */}
        <MealPlanForm onSubmit={handleSubmit} disabled={status === 'loading'} />

        {/* ── Loading ── */}
        {status === 'loading' && <LoadingSpinner />}

        {/* ── Error ── */}
        {status === 'error' && (
          <div className="mm-card animate-mm-fade-in mt-6 px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-red-400">Something went wrong</p>
                <p className="mt-0.5 text-sm" style={{ color: 'var(--text-secondary)' }}>{error}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-3 text-xs font-semibold underline"
              style={{ color: 'var(--orange)' }}
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Results ── */}
        {status === 'success' && plan && (
          <div className="mt-8">
            <PlanResults plan={plan} onReset={handleReset} />
          </div>
        )}
      </div>
    </>
  );
}
