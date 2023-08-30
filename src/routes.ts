export const routes = {
  index: {
    href: '/',
    label: 'トップ',
  },
  experience: {
    href: '/experience',
    label: '職務経歴',
  },
  blog: {
    href: '/blog',
    label: 'ブログ',
    routes: {
      ':id': {
        generateHref: (id: string) => `/blog/${id}`,
      },
    },
  },
} as const;
