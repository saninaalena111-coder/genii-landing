import { motion } from 'framer-motion';
import { Sparkles, Music, Star, Briefcase, Camera } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const rows = [
  {
    icon: Sparkles,
    text: 'Новичкам, которые хотят научиться создавать творческие работы для себя, в подарок близким людям и на заказ',
  },
  {
    icon: Music,
    text: 'Музыкантам, которым нужны клипы на свои авторские песни',
  },
  {
    icon: Star,
    text: 'Мамам талантливых детей, которым необходимо продвижение в социальных сетях',
  },
  {
    icon: Briefcase,
    text: 'Экспертам и предпринимателям, которым нужен уникальный контент для своей страницы и своего дела',
  },
  {
    icon: Camera,
    text: 'Фотографам, видеографам, креаторам, которые хотят выйти на новый уровень и получить вдохновение',
  },
];

function Audience() {
  return (
    <section
      id="audience"
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
          <h2
            className="section-title text-center"
            style={{
              color: '#ffffff',
              textShadow: '0 0 10px rgba(220,50,50,0.18), 0 0 28px rgba(180,30,30,0.12)',
            }}
          >Кому подойдет курс</h2>
        </motion.div>

        {/* Rows */}
        <div
          className="flex flex-col rounded-2xl px-6 py-2 sm:px-8"
          style={{ background: 'rgba(18,17,24,0.42)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.09)' }}
        >
          {rows.map((row, i) => (
            <motion.div key={i} {...fu(0.1 + i * 0.1)}>
              <div className="flex items-center gap-4 py-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-white/12" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)' }}>
                    <row.icon className="h-5 w-5 text-genii-accent" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-genii-light sm:text-base">{row.text}</p>
              </div>
              {i < rows.length - 1 && (
                <div className="h-px bg-gradient-to-r from-white/8 via-white/4 to-transparent" />
              )}
            </motion.div>
          ))}

          {/* Separator before final statement */}
          <div className="mt-5 h-px bg-gradient-to-r from-genii-accent/40 via-genii-accent/15 to-transparent" />

          {/* Final highlighted statement */}
          <motion.div {...fu(0.1 + rows.length * 0.1)} className="relative mt-5 pb-7 pl-[60px]">
            {/* left accent stroke */}
            <div
              className="absolute left-0 top-1 h-[90%] w-[2px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(200,40,40,0.45), transparent)' }}
            />
            {/* ambient glow beneath the phrase */}
            <div
              className="glow-breathe absolute bottom-1 left-0 h-5 w-60"
              style={{
                background: 'radial-gradient(ellipse 90% 100% at 20% 100%, rgba(160,20,30,0.55) 0%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />
            <p
              className="relative text-lg sm:text-xl"
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                letterSpacing: '0.015em',
                color: 'rgba(255,255,255,0.92)',
                textShadow: '0 2px 18px rgba(180,30,30,0.22), 0 0 5px rgba(255,80,80,0.1)',
              }}
            >
              И даже если вы никогда не работали с видео.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Audience;
