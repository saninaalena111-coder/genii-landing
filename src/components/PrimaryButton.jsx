function PrimaryButton({ children, className = '', size = 'base', fullWidth = false, ...props }) {
  const sizes = {
    base: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type="button"
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-genii-accent text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-genii-accent ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 tracking-wide">{children}</span>
    </button>
  );
}

export default PrimaryButton;
