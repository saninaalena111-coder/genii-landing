import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';
import Badge from '../components/Badge';
import { courseInfo, trustPoints } from '../data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-24">
      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 text-center sm:px-8 lg:px-10">

        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <Badge>
            <Sparkles className="h-4 w-4" />
            Онлайн-курс
          </Badge>
        </motion.div>

        {/* Main title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 text-[64px] font-semibold leading-none tracking-tight sm:text-[72px] lg:text-[88px]"
          style={{
            background: 'linear-gradient(140deg, #ffffff 25%, #f5ede4 60%, #eedfd3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 22px rgba(255,255,255,0.16)) drop-shadow(0 0 50px rgba(123,23,35,0.12))',
          }}
        >
          {courseInfo.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 max-w-[600px] text-lg font-medium leading-relaxed text-white/75 sm:text-xl lg:text-2xl"
        >
          Вдохновляющие музыкальные видео с вами в главной роли с помощью нейросетей.
        </motion.p>

        {/* Tagline */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-3 text-base font-semibold uppercase tracking-wide text-white/65 sm:text-lg"
        >
          Песни | клипы | продвижение.
        </motion.p>

        {/* CTA — slightly right of center with startDate label above */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 flex w-full max-w-[620px] flex-col items-center gap-2 sm:mt-24"
        >
          <span className="text-xs font-medium uppercase tracking-[0.45em] text-white/38">{courseInfo.startDate}</span>
          <PrimaryButton size="large" onClick={() => { window.location.href = '/api/go-pay' + (window.location.search || ''); }}>
            {courseInfo.cta}
          </PrimaryButton>
        </motion.div>

        {/* Trust points — centered stack; parenthetical drops to its own line */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-2.5 text-center"
        >
          {trustPoints.map((point) => {
            const idx = point.indexOf('(');
            const main = idx === -1 ? point : point.slice(0, idx).trim();
            const paren = idx === -1 ? '' : point.slice(idx);
            return (
              <span key={point} className="text-xs uppercase tracking-widest text-white/32">
                {main}
                {paren && (
                  <span className="mt-0.5 block text-[11px] normal-case tracking-normal text-white/25">
                    {paren}
                  </span>
                )}
              </span>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
