import { routes } from '@/routes';
import { ButtonLink } from './ui/button';
import Container from './ui/container';

export default function HeroHeader() {
  return (
    <div className="py-14">
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
          <div className="lg:hidden">
            <ButtonLink
              href={routes.experience.href}
              className="flex items-center"
            >
              <span>職務経歴を見る</span>
              <span className="ml-1 inline-block">-&gt;</span>
            </ButtonLink>
          </div>
          <div className="hidden lg:block">
            <ButtonLink
              href={routes.experience.href}
              className="group inline-flex items-center px-6 py-2.5 text-lg"
            >
              <span>職務経歴を見る</span>
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
