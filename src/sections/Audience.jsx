import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { audience } from '../data/content';

function Audience() {
  return (
    <SectionWrapper
      id="audience"
      label="Кому подойдёт курс"
      title="Для тех, кто хочет создавать контент нового уровня"
      subtitle="Неважно, какой у вас бэкграунд — главное желание и интерес к креативу."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audience.map((item, index) => {
          const surfaceClass =
            index % 3 === 1
              ? 'border-genii-accent/20 bg-genii-accent/10'
              : index % 3 === 2
              ? 'border-white/12 bg-genii-light/6'
              : 'border-white/10 bg-white/5';
          return (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`card-surface flex items-center gap-4 p-5 ${surfaceClass}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-genii-accent/30 bg-genii-accent/15 text-genii-accent shadow-edge">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-sm text-genii-light sm:text-base">{item}</p>
          </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Audience;
