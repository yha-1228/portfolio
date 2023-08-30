import { Prettify } from '@/types';

export type Base = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type Tag = Prettify<
  Base & {
    tagName: string;
  }
>;

export type BlogContent = Prettify<
  Base & {
    title: string;
    body: string;
    tag: Tag;
  }
>;

export type ClientResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
