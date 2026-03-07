import { motion } from 'framer-motion';
import { Award, Users, Mic2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import { authors, authorFacts } from '../data/content';

const statHighlights = [
  { label: '90 000', caption: 'подписчиков', icon: Users },
  { label: '1 200', caption: 'обученных специалистов', icon: Award },
  { label: '4 000', caption: 'аудитория конференций', icon: Mic2 },
];

function Authors() {
  return (
    <SectionWrapper
      id="authors"
      label="Авторы курса"
      title="Лидеры нейро-контента в России"
      subtitle="Опыт продакшена, исследования и реальные кейсы, которые задают стандарты рынка."
      className="bg-genii-bg-deep"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {authors.map((author) => (
            <motion.div
              key={author.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <GlassCard className="hover-lift">
                <h3 className="text-xl font-semibold text-white">{author.name}</h3>
                <p className="mt-2 text-sm text-genii-muted sm:text-base">{author.role}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <GlassCard className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {statHighlights.map((stat, index) => {
              const Icon = stat.icon;
              const surfaceClass =
                index % 3 === 1
                  ? 'border-genii-accent/20 bg-genii-accent/10'
                  : index % 3 === 2
                  ? 'border-white/12 bg-genii-light/6'
                  : 'border-white/10 bg-genii-bg-deep/70';
              return (
                <div
                  key={stat.label}
                  className={`card-surface flex min-h-[128px] flex-col items-center justify-center gap-3 rounded-2xl p-5 text-center ${surfaceClass}`}
                >
                  <Icon className="h-5 w-5 text-genii-accent" />
                  <p className="text-2xl font-semibold text-white sm:text-3xl">{stat.label}</p>
                  <p className="max-w-[10rem] text-xs uppercase tracking-[0.3em] text-genii-muted">
                    {stat.caption}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {authorFacts.map((fact, index) => {
              const surfaceClass =
                index % 3 === 1
                  ? 'border-genii-accent/20 bg-genii-accent/10'
                  : index % 3 === 2
                  ? 'border-white/12 bg-genii-light/6'
                  : 'border-white/10 bg-white/5';
              const emphasizedFact =
                fact === 'обучили 1200 сотрудников международной компании'
                  ? {
                      value: '1200',
                      text: 'обученных сотрудников международной компании',
                    }
                  : fact === 'блог о нейросетях — 90 000 подписчиков'
                  ? {
                      value: '90 000',
                      text: 'подписчиков в блоге о нейросетях',
                    }
                  : fact === '3 000 000 прослушиваний на стриминговых площадках'
                  ? {
                      value: '3 000 000',
                      text: 'прослушиваний на стриминговых площадках',
                    }
                  : null;
              return (
                <div
                  key={fact}
                  className={`card-surface rounded-2xl px-4 py-3 text-sm text-genii-light ${surfaceClass}`}
                >
                  {emphasizedFact ? (
                    <span>
                      <span className="text-base font-semibold text-white">{emphasizedFact.value}</span>{' '}
                      <span className="text-genii-light">{emphasizedFact.text}</span>
                    </span>
                  ) : (
                    fact
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}

export default Authors;
