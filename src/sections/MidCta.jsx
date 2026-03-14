import { motion } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import { courseInfo } from '../data/content';

function MidCta() {
  return (
    <section className="relative py-12 sm:py-16">
  <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-6 py-10 text-center sm:px-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl"
        >
          Готовы стать частью нового поколения креаторов?
        </motion.h3>
        <p className="text-sm text-genii-muted sm:text-base">
          Получите чёткую систему, поддержку авторов и портфолио, которое начнёт работать на вас.
        </p>
        <div className="flex flex-col items-center gap-3">
          <PrimaryButton size="large" fullWidth className="sm:w-auto" onClick={() => { window.location.href = '/api/go-pay' + (window.location.search || ''); }}>
            {courseInfo.cta}
          </PrimaryButton>
          <p className="text-xs uppercase tracking-[0.35em] text-genii-muted">
            Лимитированные места на поток
          </p>
        </div>
      </div>
    </section>
  );
}

export default MidCta;
