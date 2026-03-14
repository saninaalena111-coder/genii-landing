import { motion } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import { courseInfo } from '../data/content';

function FinalCta() {
  return (
    <section id="final-cta" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-genii-accent/20 blur-[120px]" />
      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-5 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl font-semibold leading-[1.25] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
        >
          Создавайте видео нового поколения с помощью нейросетей. Раскрывайте в себе{' '}
          <em className="italic-accent">настоящего творца!</em>
        </motion.h2>
        <PrimaryButton size="large" fullWidth className="sm:w-auto" onClick={() => { window.location.href = '/api/go-pay' + (window.location.search || ''); }}>
          Стать ГенИИем
        </PrimaryButton>
        <p className="text-xs uppercase tracking-[0.4em] text-genii-muted">Старт 25 марта</p>
      </div>
    </section>
  );
}

export default FinalCta;
