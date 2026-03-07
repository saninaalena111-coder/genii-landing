import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ item, index, isOpen, onToggle }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 shadow-edge transition-colors duration-300 ${
        isOpen ? 'bg-white/10' : 'hover:border-white/20'
      }`}
    >
      <button
        type="button"
        id={buttonId}
        className="flex w-full items-center justify-between gap-4 text-left text-base font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-genii-accent"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{item.question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180 text-genii-accent' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
          >
            <p className="mt-4 text-sm text-genii-muted sm:text-base">{item.answer}</p>
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
    <div className="flex flex-col gap-4">
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
