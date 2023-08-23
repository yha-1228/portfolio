import Layout from '@/components/layout';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import Heading2 from '@/components/ui/heading2';
import Timeline, { TimelineItem } from '@/components/ui/timeline';

const items: TimelineItem[] = [
  {
    time: '2022/05 - 2023/07',
    heading: 'SFAツールの開発',
    content: (
      <>
        <p>
          大手食品メーカーに向けSFAツールの新規開発案件にフロントエンド開発メンバーとして参画。
        </p>
        <p>
          某大手食品メーカーに向けたSFA(営業支援)ツールの新規開発案件に参画。バックエンドは既存のモノリシックなCRMシステムをAPI化し、フロントエンドはUIを1から刷新することで開発が進められた。
        </p>
      </>
    ),
  },
  {
    time: '2020/12 - 2022/05',
    heading: '請求書管理アプリの開発',
    content: (
      <>
        <p>
          インボイス制度対応のため、医療業界向けの請求書管理ツール開発案件に開発メンバーとして参画。
        </p>
        <p>
          特定の医療器具業界は紙で請求書を管理していたが、インボイス制度の施行に伴い基準を満たす請求書をデジタルで管理することが必要になり、Webアプリの新規開発が確定。
        </p>
      </>
    ),
  },
  {
    time: '2020/08 - 2020/11',
    heading: '勤怠・締め日管理アプリの開発',
    content: (
      <>
        <p>
          インフラ業界向け勤怠管理ツール開発案件に開発メンバー・テスターとして参画。
        </p>
        <p>
          勤怠管理と締め日の管理を行う小規模なWebアプリ。また、簡素なSQL生成ツールも付属する。
        </p>
      </>
    ),
  },
  {
    time: ['2019/07 - 2020/01', '2020/05 - 2020/06'],
    heading: '建物維持管理アプリの保守',
    content: (
      <>
        <p>
          建設業界の建物維持アプリの保守案件に、バグ調査・テスター・開発を行う保守中心のメンバーとして参画。
        </p>
        <p>
          設備管理企業の従業員が建物の点検作業に使う、WebブラウザとWindowsの両方に対応するアプリケーションの保守作業。Web版の担当だが、Windows版の担当者も交えて保守とテストを中心に参画し、一部開発も実施した。
        </p>
      </>
    ),
  },
];

export default function Experience() {
  return (
    <Layout title="職務経歴">
      <div className="py-8">
        <Container>
          <section className="space-y-6">
            <Heading1>職務経歴</Heading1>
            <section className="mt-12 space-y-5">
              <div className="space-y-1">
                <Heading2>株式会社アイキューブ</Heading2>
                <div className="text-sm text-gray-500">2019/04 - 2023/08</div>
              </div>
              <Timeline items={items} />
            </section>
          </section>
        </Container>
      </div>
    </Layout>
  );
}
