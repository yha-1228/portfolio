import { twMerge } from 'tailwind-merge';
import Container from './ui/container';
import Heading1 from './ui/heading1';
import Heading2 from './ui/heading2';
import Show from './ui/unstyled/show';

const skillWords = [
  { label: 'HTML', specialty: true },
  { label: 'CSS', specialty: true },
  { label: 'Sass', specialty: true },
  { label: 'CSS in JS', specialty: true },
  { label: 'JavaScript', specialty: true },
  { label: 'TypeScript', specialty: true },
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
        rank: 'good',
        text: 'HTML, CSS, TypeScript, jQuery, Reactが扱えます。',
      },
      {
        rank: 'good',
        text: 'その他のライブラリはSwiper, Chart.js, FullCalendar, jotai等の利用経験があります。',
      },
      {
        rank: 'good',
        text: 'フロントエンドのレイヤーほぼ全てを設計・実装した経験があります。',
      },
      {
        rank: 'good',
        text: 'フルスクラッチまたはCSSライブラリでUIをコーディングできます。',
      },
      {
        rank: 'good',
        text: 'useState, useReducer, useContext, useRefを使うことができます。',
      },
      {
        rank: 'good',
        text: 'カスタムフックやRender Propsパターンを使い状態管理をモジュール化することができます。',
      },
    ],
  },
  {
    heading: 'バックエンド',
    items: [
      {
        rank: 'good',
        text: 'Node.js, TypeScript, Expressでフルに開発経験があります。',
      },
      {
        rank: 'normal',
        text: 'PHPとJavaは軽微なコーディングや基礎的な実装が可能です。PHPの方が少し得意です。',
      },
      { rank: 'good', text: 'SQLの知識があります。' },
      {
        rank: 'bad',
        text: 'マイグレーションなどORM特有の経験はありません。',
      },
      {
        rank: 'bad',
        text: 'インフラは全体的にほぼ知識がないので、勉強中です。',
      },
    ],
  },
  {
    heading: 'デザイン',
    items: [
      {
        rank: 'good',
        text: 'Webアプリの基本的なUIを1からデザインしたり、既存のデザインを引き継いで作成することができます。',
      },
      {
        rank: 'normal',
        text: 'LP色やクリエイティブコーディング色が強いものは勉強中です。',
      },
    ],
  },
  {
    heading: 'マネジメント',
    items: [
      {
        rank: 'good',
        text: '他の開発メンバーをサブリーダーとして管理し、PdMと話し合うことができます。',
      },
      { rank: 'bad', text: 'PM業務や顧客折衝の経験はありません。' },
    ],
  },
];

// ----------------------------------------

type SkillDetailCardProps = {
  heading: React.ReactNode;
  items: (typeof skillDetailData)[number]['items'];
};

function SkillDetailCard({ heading, items }: SkillDetailCardProps) {
  const items1 = items.filter((item) => item.rank === 'good');
  const items2 = items.filter((item) => item.rank === 'normal');
  const items3 = items.filter((item) => item.rank === 'bad');

  return (
    <section className="space-y-6 rounded-xl border border-solid border-gray-light-weak bg-gray-lightest px-5 py-4">
      <h4 className="border-b border-solid border-b-gray-light-weak pb-2 text-xl font-bold">
        {heading}
      </h4>

      <div>
        <Show when={items1.length > 0}>
          <h5 className="mb-3 mt-6 font-bold">可能</h5>
          <ul className="space-y-2 pl-4">
            {items1.map((item) => (
              <li key={item.text} className="list-disc leading-[1.6]">
                {item.text}
              </li>
            ))}
          </ul>
        </Show>
        <Show when={items2.length > 0}>
          <h5 className="mb-3 mt-6 font-bold">少し可能</h5>
          <ul className="space-y-2 pl-4">
            {items2.map((item) => (
              <li key={item.text} className="list-disc leading-[1.6]">
                {item.text}
              </li>
            ))}
          </ul>
        </Show>
        <Show when={items3.length > 0}>
          <h5 className="mb-3 mt-6 font-bold">未経験レベル</h5>
          <ul className="space-y-2 pl-4">
            {items3.map((item) => (
              <li key={item.text} className="list-disc leading-[1.6]">
                {item.text}
              </li>
            ))}
          </ul>
        </Show>
      </div>
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
                        "relative font-bold text-gray-foreground before:absolute before:bottom-0 before:left-0 before:h-[2.5px] before:w-full before:bg-maker-300 before:content-['']",
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
