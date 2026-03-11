import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function LegalPage({ title, children }) {
  return (
    <div className="min-h-screen bg-genii-bg-deeper text-white">
      <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 sm:py-16">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-genii-muted transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад на главную
        </Link>

        <h1 className="mb-10 text-2xl font-bold leading-tight text-white sm:text-3xl">{title}</h1>

        <div className="space-y-8 text-[15px] leading-relaxed text-white/70">
          {children}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-genii-muted transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад на главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      {title && (
        <h2 className="mb-3 text-base font-semibold text-white/90">{title}</h2>
      )}
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export function P({ children }) {
  return <p>{children}</p>;
}
