import { motion } from 'framer-motion';
import { Sparkles, Video, Wand2, Layers, Share2 } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';
import Badge from '../components/Badge';
import { courseInfo, trustPoints } from '../data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pb-28">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-soft-glow" />
      <div className="absolute -left-40 top-16 h-72 w-72 rounded-full bg-genii-accent/30 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-[150px]" />

      <div className="relative mx-auto grid w-full max-w-[1120px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col gap-7"
        >
          <Badge>
            <Sparkles className="h-4 w-4" />
            онлайн-курс
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {courseInfo.title}
              <span className="mt-2 block text-2xl font-medium text-genii-light sm:text-3xl lg:text-4xl">
                {courseInfo.subtitle}
              </span>
            </h1>
            <p className="text-lg text-genii-muted sm:text-xl lg:text-2xl">{courseInfo.offer}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryButton size="large" fullWidth className="sm:w-auto">
              {courseInfo.cta}
            </PrimaryButton>
            <div className="tag-chip w-fit">{courseInfo.startDate}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="surface-muted px-4 py-3 text-sm text-genii-light"
              >
                {point}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-genii-light sm:text-sm">
            {[
              '✓ 4 недели практики',
              '✓ портфолио AI-видео',
              '✓ поддержка кураторов',
              '✓ закрытое комьюнити',
            ].map((item) => (
              <span key={item} className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative flex flex-col items-center gap-6"
        >
          <div className="relative w-full">
            <div className="absolute -top-8 right-8 h-32 w-32 rounded-full bg-genii-accent/30 blur-[90px]" />
            <div className="absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-white/10 blur-[100px]" />
            <motion.div
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-5 shadow-card backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-accent-fade opacity-60" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-genii-muted">
                  <span>AI VIDEO</span>
                  <span>Preview</span>
                </div>
                <div className="flex h-40 items-center justify-center rounded-2xl border border-white/10 bg-genii-bg-deep/70 text-genii-light">
                  <span className="icon-wrap icon-glow h-12 w-12 text-genii-accent">
                    <Video className="h-6 w-6" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-genii-muted">
                  <span>Генерация в реальном времени</span>
                  <span>00:42</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="icon-card absolute -left-4 -top-6 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-genii-light shadow-none backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="icon-wrap icon-glow h-6 w-6 text-genii-accent">
                  <Wand2 className="h-3.5 w-3.5" />
                </span>
                AI video generation
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="icon-card absolute -right-6 top-8 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-genii-light shadow-none backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="icon-wrap icon-glow h-6 w-6 text-genii-accent">
                  <Layers className="h-3.5 w-3.5" />
                </span>
                Midjourney visuals
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="icon-card absolute -bottom-6 left-6 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-genii-light shadow-none backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="icon-wrap icon-glow h-6 w-6 text-genii-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                Character creation
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="icon-card absolute -bottom-10 right-4 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-genii-light shadow-none backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="icon-wrap icon-glow h-6 w-6 text-genii-accent">
                  <Share2 className="h-3.5 w-3.5" />
                </span>
                Social media content
              </div>
            </motion.div>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 lg:hidden">
            {[
              { icon: Wand2, text: 'AI video generation' },
              { icon: Layers, text: 'Midjourney visuals' },
              { icon: Sparkles, text: 'Character creation' },
              { icon: Share2, text: 'Social media content' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="icon-card rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-genii-light shadow-none backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="icon-wrap icon-glow h-6 w-6 text-genii-accent">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
