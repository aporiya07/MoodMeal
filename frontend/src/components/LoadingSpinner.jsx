export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600"
        role="status"
        aria-label="Loading"
      />
      <p className="text-stone-600">MoodMeal is planning your meals...</p>
    </div>
  );
}
