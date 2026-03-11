import { motion } from 'framer-motion';
import { Orbit } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import { courseInfo } from '../data/content';

function NeuroCreator() {
  return (
    <SectionWrapper
      id="neurocreator"
      label="ПРОФЕССИЯ 2026"
      title="Нейро-креатор — тот, кто создаёт контент нового поколения."
      subtitle="Интеллект, который превращает идеи в вирусные истории." 
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
  <GlassCard className="icon-card relative w-full overflow-hidden">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-genii-accent/30 blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-[90px]" />
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center gap-3 text-genii-light">
              <span className="icon-wrap icon-glow h-6 w-6 text-genii-accent">
                <Orbit className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.5em] text-genii-muted">Профессия 2026</span>
            </div>
            <h3 className="text-2xl font-semibold leading-snug tracking-[-0.01em] text-white sm:text-3xl">
              <em className="italic-accent">Нейро-креатор</em> — тот, кто создаёт{' '}
              <span className="phrase-accent">контент нового поколения</span>.
            </h3>
            <p className="text-sm text-genii-muted sm:text-base">{courseInfo.tagline}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-genii-bg-deep/70 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-genii-muted">формат</p>
                <p className="text-base font-semibold text-white">4 недели</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-genii-bg-deep/70 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-genii-muted">поддержка</p>
                <p className="text-base font-semibold text-white">живые кураторы</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-genii-light">
              Премиальный формат + портфолио после курса
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </SectionWrapper>
  );
}

export default NeuroCreator;
