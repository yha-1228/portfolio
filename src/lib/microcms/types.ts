export type BlogContent = {
  id: string;
  title: string;
  body: string;
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
