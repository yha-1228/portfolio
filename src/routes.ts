export interface Route {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  href: string | ((...args: any[]) => string);
  label?: string;
  routes?: Record<string, Route>;
}

export const routes = {
  index: {
    href: "/",
    label: "トップ",
  },
  experience: {
    href: "/experience",
    label: "職務経歴",
  },
  blog: {
    href: "/blog",
    label: "ブログ",
    routes: {
      ":id": {
        href: (id: string) => `/blog/${id}`,
      },
    },
  },
} as const satisfies Record<string, Route>;
