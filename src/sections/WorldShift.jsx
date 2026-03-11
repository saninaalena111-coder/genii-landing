import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

const listFade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const bulletSkills = [
  'Управлять атмосферой кадра, как режиссёр и художник',
  'Создавать своих уникальных персонажей, героев, музыкантов',
  'Создавать свою авторскую музыку',
  'Монтировать захватывающие видео',
];

function WorldShift() {
  return (
    <SectionWrapper
      id="world"
      className="no-section-glow relative"
      style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '6rem' }}
    >
      {/* ── Soft radial muting — no hard rectangle edges ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2"
        style={{
          transform: 'translate(-50%, -50%)',
          width: '110%',
          height: '110%',
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 55%, transparent 80%)',
          zIndex: 0,
        }}
      />

      {/* ── Burgundy ambient behind title ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-0"
        style={{
          transform: 'translateX(-50%)',
          width: '700px',
          height: '300px',
          background:
            'radial-gradient(ellipse at center top, rgba(123,23,35,0.30) 0%, transparent 65%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-10 text-center"
        style={{ zIndex: 2 }}
      >
        {/* Title */}
        <motion.h2
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-4xl font-semibold leading-snug tracking-tight text-white sm:text-5xl"
          style={{
            maxWidth: '900px',
            fontSize: 'clamp(2rem, 4vw, 52px)',
            textShadow:
              '0 0 40px rgba(123,23,35,0.35), 0 0 80px rgba(123,23,35,0.12)',
          }}
        >
          За 4 недели, на курсе ГенИИ вы научитесь
        </motion.h2>

        {/* ── Main glass card ── */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative w-full overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: '22px',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '50px',
            boxShadow:
              '0 0 100px rgba(123,23,35,0.28), 0 0 40px rgba(123,23,35,0.12), 0 24px 60px rgba(0,0,0,0.25)',
          }}
        >
          {/* Top shimmer line */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent 8%, rgba(255,255,255,0.20) 50%, transparent 92%)',
            }}
          />
          {/* Burgundy glow under card content */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 110%, rgba(123,23,35,0.28) 0%, transparent 60%)',
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              Создавать изображения и видео
              <br />
              с реальными людьми и продуктами
              <br />
              в любом стиле
            </p>

            {/* Style tags */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Реализм', 'Фантазия', 'Мультипликация'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    padding: '6px 18px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.72)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Feature list ── */}
        <ul
          className="flex w-full flex-col text-left"
          style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}
        >
          {bulletSkills.map((skill, i) => (
            <motion.li
              key={skill}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={listFade}
              className="flex items-start gap-4"
              style={{ marginBottom: '18px' }}
            >
              {/* Red accent dot */}
              <span
                style={{
                  marginTop: '7px',
                  flexShrink: 0,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ff3b3b',
                  boxShadow: '0 0 8px rgba(255,59,59,0.75), 0 0 16px rgba(200,30,30,0.4)',
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.90)',
                }}
              >
                {skill}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

export default WorldShift;
