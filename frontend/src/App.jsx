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

    try {
      const result = await fetchPlan(formData);
      setPlan(result);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-orange-700">MoodMeal</h1>
        <p className="mt-1 text-stone-600">AI cooking planner</p>
      </header>

      {status === 'idle' && (
        <p className="mb-6 rounded-lg border border-dashed border-stone-300 bg-white px-4 py-6 text-center text-stone-600">
          Tell MoodMeal about your day and mood to get a personalized meal plan
        </p>
      )}

      <MealPlanForm onSubmit={handleSubmit} disabled={status === 'loading'} />

      {status === 'loading' && <LoadingSpinner />}

      {status === 'error' && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {status === 'success' && plan && (
        <div className="mt-8">
          <PlanResults plan={plan} />
        </div>
      )}
    </div>
  );
}
