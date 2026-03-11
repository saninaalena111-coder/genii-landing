import { Link } from 'react-router-dom';
import { courseInfo } from '../data/content';

const legalLinks = [
  { label: 'Политика конфиденциальности', to: '/privacy' },
  { label: 'Согласие на обработку персональных данных', to: '/consent' },
  { label: 'Публичная оферта', to: '/oferta' },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-genii-bg-deeper py-10">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{courseInfo.title}</p>
          <p className="text-sm text-genii-muted">Премиальный курс по созданию AI-видео и визуальных историй.</p>
        </div>
      </div>
      <div className="mx-auto mt-6 w-full max-w-[1120px] border-t border-white/6 px-5 pt-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-genii-muted/60">© 2026 ГенИИ. Все права защищены.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-xs text-genii-muted/50 transition-colors duration-200 hover:text-genii-muted"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
