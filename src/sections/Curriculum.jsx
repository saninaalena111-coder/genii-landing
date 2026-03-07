import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { curriculum } from '../data/content';

function Curriculum() {
  return (
    <SectionWrapper
      id="curriculum"
      label="Программа курса"
      title="Структура, которая ведёт к профессии"
      subtitle="Каждый блок выстроен так, чтобы шаг за шагом собрать ваш творческий инструментариум."
    >
      <div className="grid gap-8">
        {curriculum.map((block, blockIndex) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`icon-card card-surface flex flex-col gap-6 p-6 sm:p-8 ${
              blockIndex === 1
                ? 'border-genii-accent/30 bg-genii-accent/10'
                : blockIndex === 2
                ? 'border-white/10 bg-white/8'
                : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="icon-wrap icon-glow h-11 w-11 text-genii-accent">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{block.title}</h3>
                  <p className="text-sm text-genii-muted">Плотный и практичный блок</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {block.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-genii-accent/20 bg-genii-accent/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-genii-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 text-sm text-genii-light sm:text-base">
              {block.items.map((item, index) => (
                <div key={item} className="flex gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-genii-muted/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Curriculum;
