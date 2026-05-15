import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'dagstack config',
  tagline: 'A hierarchical configuration stack with YAML and environment variables, sources, secrets, and hot reload — one contract for Python, TypeScript, and Go.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Public URL — GitHub Pages on a custom subdomain.
  url: 'https://config.dagstack.dev',
  baseUrl: '/',

  organizationName: 'dagstack',
  projectName: 'config-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr', htmlLang: 'en-US' },
      ru: { label: 'Русский', direction: 'ltr', htmlLang: 'ru-RU', path: 'ru', translate: true },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/dagstack/config-docs/_edit/main/site/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'ru'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themeConfig: {
    navbar: {
      title: 'config',
      logo: {
        alt: 'dagstack',
        src: 'img/logo-mark.svg',
        srcDark: 'img/logo-mark-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/dagstack/config-spec',
          label: 'Specification',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Quick start', to: '/docs/intro' },
            { label: 'Concepts', to: '/docs/concepts/sources' },
            { label: 'Guides', to: '/docs/guides/declaring-section' },
            { label: 'API reference', to: '/docs/api/python' },
          ],
        },
        {
          title: 'config',
          items: [
            { label: 'Specification (ADR overview)', to: '/docs/spec/overview' },
            { label: 'Full spec repository', href: 'https://github.com/dagstack/config-spec' },
            { label: 'Python binding', href: 'https://github.com/dagstack/config-python' },
            { label: 'TypeScript binding (roadmap)', href: 'https://github.com/dagstack/config-typescript' },
          ],
        },
        {
          title: 'dagstack ecosystem',
          items: [
            { label: 'plugin-system — plugin registry', href: 'https://github.com/dagstack/plugin-system-spec' },
            { label: 'logger — OTel-compatible logging', href: 'https://github.com/dagstack/logger-spec' },
            { label: 'tenancy — multi-tenancy model', href: 'https://github.com/dagstack/tenancy-spec' },
            { label: 'tenant-registry — SQL tenant registries', href: 'https://github.com/dagstack/tenant-registry-spec' },
            { label: 'postgres — shared database patterns', href: 'https://github.com/dagstack/postgres-spec' },
            { label: 'All repositories', href: 'https://github.com/dagstack' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} dagstack. Licensed under Apache-2.0.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'go', 'bash', 'toml'],
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
