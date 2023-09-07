import ContactForm from '@/components/contact-form';
import HeroHeader from '@/components/hero-header';
import Skills from '@/components/skills';
import { MAIN_CONTENT_ID } from '@/constants';

export default function Page() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <HeroHeader />
      <Skills />
      <ContactForm />
    </main>
  );
}
