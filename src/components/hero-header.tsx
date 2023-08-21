import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="py-9">
      <Container>
        <div className="text-2xl font-bold leading-[1.3] text-blue-500">
          ユーザーフレンドリーなシステムを開発します。
          {/* Web技術を駆使し、デジタル領域でより便利な社会になるよう支援します。 */}
        </div>

        <div className="mt-8 space-y-3">
          <p className="leading-[1.2]">
            新卒でシステム開発会社に入社し、主にWebアプリ開発のフロントエンドを担当してきました。
          </p>
          <p className="leading-[1.2]">
            HTML・CSS・Reactを利用して、ストレス無く閲覧や操作できるWebアプリケーションを提供できるよう心掛けています。
          </p>
        </div>

        <div className="mt-10">
          <ButtonLink href="/experience" className="block w-full text-center">
            職務経歴を見る
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
