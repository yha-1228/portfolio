import ErrorDisplay from '@/components/error-display';
import { ButtonLink } from '@/components/ui/button';
import useTitle from '@/hooks/use-title';
import { SITE_TITLE } from '../../constants';

export default function NotFound() {
  useTitle(`${SITE_TITLE} | ページが見つかりません`);

  return (
    <ErrorDisplay
      heading="ページが見つかりません"
      detail="アクセスしたページは存在しないか、削除された可能性があります。"
      action={<ButtonLink href="/">ホームに戻る</ButtonLink>}
    />
  );
}
