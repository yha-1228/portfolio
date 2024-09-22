import type {
  MicroCMSListContent,
  MicroCMSListResponse,
} from 'microcms-js-sdk';

type Content<TFields> = TFields & MicroCMSListContent;

interface TagFields {
  tagName: string;
}

export type TagContent = Content<TagFields>;

interface BlogFields {
  title: string;
  body: string;
  tag: TagFields & MicroCMSListContent;
}

export type BlogContent = Content<BlogFields>;

export type BlogListResponse = MicroCMSListResponse<BlogFields>;
