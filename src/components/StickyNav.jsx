import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Программа', href: '#curriculum' },
  { label: 'Формат обучения', href: '#format' },
  { label: 'FAQ', href: '#faq' },
];

function scrollTo(href) {
  if (href === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(href);
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function buildGoPayUrl() {
  const params = new URLSearchParams(window.location.search);
  const tg_id = params.get('tg_id');
  const cuid = params.get('cuid');
  const product = params.get('product') || 'genii';
  const out = new URLSearchParams({ product });
  if (tg_id) out.set('tg_id', tg_id);
  if (cuid) out.set('cuid', cuid);
  return `/api/go-pay?${out.toString()}`;
}

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLink = (href) => {
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        style={{ transition: 'all 0.35s ease' }}
        className={`fixed inset-x-0 top-0 z-50 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-[#14141a]/[0.35] backdrop-blur-[12px] shadow-[0_2px_20px_rgba(0,0,0,0.25)]'
            : 'border-b border-white/[0.03] bg-[#14141a]/[0.15] backdrop-blur-[4px]'
        }`}
      >
        <div className="mx-auto flex h-[62px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <button
            onClick={() => handleLink('#top')}
            className="text-xl font-bold tracking-tight text-white transition-opacity duration-200 hover:opacity-80"
          >
            Ген<span className="text-genii-accent">ИИ</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleLink(href)}
                className="nav-underline text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button
              onClick={() => { window.location.href = buildGoPayUrl(); }}
              className="rounded-full bg-gradient-to-r from-genii-accent to-[#a01020] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(123,23,35,0.45)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(123,23,35,0.6)]"
            >
              Стать ГенИИем
            </button>
          </div>

          {/* Mobile burger + CTA */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => { window.location.href = buildGoPayUrl(); }}
              className="rounded-full bg-gradient-to-r from-genii-accent to-[#a01020] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_12px_rgba(123,23,35,0.4)]"
            >
              Стать ГенИИем
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors duration-200 hover:bg-white/8 hover:text-white"
              aria-label="Открыть меню"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col border-t border-white/[0.06] bg-[#14141a]/[0.55] px-5 py-3 backdrop-blur-[12px]">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleLink(href)}
                className="py-3 text-left text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
