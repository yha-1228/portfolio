import type { Prettify } from '@/types/utils';
import type {
  MicroCMSListContent,
  MicroCMSListResponse,
} from 'microcms-js-sdk';

type Content<TFields> = Prettify<TFields & MicroCMSListContent>;

type TagFields = {
  tagName: string;
};

export type TagContent = Content<TagFields>;

type BlogFields = {
  title: string;
  body: string;
  tag: TagFields & MicroCMSListContent;
};

export type BlogContent = Content<BlogFields>;

export type BlogListResponse = Prettify<MicroCMSListResponse<BlogFields>>;
