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

        {/* Subtitle — forced line break for readability */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 max-w-[520px] text-xl font-medium leading-snug text-white/75 sm:text-2xl lg:text-3xl"
        >
          Курс по созданию художественного и<br className="hidden sm:block" /> креативного контента в нейросетях.
        </motion.p>

        {/* CTA — slightly right of center with startDate label above */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-9 flex w-full max-w-[620px] flex-col items-end gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-[0.45em] text-white/38">{courseInfo.startDate}</span>
          <PrimaryButton size="large" onClick={() => { window.location.href = '/api/go-pay' + (window.location.search || ''); }}>
            {courseInfo.cta}
          </PrimaryButton>
        </motion.div>

        {/* Trust points — simple text labels */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {trustPoints.map((point, i) => (
            <span key={point} className="text-xs uppercase tracking-widest text-white/32">
              {i > 0 && <span className="mr-8 text-white/15">·</span>}
              {point}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
