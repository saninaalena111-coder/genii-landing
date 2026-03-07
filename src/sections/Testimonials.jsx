import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { testimonials } from '../data/content';

function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      label="Отзывы"
      title="Реальные впечатления участников"
      subtitle="Коротко, по делу и с реальными результатами."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const surfaceClass =
            index % 3 === 1
              ? 'border-genii-accent/20 bg-genii-accent/10'
              : index % 3 === 2
              ? 'border-white/12 bg-genii-light/6'
              : 'border-white/10 bg-white/5';
          return (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`card-surface flex h-full flex-col gap-4 p-6 ${surfaceClass}`}
          >
            <Quote className="h-8 w-8 text-genii-accent" />
            <p className="text-sm text-genii-light sm:text-base">{testimonial.text}</p>
            <div className="mt-auto flex flex-col gap-2">
              <div className="h-px w-full bg-white/10" />
              <p className="text-xs uppercase tracking-[0.3em] text-genii-muted">{testimonial.name}</p>
            </div>
          </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Testimonials;
