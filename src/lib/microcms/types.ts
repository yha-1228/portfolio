export type TagName = '技術' | '日常';

export type BlogContent = {
  id: string;
  title: string;
  body: string;
  tag: {
    id: '6xcvtv-9a1';
    createdAt: '2023-08-29T21:40:54.541Z';
    updatedAt: '2023-08-29T21:40:54.541Z';
    publishedAt: '2023-08-29T21:40:54.541Z';
    revisedAt: '2023-08-29T21:40:54.541Z';
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
