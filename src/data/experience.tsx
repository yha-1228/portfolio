import { type ReactNode } from "react";

export interface Experience {
  kikan: string;
  title: ReactNode;
  projectCompanyName?: ReactNode;
  description?: ReactNode;
}

export interface ExperiencesOverviewItem {
  company: string;
  kikan: string;
  experiences: Experience[];
}

export const experiencesOverviewItems: ExperiencesOverviewItem[] = [
  {
    company: "自営業",
    kikan: "2023年9月 - 現在",
    experiences: [
      {
        kikan: "2024年8月 - 現在",
        title: "ポータルサイト (新規開発)",
        projectCompanyName: "株式会社LIG",
        description: (
          <>
            <p>
              記事投稿プラットフォーム・インフラ申し込み機能などを持つ新規Webサービスの立ち上げ。BtoC向け画面・管理画面の両者にてフロントエンドのレビュアーを主に担当している。
            </p>
            <p>
              <b>技術:</b> React 19, Next.js 15 (App Router), TypeScript,
              Tailwind CSS, Radix UI
            </p>
          </>
        ),
      },
      {
        kikan: "2023年9月中旬 - 2024年6月",
        title: "求人掲載システム (リニューアル)",
        projectCompanyName: "大手デジタルコンテンツ制作会社",
        description: (
          <>
            <p>
              大手アルバイト求人サイトの内部で稼働している求人掲載システムのリプレース案件。HR事業会社の従業員が使う社内管理画面・求人掲載企業向けのユーザー管理画面の2種。
            </p>
            <p>
              PJの合計は100名超であり、フロントエンドは40名超の大規模案件。その中でフロントエンド開発のリードグループとして参画した。
            </p>
            <p>
              <b>技術:</b> React 18, Next.js 13 (Pages Router), TypeScript, Sass
            </p>
          </>
        ),
      },
    ],
  },
  {
    company: "株式会社アイキューブ",
    kikan: "2019年4月 - 2023年8月",
    experiences: [
      {
        kikan: "2022年5月初旬 - 2023年7月",
        title: "SFAツール (新規開発)",
        description: (
          <>
            <p>
              大手食品メーカー向けSFAツールの新規開発案件にフロントエンド開発メンバーとして参画。
            </p>
            <p>
              顧客の営業活動を改善するため、APIは既存のシステムから切り出し、UIはReactで新規開発した。主にWebviewによるiOS
              Appとして閲覧する。
            </p>
            <p>
              <b>技術:</b> React 18, TypeScript, Sass, FullCalendar
            </p>
          </>
        ),
      },
      {
        kikan: "2020年12月 - 2022年5月初旬",
        title: "請求書管理アプリ (新規開発)",
        description: (
          <>
            <p>
              インボイス制度対応のため、医療業界向けの請求書管理ツール開発案件に開発メンバーとして参画。
            </p>
            <p>
              特定の医療器具業界は紙で請求書を管理していたが、インボイス制度の施行に伴い基準を満たす請求書をデジタルで管理することが必要になり、Webアプリの新規開発が確定。
            </p>
            <p>
              <b>技術:</b> React 17, TypeScript, CSS Modules, Node.js, Express
              4, SQL
            </p>
          </>
        ),
      },
      {
        kikan: "2020年8月 - 2020年11月",
        title: "勤怠・締め日管理アプリ (新規開発)",
        description: (
          <>
            <p>
              インフラ業界向け勤怠管理ツール開発案件に開発メンバー・テスターとして参画。
            </p>
            <p>
              勤怠管理と締め日の管理を行う小規模なWebアプリ。また、簡素なSQL生成ツールも付属する。
            </p>
            <p>
              <b>技術:</b> jQuery 3, HTML, CSS, Spring Boot, Bootstrap 4
            </p>
          </>
        ),
      },
      {
        kikan: "2020年5月 - 2020年6月",
        title: "以下同様",
      },
      {
        kikan: "2019年7月 - 2020年1月",
        title: "建物維持管理アプリ (保守)",
        description: (
          <>
            <p>
              建設業界の建物維持アプリの保守案件に、バグ調査・テスター・開発を行う保守中心のメンバーとして参画。
            </p>
            <p>
              設備管理企業の従業員が建物の点検作業に使う、WebブラウザとWindowsの両方に対応するアプリケーションの保守作業。Web版の担当だが、Windows版の担当者も交えて保守とテストを中心に参画し、一部開発も実施した。
            </p>
            <p>
              <b>技術:</b> jQuery1, HTML, CSS, PHP, SQL, CentOS
            </p>
          </>
        ),
      },
    ],
  },
];
