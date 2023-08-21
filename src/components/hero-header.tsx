import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="py-9">
      <Container>
        <div className="text-xl font-bold leading-[1.3] text-blue-500">
          ユーザーフレンドリーなシステムを開発します。
        </div>

        <div className="mt-7 space-y-2">
          <p className="leading-[1.4]">
            新卒でシステム開発会社に入社し、主にWebアプリ開発のフロントエンドを担当してきました。
          </p>
          <p className="leading-[1.4]">
            HTML・CSS・Reactを利用し、ストレス無く閲覧や操作できるWebアプリケーションを提供できるよう心掛けています。
          </p>
        </div>

        <div className="mt-10">
          <ButtonLink href="/experience" fullWidth className="lg:hidden">
            職務経歴を見る
          </ButtonLink>
          <ButtonLink href="/experience" className="hidden lg:inline-block">
            職務経歴を見る
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
