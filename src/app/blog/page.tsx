import { type Metadata } from "next";
import Link from "next/link";
import { getBlogList } from "@/api/clients/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Tag } from "@/components/ui/styled/tag";
import { routes } from "@/routes";
import { clsx } from "@/utils/css/clsx";
import { formatISODate } from "@/utils/date/formatter";

export const metadata: Metadata = {
  title: "ブログ",
};

export default async function Page() {
  const { contents } = await getBlogList();

  return (
    <div className="py-14">
      <Container>
        <section className="space-y-6">
          <Heading1>ブログ</Heading1>
          <ul className="space-y-4">
            {contents.map((content) => (
              <li key={content.id}>
                <Link
                  href={routes.blog.routes[":id"].href(content.id)}
                  className={clsx(
                    "group block rounded-md border border-solid border-gray-light-300 px-5 py-4 transition-colors duration-200 ease-out",
                    "active:outline active:outline-2 active:outline-offset-0 active:outline-primary-600",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary-600",
                  )}
                >
                  <div className="text-xl font-bold underline-offset-4 group-hover:underline">
                    {content.title}
                  </div>
                  <p className="text-sm text-gray-foreground-weak">
                    {formatISODate(content.publishedAt)}に投稿
                  </p>
                  <Tag className="mt-5">{content.tag.tagName}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
