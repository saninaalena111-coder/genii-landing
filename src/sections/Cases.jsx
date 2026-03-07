import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { cases } from '../data/content';

function Cases() {
  return (
    <SectionWrapper
      id="cases"
      label="Примеры видео / кейсы"
      title="Наши видео набирают миллионы просмотров. Запускают тренды."
      subtitle="Контент, созданный с помощью нейросетей, активно распространяется в соцсетях. И мы обучаем этой системе наших учеников."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-genii-bg-deep/70 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-genii-accent/15 opacity-70" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <PlayCircle className="h-10 w-10 text-genii-accent/80" />
                <span className="tag-chip">
                  кейс
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-genii-muted sm:text-base">{item.result}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-genii-light shadow-edge">
                Результат после курса: создают вирусные ролики, развивают соцсети и делают креативный контент для брендов.
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Cases;
