import type { MicroCMSListContent } from 'microcms-js-sdk';

export interface TagFields {
  tagName: string;
}

export interface BlogFields {
  title: string;
  body: string;
  tag: TagFields & MicroCMSListContent;
}
