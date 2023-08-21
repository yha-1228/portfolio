import { twMerge } from 'tailwind-merge';
import Container from './ui/container';
import Heading1 from './ui/heading1';
import Heading2 from './ui/heading2';

const skillWords = [
  { label: 'HTML', specialty: true },
  { label: 'CSS', specialty: true },
  { label: 'Sass', specialty: true },
  { label: 'CSS in JS', specialty: true },
  { label: 'jQuery' },
  { label: 'React', specialty: true },
  { label: 'Next.js' },
  { label: 'Node.js' },
  { label: 'Express', specialty: true },
  { label: 'PHP' },
  { label: 'Java' },
  { label: 'SQL' },
  { label: 'Figma' },
  { label: 'Git' },
];

const skillDetailData = [
  {
    heading: 'フロントエンド',
    items: [
      {
        mark: 'good',
        text: 'HTML, CSS, TypeScript, jQuery, Reactが扱えます。',
      },
      {
        mark: 'good',
        text: 'その他のライブラリはSwiper, Chart.js, FullCalendar, jotai等の利用経験があります。',
      },
      {
        mark: 'good',
        text: 'フロントエンドのレイヤーほぼ全てを設計・実装した経験があります。',
      },
      {
        mark: 'good',
        text: 'フルスクラッチまたはCSSライブラリでUIをコーディングできます。',
      },
      {
        mark: 'good',
        text: 'useState, useReducer, useContext, useRefを使うことができます。',
      },
      {
        mark: 'good',
        text: 'カスタムフックやRender Propsパターンを使い状態管理をモジュール化することができます。',
      },
    ],
  },
  {
    heading: 'バックエンド',
    items: [
      {
        mark: 'good',
        text: 'Node.js, TypeScript, Expressでフルに開発経験があります。',
      },
      { mark: 'normal', text: 'PHPは軽微な読み書きや実装ができます。' },
      { mark: 'good', text: 'SQLの知識があります。' },
      {
        mark: 'normal',
        text: 'マイグレーションやn+1などORM特有の経験はありません。',
      },
      {
        mark: 'bad',
        text: 'インフラは全体的にほぼ知識がないので、勉強中です。',
      },
    ],
  },
  {
    heading: 'デザイン',
    items: [
      {
        mark: 'good',
        text: 'Webアプリの基本的なUIを1からデザインしたり、既存のデザインを引き継いで作成することができます。',
      },
      {
        mark: 'normal',
        text: 'LP色やクリエイティブコーディング色が強いものは勉強中です。',
      },
    ],
  },
  {
    heading: 'マネジメント',
    items: [
      {
        mark: 'good',
        text: '他の開発メンバーをサブリーダーとして管理し、PdMと話し合うことができます。',
      },
      { mark: 'bad', text: 'PM業務や顧客折衝の経験はありません。' },
    ],
  },
];

// ----------------------------------------

type SkillDetailCardProps = {
  heading: React.ReactNode;
  items: (typeof skillDetailData)[number]['items'];
};

function SkillDetailCard({ heading, items }: SkillDetailCardProps) {
  return (
    <section className="space-y-6 rounded-xl border border-solid border-gray-light-weak bg-gray-lightest px-5 py-4">
      <h4 className="border-b border-solid border-b-gray-light-weak pb-2 text-xl font-bold">
        {heading}
      </h4>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.text}
            className={twMerge(
              'pl-7 -indent-7 leading-[1.6] before:me-1 before:h-full before:px-1',
              item.mark === 'good' && "before:content-['✅']",
              item.mark === 'normal' && "before:content-['🔺']",
              item.mark === 'bad' && "before:content-['❗']"
            )}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ----------------------------------------

export default function Skills() {
  return (
    <div className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>スキル</Heading1>
          <div>
            <div>
              <div className="flex flex-wrap gap-x-3 gap-y-[10px]">
                {skillWords.map((skillWord) => (
                  <div
                    key={skillWord.label}
                    className={twMerge(
                      'whitespace-nowrap text-xl leading-[1.25] text-gray-500',
                      skillWord.specialty &&
                        "relative font-bold text-gray-foreground before:absolute before:bottom-0 before:left-0 before:h-[2.5px] before:w-full before:bg-maker-300 before:content-['']"
                    )}
                  >
                    {skillWord.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <section className="space-y-5">
                <Heading2>詳細</Heading2>
                <ul className="space-y-6">
                  {skillDetailData.map((skillDetail) => (
                    <li key={skillDetail.heading}>
                      <SkillDetailCard
                        heading={skillDetail.heading}
                        items={skillDetail.items}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
