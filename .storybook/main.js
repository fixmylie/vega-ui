const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    'storybook-addon-performance/register',
    'storybook-addon-themes/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs/register',
  ],
  presets: [
    { name: '@storybook/addon-docs/preset', options: { configureJSX: true } },
    // {
    //   name: '@storybook/preset-typescript',
    //   options: {
    //     include: [path.resolve(__dirname, '../packages')],
    //   },
    // },
  ],
  webpackFinal: async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.filter((f) => f.test.toString() !== '/\\.css$/');

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      enforce: 'pre',
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: 'react-docgen-typescript-loader',
          options: {
            tsconfigPath: path.resolve('tsconfig.storybook.json'),
          },
        },
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-env'),
              require.resolve('@emotion/babel-preset-css-prop'),
            ],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
      ],
    });
    // eslint-disable-next-line no-param-reassign
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.storybook.json',
      }),
    ];

    // eslint-disable-next-line no-param-reassign
    config.devServer = { stats: { warningsFilter: /export .* was not found in/ } };

    config.resolve.extensions.push('.ts', '.tsx', '.json', 'mdx');

    return config;
  },
};
