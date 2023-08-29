export const routes = {
  index: {
    href: '/',
    label: 'トップ',
    hierarchy: 1,
  },
  experience: {
    href: '/experience',
    label: '職務経歴',
    hierarchy: 1,
  },
  blog: {
    href: '/blog',
    label: 'ブログ',
    hierarchy: 1,
    children: {
      ':id': {
        generateHref: (id: string) => `/blog/${id}`,
        hierarchy: 2,
      },
    },
  },
} as const;
