export interface SkillWord {
  label: string;
  strong?: boolean;
  category: "fe" | "be" | "tools";
}

export const skillWords: SkillWord[] = [
  { category: "fe", label: "React", strong: true },
  { category: "fe", label: "Next.js" },
  { category: "fe", label: "TypeScript", strong: true },
  { category: "fe", label: "CSS, Sass", strong: true },
  { category: "fe", label: "Tailwind CSS", strong: true },
  { category: "fe", label: "jQuery" },
  { category: "fe", label: "jotai", strong: true },
  { category: "be", label: "TypeScript", strong: true },
  { category: "be", label: "Node.js", strong: true },
  { category: "be", label: "Express", strong: true },
  { category: "be", label: "PHP" },
  { category: "be", label: "SQL" },
  { category: "tools", label: "Visual Studio Code", strong: true },
  { category: "tools", label: "GitHub" },
  { category: "tools", label: "Notion" },
  { category: "tools", label: "Jira" },
  { category: "tools", label: "Redmine" },
  { category: "tools", label: "Figma" },
];

export type Rank = "good" | "normal" | "bad";

export interface SkillDetail {
  category: string;
  items: Array<{ rank: Rank; text: string }>;
}

export const skillDetails: SkillDetail[] = [
  {
    category: "フロントエンド",
    items: [
      {
        rank: "good",
        text: "JSX・CSSを利用したUIのマークアップ",
      },
      {
        rank: "good",
        text: "デザインに柔軟に対応し、機能性・拡張性を備えたコンポーネントライブラリの構築",
      },
      {
        rank: "good",
        text: "動的な変化の中でUXを担保した画面の実装",
      },
      {
        rank: "good",
        text: "Swiper・Chart.js・FullCalendar・jotai・Recoil等の発展的なライブラリの利用経験",
      },
      {
        rank: "good",
        text: "プロジェクト構成・BE連携・認証・コンポーネント設計・Lintをはじめとした初期からのアーキテクチャ設計",
      },
      {
        rank: "good",
        text: "様々な規模・領域・実装パターンに対応した状態管理の設計",
      },
      {
        rank: "good",
        text: "BE・デザイン・アーキとの連携",
      },
    ],
  },
  {
    category: "バックエンド",
    items: [
      {
        rank: "normal",
        text: "Node.js, TypeScript, Express, SQLを利用した設計からの開発",
      },
      { rank: "normal", text: "REST APIの設計" },
      {
        rank: "normal",
        text: "クリーンアーキテクチャやMVCを参考にしたフレームワークの設計",
      },
      {
        rank: "normal",
        text: "SQL・PHP等の知識",
      },
    ],
  },
  {
    category: "デザイン",
    items: [
      {
        rank: "normal",
        text: "シンプルな管理ツールのUIデザイン",
      },
      {
        rank: "normal",
        text: "シンプルな静的サイトのUIデザイン",
      },
    ],
  },
  {
    category: "チーム開発",
    items: [
      { rank: "normal", text: "初級者メンバーの教育" },
      { rank: "normal", text: "教育用のWikiの作成" },
      { rank: "normal", text: "勉強会の開催" },
      { rank: "normal", text: "継続的なコードレビュー" },
      { rank: "normal", text: "BEのAPIに対するレビューや提案" },
      {
        rank: "normal",
        text: "大規模プロジェクトにおけるFEリード内の提案や議論",
      },
    ],
  },
];
