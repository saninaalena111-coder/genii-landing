import { motion } from 'framer-motion';
import { Clock, Video, BookOpen, MessageCircle, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const mainCards = [
  {
    icon: Video,
    title: 'Видео-уроки.',
    text: 'Все уроки создаются в реальном времени, вы получаете самую свежую информацию про самые передовые модели. Нет устаревших уроков в записи.',
  },
  {
    icon: BookOpen,
    title: 'Практические задания.',
    text: 'По каждому уроку вы создадите свое видео, которое вы добавите себе в портфолио.',
  },
  {
    icon: MessageCircle,
    title: 'Регулярная обратная связь',
    text: 'от кураторов и авторов курса.',
  },
];

function Format() {
  return (
    <section
      id="format"
      className="relative py-16 sm:py-20 lg:py-24 xl:py-28"
    >
      {/* ── Content ── */}
      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-5 sm:px-8 lg:px-10">
        {/* Section title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="section-title text-center">Формат обучения</h2>
        </motion.div>

        {/* Duration line */}
        <motion.div {...fu(0.05)} className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-4">
            <span className="icon-wrap icon-glow flex-shrink-0 h-10 w-10 text-genii-accent">
              <Clock className="h-5 w-5" />
            </span>
            <p className="text-base font-medium text-genii-light sm:text-lg leading-snug">
              Длительность обучения <span className="font-semibold text-white">4 недели.</span>{' '}
              Обратная связь <span className="font-semibold text-white">5 недель</span>
            </p>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        {/* 3 cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {mainCards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fu(0.1 + i * 0.1)}
              className="group icon-card flex flex-col gap-4 rounded-2xl border border-white/8 p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
              style={{ background: 'rgba(14,14,18,0.55)', backdropFilter: 'blur(6px)' }}
            >
              <div className="icon-wrap icon-glow h-11 w-11 text-genii-accent flex-shrink-0">
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold leading-snug tracking-[-0.005em] text-white sm:text-lg">{card.title}</h3>
                <p className="text-sm leading-[1.7] text-genii-light sm:text-base">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support statement */}
        <motion.div {...fu(0.4)} className="flex flex-col items-center gap-3 py-2 text-center">
          <p className="text-lg font-semibold text-white sm:text-xl">
            Мы поможем вам разобраться во всех нюансах и довести каждую работу до идеала!
          </p>
          <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-genii-accent/70 via-genii-accent/40 to-transparent" />
        </motion.div>

        {/* Community card */}
        <motion.div
          {...fu(0.5)}
          className="icon-card flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8 rounded-2xl border border-genii-accent/40"
          style={{
            background: 'rgba(123,23,35,0.28)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 40px rgba(123,23,35,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/30"
            style={{ background: 'rgba(255,255,255,0.15)', boxShadow: '0 0 18px rgba(255,255,255,0.18)' }}
          >
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
              Закрытый чат участников!
            </h3>
            <p className="text-sm leading-relaxed text-genii-light sm:text-base">
              На всех наших программах очень сильное и теплое комьюнити! Люди становятся партнерами и
              друзьями, дальше вместе создают свои проекты.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Format;
