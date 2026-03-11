import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Layers, ChevronDown } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { curriculum } from '../data/content';

function Curriculum() {
  // Each block manages open state independently; hover opens, arrow click closes
  const [openSet, setOpenSet] = useState(new Set([0]));

  const handleHoverEnter = (idx) => {
    setOpenSet((prev) => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const handleArrowClick = (e, idx) => {
    e.stopPropagation();
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <SectionWrapper id="curriculum" title="Программа курса:">
      <div className="grid gap-8">
        {curriculum.map((block, blockIndex) => {
          const isOpen = openSet.has(blockIndex);
          return (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              onMouseEnter={() => handleHoverEnter(blockIndex)}
              className={`icon-card card-surface flex flex-col p-6 sm:p-8 cursor-default ${
                blockIndex === 1
                  ? 'border-genii-accent/30 bg-genii-accent/10'
                  : blockIndex === 2
                  ? 'border-white/10 bg-white/8'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {/* Header */}
              <div className="flex w-full items-start gap-4">
                <div className="icon-wrap icon-glow flex-shrink-0 h-11 w-11 text-genii-accent">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em] text-white">{block.title}</h3>
                  <p className="mt-0.5 text-sm italic text-white/40">Плотный и практичный блок</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {block.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-genii-accent/20 bg-genii-accent/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-genii-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Arrow — click only toggles close */}
                <button
                  type="button"
                  aria-label={isOpen ? 'Свернуть' : 'Развернуть'}
                  onClick={(e) => handleArrowClick(e, blockIndex)}
                  className="flex-shrink-0 mt-1 rounded-full p-1 transition-colors duration-200 hover:bg-white/8"
                >
                  <ChevronDown
                    className={`h-5 w-5 text-genii-muted transition-transform duration-500 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Accordion body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="mt-6 flex flex-col gap-5 text-sm text-genii-light sm:text-base">
                      {block.items.map((item) => (
                        <div
                          key={item.lesson}
                          className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                        >
                          <span className="mb-2 inline-block rounded border border-[#c43555]/35 bg-[#c43555]/12 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#c43555]">
                            {item.lesson}
                          </span>
                          <p className="mt-1 leading-relaxed whitespace-pre-line">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Curriculum;
