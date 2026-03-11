import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionWrapper({ id, label, title, subtitle, children, className = '', style }) {
  return (
  <section id={id} className={`relative py-16 sm:py-20 lg:py-24 xl:py-28 ${className}`} style={style}>
      {!className.includes('no-section-glow') && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(123,23,35,0.12),transparent_55%)]" />
      )}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-5 sm:px-8 lg:px-10">
        {(label || title || subtitle) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col gap-4"
          >
            {label && <span className="section-label">{label}</span>}
            {title && <h2 className="section-title max-w-3xl">{title}</h2>}
            {subtitle && <p className="section-subtitle max-w-2xl">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
