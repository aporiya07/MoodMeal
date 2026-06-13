export default function LoadingSpinner() {
  return (
    <div className="animate-mm-fade-in mt-10 flex flex-col items-center gap-6">
      {/* Dual-ring spinner */}
      <div className="relative h-16 w-16">
        <div
          className="absolute inset-0 rounded-full animate-mm-spin"
          style={{
            border: '3px solid transparent',
            borderTopColor: 'var(--orange)',
            borderRightColor: 'rgba(251,146,60,0.3)',
          }}
        />
        <div
          className="absolute inset-2 rounded-full animate-mm-spin"
          style={{
            border: '2px solid transparent',
            borderBottomColor: 'rgba(251,146,60,0.6)',
            animationDirection: 'reverse',
            animationDuration: '0.7s',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xl">🍳</div>
      </div>

      <div className="text-center">
        <p className="text-base font-semibold text-white">Crafting your meal plan…</p>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          MoodMeal is thinking about your mood &amp; budget
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: 'var(--orange)',
              opacity: 0.3,
              animation: `mm-pulse-ring 1.2s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
