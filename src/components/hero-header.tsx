import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="py-9">
      <Container>
        <div className="text-3xl font-bold leading-[1.2]">
          ユーザーフレンドリーなシステムを開発します。
        </div>
        <div className="mt-7 space-y-1.5">
          <p className="leading-[1.35]">
            新卒でシステム開発会社に入社し、主にWebアプリ開発のフロントエンドを担当してきました。
          </p>
          <p className="leading-[1.35]">
            HTML・CSS・Reactを利用し、ストレス無く閲覧や操作できるWebアプリケーションを提供できるよう心掛けています。
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
