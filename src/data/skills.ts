export const skillWords = [
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

export type Rank = 'good' | 'normal' | 'bad';

export type SkillDetail = {
  category: string;
  items: { rank: Rank; text: string }[];
};

export const skillDetails: SkillDetail[] = [
  {
    category: 'フロントエンド',
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
    category: 'バックエンド',
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
    category: 'デザイン',
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
    category: 'マネジメント',
    items: [
      {
        rank: 'good',
        text: '他の開発メンバーをサブリーダーとして管理し、PdMと話し合うことができます。',
      },
      { rank: 'bad', text: 'PMの経験はありません。' },
    ],
  },
];
