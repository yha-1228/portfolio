import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="py-9">
      <Container>
        <p className="text-2xl font-bold leading-[1.35]">
          ユーザーフレンドリーで堅牢なWebを開発します。
        </p>
        <div className="mt-7 space-y-2">
          <p className="leading-[1.5]">
            新卒でシステム開発企業に入社し、主にWebアプリ開発のフロントエンドを担当してきました。
          </p>
          <p className="leading-[1.5]">
            マークアップ技術とReactを利用し、ストレス無く快適に閲覧や操作を行える体験を提供できるよう心掛けています。
          </p>
        </div>

        <div className="mt-10">
          <ButtonLink
            href="/experience"
            fullWidth
            className="font-bold lg:hidden"
          >
            職務経歴を見る
          </ButtonLink>
          <ButtonLink
            href="/experience"
            className="hidden font-bold lg:inline-block"
          >
            職務経歴を見る
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
