function PrimaryButton({ children, className = '', size = 'base', fullWidth = false, ...props }) {
  const sizes = {
    base: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type="button"
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-genii-accent text-white
        shadow-[0_0_28px_rgba(123,23,35,0.40),0_4px_20px_rgba(0,0,0,0.35)]
        transition-all duration-300 ease-out
        hover:-translate-y-[3px]
        hover:shadow-[0_0_52px_rgba(155,30,45,0.65),0_0_22px_rgba(123,23,35,0.40),0_10px_32px_rgba(0,0,0,0.45)]
        hover:brightness-[1.10]
        hover:border-white/28
        active:translate-y-0 active:scale-[0.975] active:brightness-100
        active:shadow-[0_0_30px_rgba(123,23,35,0.45),0_4px_16px_rgba(0,0,0,0.35)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-genii-accent
        ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Resting inner shimmer */}
      <span className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-0" />
      {/* Hover bloom — sweeps in from top-left */}
      <span className="absolute inset-0 translate-x-[-105%] bg-gradient-to-r from-white/[0.18] via-white/[0.08] to-transparent transition-transform duration-[380ms] ease-out group-hover:translate-x-0" />
      {/* Persistent outer glow ring on hover */}
      <span className="pointer-events-none absolute -inset-[3px] rounded-full opacity-0 ring-1 ring-genii-accent/60 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 font-semibold tracking-wide">{children}</span>
    </button>
  );
}

export default PrimaryButton;
