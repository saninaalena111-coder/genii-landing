import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { learningSkills } from '../data/content';

const skillShowcase = [
  {
    title: 'реализм',
    tone: 'from-white/10 via-genii-accent/10 to-transparent',
  },
  {
    title: 'фантастика',
    tone: 'from-genii-accent/20 via-white/10 to-transparent',
  },
  {
    title: 'мультипликация',
    tone: 'from-white/10 via-white/5 to-genii-accent/10',
  },
  {
    title: 'работать с реальными продуктами',
    tone: 'from-genii-accent/15 via-white/5 to-transparent',
  },
  {
    title: 'создавать своих персонажей',
    tone: 'from-white/10 via-genii-accent/10 to-transparent',
  },
];

function Skills() {
  return (
    <SectionWrapper
      id="skills"
      label="Чему вы научитесь"
      title="За 4 недели вы освоите полный процесс создания нейроконтента."
      subtitle="От генерации визуалов до продакшена клипов и персонажей — весь цикл под вашим контролем."
      className="bg-genii-bg-deep"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-base font-semibold text-white sm:text-lg"
      >
        {learningSkills[0]}
      </motion.p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillShowcase.map((skill, index) => {
          const surfaceClass =
            index % 3 === 1
              ? 'border-genii-accent/20 bg-genii-accent/10'
              : index % 3 === 2
              ? 'border-white/12 bg-genii-light/6'
              : 'border-white/10 bg-white/5';
          return (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`card-surface flex flex-col gap-4 p-5 ${surfaceClass}`}
          >
            <div className={`relative h-24 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${skill.tone}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="absolute bottom-3 left-3 h-8 w-8 rounded-full bg-genii-accent/25 blur-[14px]" />
            </div>
            <p className="text-sm font-medium text-white sm:text-base">{skill.title}</p>
          </motion.div>
        );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Skills;
