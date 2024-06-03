type Item = {
  company: string;
  kikan: string;
  experiences: Array<{
    kikan: string;
    title: React.ReactNode;
    description?: React.ReactNode;
  }>;
};

export const items: Item[] = [
  {
    company: '自営業',
    kikan: '2023/09 - 現在',
    experiences: [
      {
        kikan: '2023/09 - 2024/06',
        title: (
          <>
            求人掲載サイト開発 <br />
            <div className="mt-2 text-lg font-normal text-gray-foreground">
              (大手受託制作会社)
            </div>
          </>
        ),
        description: (
          <>
            <p>
              大手HR事業会社が提供する求人掲載サイトのリプレース。HR事業会社向け管理画面、求人掲載クライアント向け管理画面が該当する。
              2006年から保守されていたモノリスアプリケーションをSPAに刷新するプロジェクトであり、フロントエンド側を担当。
            </p>
            <p>
              PJの合計は100名超であり、フロントエンドは40名超の大規模案件。その中でフロントエンド開発のリードグループとして参画した。
            </p>
            <p>
              <b>扱った技術:</b> React(Next.js), TypeScript, Sass
            </p>
          </>
        ),
      },
    ],
  },
  {
    company: '株式会社アイキューブ',
    kikan: '2019/04 - 2023/08',
    experiences: [
      {
        kikan: '2022/05 - 2023/07',
        title: 'SFAツールの開発',
        description: (
          <>
            <p>
              大手食品メーカーに向けSFAツールの新規開発案件にフロントエンド開発メンバーとして参画。
            </p>
            <p>
              某大手食品メーカーに向けたSFA(営業支援)ツールの新規開発案件に参画。バックエンドは既存のモノリシックなCRMシステムをAPI化し、フロントエンドはUIを1から刷新することで開発が進められた。
            </p>
            <p>
              <b>扱った技術:</b> React, TypeScript, Sass
            </p>
          </>
        ),
      },
      {
        kikan: '2020/12 - 2022/05',
        title: '請求書管理アプリの開発',
        description: (
          <>
            <p>
              インボイス制度対応のため、医療業界向けの請求書管理ツール開発案件に開発メンバーとして参画。
            </p>
            <p>
              特定の医療器具業界は紙で請求書を管理していたが、インボイス制度の施行に伴い基準を満たす請求書をデジタルで管理することが必要になり、Webアプリの新規開発が確定。
            </p>
            <p>
              <b>扱った技術:</b> React, TypeScript, CSS Modules, Express, SQL
            </p>
          </>
        ),
      },
      {
        kikan: '2020/08 - 2020/11',
        title: '勤怠・締め日管理アプリの開発',
        description: (
          <>
            <p>
              インフラ業界向け勤怠管理ツール開発案件に開発メンバー・テスターとして参画。
            </p>
            <p>
              勤怠管理と締め日の管理を行う小規模なWebアプリ。また、簡素なSQL生成ツールも付属する。
            </p>
            <p>
              <b>扱った技術:</b> jQuery, HTML, CSS, Spring Boot, Bootstrap
            </p>
          </>
        ),
      },
      {
        kikan: '2020/05 - 2020/06',
        title: '以下同様',
      },
      {
        kikan: '2019/07 - 2020/01',
        title: '建物維持管理アプリの保守',
        description: (
          <>
            <p>
              建設業界の建物維持アプリの保守案件に、バグ調査・テスター・開発を行う保守中心のメンバーとして参画。
            </p>
            <p>
              設備管理企業の従業員が建物の点検作業に使う、WebブラウザとWindowsの両方に対応するアプリケーションの保守作業。Web版の担当だが、Windows版の担当者も交えて保守とテストを中心に参画し、一部開発も実施した。
            </p>
            <p>
              <b>扱った技術:</b> jQuery, HTML, CSS, PHP, SQL, CentOS
            </p>
          </>
        ),
      },
    ],
  },
];
