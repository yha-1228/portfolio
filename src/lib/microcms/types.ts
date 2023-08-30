export type TagName = '技術' | '日常';

export type BlogContent = {
  id: string;
  title: string;
  body: string;
  tag: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    tagName: TagName;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type ClientResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
