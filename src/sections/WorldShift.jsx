import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { neuroCreatorSkills, worldShiftProfession, worldShiftStatements } from '../data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function WorldShift() {
  return (
    <SectionWrapper
      id="world"
      label="Мир контента изменяется"
      title="Контент перешёл в новую эру"
      subtitle="Видео больше не требует съёмочной команды — нейросети позволяют создавать визуальные истории быстрее, глубже и масштабнее."
      className="bg-genii-bg-deep"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {worldShiftStatements.map((statement) => (
          <motion.div
            key={statement}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-base text-genii-light shadow-edge sm:text-lg"
          >
            {statement}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="flex flex-col gap-3 pt-4"
      >
        <p className="text-base text-genii-light sm:text-lg">{worldShiftProfession.prefix}</p>
        <p className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">
          {worldShiftProfession.title}
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="flex flex-col gap-5"
      >
        <p className="text-base font-semibold text-white sm:text-lg">Это человек, который:</p>
        <ul className="flex flex-col gap-3 text-sm text-genii-light sm:text-base">
          {neuroCreatorSkills.map((skill) => (
            <li key={skill} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-genii-accent" />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </SectionWrapper>
  );
}

export default WorldShift;
