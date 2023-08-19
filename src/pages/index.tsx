import ContactForm from '@/components/contact-form';
import Layout from '@/components/layout';
import Skills from '@/components/skills';

export default function Home() {
  return (
    <Layout>
      <Skills />
      <ContactForm />
    </Layout>
  );
}
