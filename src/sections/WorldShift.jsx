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
      className="bg-[linear-gradient(135deg,rgba(235,230,225,0.92),rgba(223,214,207,0.88))] text-center shadow-[0_30px_80px_rgba(123,23,35,0.12)] [&_.section-label]:text-genii-bg/70 [&_.section-title]:text-genii-bg-deep [&_.section-subtitle]:text-genii-bg"
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center">
        <div className="mt-8 grid w-full gap-6 md:grid-cols-3">
          {worldShiftStatements.map((statement) => (
            <motion.div
              key={statement}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[20px] border border-white/40 bg-white/60 px-6 py-6 text-base text-genii-bg-deep/90 shadow-[0_12px_30px_rgba(123,23,35,0.1)] backdrop-blur-md sm:text-lg"
            >
              {statement}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="relative mt-12 flex flex-col items-center gap-3"
      >
        <div className="pointer-events-none absolute -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,120,80,0.12),transparent_70%)] blur-2xl" />
        <p className="text-base text-genii-bg sm:text-lg">{worldShiftProfession.prefix}</p>
        <p className="text-3xl font-semibold tracking-wide text-genii-bg-deep sm:text-4xl">
          {worldShiftProfession.title}
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto mt-10 flex max-w-[520px] flex-col items-center gap-5"
      >
        <p className="text-base font-semibold text-genii-bg-deep sm:text-lg">Это человек, который:</p>
        <ul className="flex flex-col items-center gap-4 text-sm leading-relaxed text-genii-bg sm:text-base">
          {neuroCreatorSkills.map((skill) => (
            <li key={skill} className="flex items-start justify-center gap-3 text-center">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-genii-accent/80" />
              <span className="max-w-[28rem]">{skill}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </SectionWrapper>
  );
}

export default WorldShift;
