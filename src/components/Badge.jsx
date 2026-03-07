function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-genii-light shadow-edge ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
