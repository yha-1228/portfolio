import { type Metadata } from "next";
import { BsChevronLeft } from "react-icons/bs";
import { getBlogDetail, getBlogList } from "@/api/clients/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Tag } from "@/components/ui/styled/tag";
import { TextLink } from "@/components/ui/styled/text-link";
import { routes } from "@/routes";
import { clsx } from "@/utils/css/clsx";
import { formatISODate } from "@/utils/date/formatter";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const blogDetail = await getBlogDetail(id);

  return {
    title: blogDetail.title,
  };
}

export async function generateStaticParams() {
  const { contents } = await getBlogList();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const blogDetail = await getBlogDetail(id);

  return (
    <div className="py-14">
      <Container className="md:max-w-screen-md">
        <TextLink
          href={routes.blog.href}
          className="inline-flex items-center space-x-1"
        >
          <BsChevronLeft />
          <span>戻る</span>
        </TextLink>

        <article className="mt-8">
          <header>
            <Heading1>{blogDetail.title}</Heading1>
            <p className="mt-4 text-sm font-normal text-gray-foreground-weak">
              {formatISODate(blogDetail.publishedAt)} に投稿
            </p>
          </header>
          <div className="mt-8 border-t border-solid border-t-gray-light-300 py-5 md:py-6">
            <Tag>{blogDetail.tag.tagName}</Tag>
            <div
              className={clsx(
                "pt-4",
                "[&>h2]:mb-6 [&>h2]:mt-12 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:leading-tight",
                "[&>p]:my-5",
                "[&>ul]:pl-9",
                "[&>ul>li]:list-disc",
                "[&>hr]:my-6 [&>hr]:border-y-2 [&>hr]:text-gray-light-200",
              )}
              dangerouslySetInnerHTML={{
                __html: blogDetail.body,
              }}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}
