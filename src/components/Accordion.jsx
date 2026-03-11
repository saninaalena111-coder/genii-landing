import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ item, index, isOpen, onToggle }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
        isOpen
          ? 'border-genii-accent/25 bg-white/[0.06] shadow-[0_0_20px_rgba(123,23,35,0.08)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
      }`}
    >
      <button
        type="button"
        id={buttonId}
        className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-genii-accent"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={`text-base leading-snug tracking-[-0.01em] sm:text-lg ${
          isOpen ? 'font-semibold text-white' : 'font-medium text-white/85'
        }`}>{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-transform duration-400 ${
            isOpen ? 'rotate-180 text-genii-accent' : 'text-genii-muted'
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
          >
            <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-white/50 sm:text-base">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="flex flex-col gap-5">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export default Accordion;
