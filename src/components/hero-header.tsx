import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="bg-gray-100 py-9">
      <Container>
        <p className="text-2xl font-bold leading-[1.35] lg:text-3xl">
          ユーザーフレンドリーで堅牢なWebを開発します。
        </p>
        <div className="mt-8">
          <p className="lg:text-lg">
            新卒でシステム開発企業に入社し、主にWebアプリ開発のフロントエンドを担当してきました。マークアップ技術とReactを利用して、ストレス無く快適に閲覧や操作を行える体験を提供できるよう心掛けています。
          </p>
        </div>

        <div className="mt-11">
          <ButtonLink
            href="/experience"
            fullWidth
            className="font-bold lg:hidden"
          >
            職務経歴を見る
          </ButtonLink>
          <ButtonLink
            href="/experience"
            className="hidden w-52 font-bold lg:inline-block"
          >
            職務経歴を見る
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
