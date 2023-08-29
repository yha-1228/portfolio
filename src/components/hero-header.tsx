import { TbArrowRight } from 'react-icons/tb';
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
              fullWidth
              rightIcon={<TbArrowRight style={{ fontSize: 20 }} />}
            >
              職務経歴を見る
            </ButtonLink>
          </div>
          <div className="hidden lg:block">
            <ButtonLink
              href={routes.experience.href}
              className="px-7"
              rightIcon={<TbArrowRight style={{ fontSize: 20 }} />}
            >
              職務経歴を見る
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
