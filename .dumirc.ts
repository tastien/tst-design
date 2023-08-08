import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/tst-design',
  publicPath: '/tst-design/',
  favicons: [
    'data:image/png;base64,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',
  ],
  outputPath: 'docs-dist',
  themeConfig: {
    hd: { rules: [] },
    rtl: true,
    name: 'Tst Design',
    nav: [
      {
        title: '',
        link: '/components/export-button',
      },
    ],
    logo: 'data:image/png;base64,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',
    footer: 'tastaien | Copyright © 2023-present',
    prefersColor: { default: 'light', switch: true },
    socialLinks: {
      github: 'https://github.com/tastien/tst-design',
    },
  },
  theme: {
    '@c-primary': '#b62021',
    'primary-color': '#b62021',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'react-vant',
        libraryDirectory: 'es',
        style: true,
      },
      'react-vant',
    ],
  ],
  chainWebpack: function (config: any) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }: any) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
