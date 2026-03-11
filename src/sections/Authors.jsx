import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import PrimaryButton from '../components/PrimaryButton';
import authorsPhoto from '../assets/images/authors.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const metricCards = [
  { number: '90 000', label: 'подписчиков блога\nо нейросетях' },
  { number: '2 000+', label: 'обученных\nчеловек' },
  { number: '4 000', label: 'аудитория\nконференций' },
  { number: '3 000 000+', label: 'прослушиваний\nНейро-группы' },
];

const achievements = [
  'ролики с миллионными просмотрами',
  'провели курс для 1 200 сотрудников международной компании',
  'создали первую в России музыкальную Нейро-группу — подписали договор со старейшим российским лейблом',
  'создали печатный календарь с дополненной реальностью по мотивам нейро-видео миллионника',
];

function Authors() {
  return (
    <SectionWrapper id="authors" className="bg-genii-bg-deep">

      {/* ── Header: title + names + intro ── */}
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.span
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="section-label"
        >
          Авторы курса
        </motion.span>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1"
        >
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Марина Нури
          </h2>
          <span className="hidden text-white/20 sm:block text-5xl font-thin">·</span>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ольга Бордюкова
          </h2>
        </motion.div>

        <motion.p
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-lg font-medium text-white/70 sm:text-xl"
        >
          15 лет создаем видео для людей и компаний.
        </motion.p>
      </div>

      {/* ── Main grid: photo + content ── */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">

        {/* Photo */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="relative order-2 lg:order-none"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(123,23,35,0.40),transparent_60%)] blur-2xl" />
          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
            <img
              src={authorsPhoto}
              alt="Марина Нури и Ольга Бордюкова"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-genii-bg-deep/75" />
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-4 mb-4 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Марина Нури · Ольга Бордюкова</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">Авторы курса ГенИИ</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: metrics + achievements + cta */}
        <div className="order-1 flex flex-col gap-8 lg:order-none">

          {/* Metric cards grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {metricCards.map((card, i) => (
              <motion.div
                key={card.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border border-genii-accent/20 bg-gradient-to-br from-genii-accent/15 via-white/[0.06] to-white/[0.03] px-4 py-5 text-center"
                style={{
                  boxShadow: '0 0 30px rgba(123,23,35,0.14), 0 8px 24px rgba(0,0,0,0.25)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(123,23,35,0.18) 0%, transparent 70%)',
                  }}
                />
                <p className="relative text-2xl font-black text-white sm:text-3xl">{card.number}</p>
                <p className="relative mt-1 whitespace-pre-line text-xs uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
                  {card.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Achievement list */}
          <ul className="flex flex-col gap-3">
            {achievements.map((item, i) => (
              <motion.li
                key={item}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-[6px] flex-shrink-0"
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'rgba(180,30,45,0.9)',
                    boxShadow: '0 0 6px rgba(180,30,45,0.6)',
                    display: 'block',
                  }}
                />
                <span className="text-sm leading-relaxed text-white/75 sm:text-base">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Signature statement */}
          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="relative rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
          >
            <div
              className="pointer-events-none absolute left-0 top-0 h-px w-full rounded-t-2xl"
              style={{
                background: 'linear-gradient(to right, transparent 10%, rgba(255,255,255,0.14) 50%, transparent 90%)',
              }}
            />
            <p className="text-sm italic leading-relaxed text-white/65 sm:text-base">
              «Нам пишут, что наши персонажи не похожи на аватаров — они как живые»
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex justify-center lg:justify-start"
          >
            <PrimaryButton size="large">
              Стать участником курса
            </PrimaryButton>
          </motion.div>

        </div>
      </div>

    </SectionWrapper>
  );
}

export default Authors;
