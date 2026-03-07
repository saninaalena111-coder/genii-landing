import SectionWrapper from '../components/SectionWrapper';
import Accordion from '../components/Accordion';
import { faqItems } from '../data/content';

function Faq() {
  return (
    <SectionWrapper
      id="faq"
      label="FAQ"
      title="Ответы на частые вопросы"
      subtitle="Если остались сомнения, здесь мы сняли основные барьеры."
      className="bg-genii-bg-deep"
    >
      <Accordion items={faqItems} />
    </SectionWrapper>
  );
}

export default Faq;
