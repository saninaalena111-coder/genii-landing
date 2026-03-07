function GlassCard({ children, className = '' }) {
  return (
    <div className={`glass-panel relative p-6 shadow-card sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

export default GlassCard;
