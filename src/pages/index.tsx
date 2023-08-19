import ContactForm from '@/components/contact-form';
import HeroHeader from '@/components/hero-header';
import Layout from '@/components/layout';
import Skills from '@/components/skills';

export default function Home() {
  return (
    <Layout>
      <HeroHeader />
      <Skills />
      <ContactForm />
    </Layout>
  );
}
