function GlassCard({ children, className = '', variant = 'glass' }) {
  const variantClass = variant === 'muted' ? 'surface-muted' : 'glass-panel';
  return (
    <div className={`${variantClass} relative p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

export default GlassCard;
