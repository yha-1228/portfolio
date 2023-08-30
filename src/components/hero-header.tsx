import { routes } from '@/routes';
import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="pb-14 pt-9">
      <Container>
        <p className="text-2xl font-bold leading-[1.35] lg:text-4xl">
          ユーザーフレンドリーで堅牢なWebを開発します。
        </p>
        <div className="mt-3.5">
          <p className="lg:text-lg">
            新卒でシステム開発企業に入社し、主にWebアプリ開発のフロントエンドを担当してきました。マークアップ技術とReactを利用して、ストレス無く快適に閲覧や操作を行える体験を提供できるよう心掛けています。
          </p>
        </div>

        <ButtonLink
          href={routes.experience.href}
          className="group mt-8 flex items-center lg:inline-flex lg:items-center lg:px-6 lg:py-2 lg:text-lg"
        >
          <span>職務経歴を見る</span>
          <span className="ml-1 inline-block lg:ml-1.5 lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none">
            -&gt;
          </span>
        </ButtonLink>
      </Container>
    </div>
  );
}
