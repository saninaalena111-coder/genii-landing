import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { outcomes } from '../data/content';

function Outcomes() {
  return (
    <SectionWrapper
      id="outcomes"
      label="Что будет через 4 недели"
      title="Трансформация в нейро-креатора"
      subtitle="Вы выйдете с понятной системой и портфолио, которое можно показывать клиентам или брендам."
      className="bg-genii-bg-deep"
    >
      <motion.ol
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto flex max-w-4xl flex-col gap-8 text-base text-genii-light sm:text-lg lg:grid lg:grid-cols-2 lg:gap-10 lg:text-xl"
      >
        {outcomes.map((item, index) => (
          <li
            key={item}
            className="relative flex gap-5 pl-14 lg:gap-6 lg:pl-0"
          >
            <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-genii-accent/40 bg-genii-accent/10 text-xs font-semibold tracking-[0.3em] text-genii-accent lg:static lg:h-12 lg:w-12 lg:text-sm">
              {String(index + 1).padStart(2, '0')}
            </div>
            {index < outcomes.length - 1 && (
              <span className="absolute left-5 top-12 hidden h-[calc(100%-2.75rem)] w-px bg-white/10 sm:block lg:hidden" />
            )}
            <div className="space-y-2 lg:pl-6 lg:border-l lg:border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-genii-light/50">
                Этап {index + 1}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
              <p className="leading-relaxed">{item}</p>
            </div>
          </li>
        ))}
      </motion.ol>
    </SectionWrapper>
  );
}

export default Outcomes;
