import SectionWrapper from '../components/SectionWrapper';
import Accordion from '../components/Accordion';
import { faqItems } from '../data/content';

function Faq() {
  return (
    <SectionWrapper
      id="faq"
      title="Ответы на частые вопросы"
      className="bg-genii-bg-deep"
    >
      <Accordion items={faqItems} />
    </SectionWrapper>
  );
}

export default Faq;
