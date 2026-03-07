import { courseInfo } from '../data/content';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-genii-bg-deeper py-10">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{courseInfo.title}</p>
          <p className="text-sm text-genii-muted">Премиальный курс по созданию AI-видео и визуальных историй.</p>
        </div>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-genii-muted">
          <span>Instagram</span>
          <span>Telegram</span>
          <span>VK</span>
        </div>
      </div>
      <div className="mx-auto mt-6 w-full max-w-[1120px] px-5 text-xs text-genii-muted sm:px-8">
        © 2026 ГенИИ. Все права защищены.
      </div>
    </footer>
  );
}

export default Footer;
