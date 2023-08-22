import ErrorDisplay from '@/components/error-display';
import Layout from '@/components/layout';
import { ButtonLink } from '@/components/ui/button';

export default function Error404() {
  return (
    <Layout title="ページが見つかりません">
      <ErrorDisplay
        heading="ページが見つかりません"
        detail="アクセスしたページは存在しないか、削除された可能性があります。"
        action={<ButtonLink href="/">ホームに戻る</ButtonLink>}
      />
    </Layout>
  );
}
