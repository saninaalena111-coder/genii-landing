import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import authorsPhoto from '../assets/images/authors.jpg';
const authorCards = [
  {
    name: 'Марина Нури',
    role: 'Креативный продюсер, AI-стратег',
  },
  {
    name: 'Ольга Бордюкова',
    role: 'Режиссёр нейровидео, арт-директор',
  },
];

const statHighlights = [
  { label: '90 000', caption: 'подписчиков' },
  { label: '1 200', caption: 'обученных специалистов' },
  { label: '4 000', caption: 'аудитория конференций' },
];

const achievementsLeft = [
  '15 лет в видеопродакшене',
  'создали первую в России музыкальную нейро-группу',
  'подписали договор со старейшим российским лейблом',
];

const achievementsRight = [
  'ролики с миллионными просмотрами',
  '3 000 000 прослушиваний на стриминговых площадках',
];

function Authors() {
  return (
    <SectionWrapper id="authors" className="bg-genii-bg-deep">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-10 lg:gap-12"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="section-label">Авторы курса</span>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Лидеры нейро-контента в России
          </h2>
          <p className="text-base text-genii-muted sm:text-lg">
            Опыт продакшена, исследования и реальные кейсы, которые задают стандарты рынка.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {authorCards.map((author) => (
            <GlassCard
              key={author.name}
              className="rounded-3xl border-white/15 bg-gradient-to-br from-white/12 via-white/6 to-genii-accent/10 p-6 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl border border-genii-accent/20 bg-white/10" />
                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">{author.name}</h3>
                  <p className="mt-2 text-sm text-genii-muted sm:text-base">{author.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="pointer-events-none absolute inset-x-0 -top-6 h-px bg-gradient-to-r from-transparent via-genii-accent/50 to-transparent" />
          <p className="px-2 text-base leading-relaxed text-genii-light/85 sm:text-lg">
            15 лет в видеопродакшене, экспертиза в нейросетевых технологиях и проекты, которые
            формируют будущее креативного рынка.
          </p>
          <span className="pointer-events-none absolute inset-x-0 -bottom-6 h-px bg-gradient-to-r from-transparent via-genii-accent/50 to-transparent" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="relative order-1 h-full lg:order-none">
            <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(123,23,35,0.45),transparent_60%)] blur-2xl" />
            <div className="group relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <img
                src={authorsPhoto}
                alt="Марина Нури и Ольга Бордюкова"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-genii-bg-deep/80" />
              <div className="absolute bottom-0 left-0 right-0">
                <div className="mx-5 mb-5 rounded-2xl border border-white/15 bg-gradient-to-r from-white/5 via-transparent to-white/5 px-4 py-3">
                  <p className="text-sm font-semibold text-white sm:text-base">
                    Марина Нури · Ольга Бордюкова
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-genii-light/70">
                    Авторы курса ГенИИ
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between gap-8">
            <div className="grid flex-1 gap-6 sm:grid-cols-2">
              <div className="w-full space-y-4">
                {achievementsLeft.map((item) => (
                  <div
                    key={item}
                    className="flex w-full items-start gap-3 border-b border-white/10 pb-4"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-genii-accent/70" />
                    <span className="text-sm text-genii-light sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <div className="w-full space-y-4">
                {achievementsRight.map((item) => (
                  <div
                    key={item}
                    className="flex w-full items-start gap-3 border-b border-white/10 pb-4"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-genii-accent/70" />
                    <span className="text-sm text-genii-light sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              {statHighlights.map((stat) => (
                <GlassCard
                  key={stat.label}
                  className="flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-3xl border-genii-accent/20 bg-gradient-to-br from-genii-accent/20 via-white/8 to-white/5 px-6 py-6 text-center shadow-soft"
                >
                  <p className="text-4xl font-semibold text-white sm:text-6xl">{stat.label}</p>
                  <p className="max-w-[12rem] text-xs uppercase tracking-[0.28em] text-genii-light/70">
                    {stat.caption}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

export default Authors;
