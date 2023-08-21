import Layout from '@/components/layout';
import { ButtonLink } from '@/components/ui/button';
import Container from '@/components/ui/container';

export default function NotFound() {
  return (
    <Layout title="ページが見つかりません">
      <div className="pb-14 pt-8">
        <Container>
          <div className="space-y-10 text-center">
            <section className="space-y-3">
              <h1 className="text-2xl font-bold">ページが見つかりません</h1>
              <div className="leading-[1.5]">
                アクセスしたページは存在しないか、削除された可能性があります。
              </div>
            </section>
            <div>
              <ButtonLink href="/">ホームに戻る</ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}
