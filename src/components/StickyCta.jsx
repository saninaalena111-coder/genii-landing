import PrimaryButton from './PrimaryButton';

const CTA_VARIANTS = {
  neutral: {
    label: 'СТАРТ 25 МАРТА',
    headline: 'Место в потоке',
  },
  conversion: {
    label: 'СТАРТ 25 МАРТА',
    headline: 'Осталось 12 мест',
  },
  social: {
    label: 'СТАРТ 25 МАРТА',
    headline: 'Уже записалось 37 человек',
  },
};

function StickyCta({ text, variant = 'neutral' }) {
  const content = CTA_VARIANTS[variant] ?? CTA_VARIANTS.neutral;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <div className="flex w-full max-w-sm items-center gap-4 rounded-[28px] border border-genii-accent/20 bg-gradient-to-r from-genii-accent/15 via-white/5 to-white/10 px-4 py-3 shadow-card backdrop-blur-2xl">
        <div className="flex-1">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-genii-muted">{content.label}</p>
          <p className="text-sm font-semibold text-white">{content.headline}</p>
        </div>
        <PrimaryButton
          size="base"
          className="px-4 py-2 text-sm"
          onClick={() => { window.location.href = '/api/go-pay' + (window.location.search || ''); }}
        >
          {text}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default StickyCta;
