import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { formatItems } from '../data/content';

function Format() {
  return (
    <SectionWrapper
      id="format"
      label="Формат обучения"
      title="Интенсивная практика с поддержкой"
      subtitle="Мы обновляем уроки в реальном времени и держим темп вместе с вами."
      className="bg-genii-bg-deep"
    >
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto hidden max-w-4xl grid-cols-2 gap-x-10 gap-y-5 text-base text-genii-light sm:grid sm:text-lg"
      >
        {formatItems.map((item) => (
          <li key={item} className="flex items-start gap-4">
            <span className="icon-wrap icon-glow mt-1 h-6 w-6 text-genii-accent">
              <Check className="h-4 w-4" />
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </motion.ul>
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-3 text-sm text-genii-light sm:hidden"
      >
        {formatItems.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-genii-accent" />
            <span>{item}</span>
          </li>
        ))}
      </motion.ul>
    </SectionWrapper>
  );
}

export default Format;
