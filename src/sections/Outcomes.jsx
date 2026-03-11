import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const results = [
  'минимум 3 качественных AI-видео в портфолио',
  'понимание современных нейросетей',
  'передовые навыки создания визуального контента',
  'крепкая база для развития как нейро-креатора',
];

const finalResult = {
  main: 'поддержка лучших учеников в наших социальных сетях',
  sub: 'и возможность получить реальный заказ',
};

function ResultCard({ text, delay }) {
  return (
    <motion.div {...fu(delay)}>
      <div className="flex items-start gap-5 py-5">
        <div className="relative flex-shrink-0 mt-0.5">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8">
            <Check className="h-5 w-5 text-genii-accent" strokeWidth={2.5} />
          </div>
        </div>
        <p className="text-base leading-[1.7] text-genii-light sm:text-lg">{text}</p>
      </div>
      <div className="h-px bg-gradient-to-r from-white/8 via-white/4 to-transparent" />
    </motion.div>
  );
}

function Outcomes() {
  return (
    <SectionWrapper
      id="outcomes"
      title="Через 4 недели у вас будет:"
      className="bg-genii-bg-deep"
    >
      {/* Clean rows — no cards */}
      <div className="mx-auto flex max-w-2xl flex-col">
        {results.map((item, i) => (
          <ResultCard key={i} text={item} delay={0.05 + i * 0.1} />
        ))}
      </div>

      {/* Final wide highlighted card */}
      <motion.div {...fu(0.05 + results.length * 0.1)}>
        <div className="relative overflow-hidden rounded-2xl border border-genii-accent/30 bg-genii-accent/10 p-6 sm:p-8">
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-genii-accent/10 via-transparent to-transparent" />
          <div className="flex items-start gap-5">
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="absolute inset-0 rounded-full bg-genii-accent/35 blur-lg" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-genii-accent/50 bg-genii-accent/25">
                <Check className="h-5 w-5 text-genii-accent" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold leading-relaxed text-white sm:text-xl lg:text-2xl">
                {finalResult.main}
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-genii-muted sm:text-lg">
                {finalResult.sub}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

export default Outcomes;
