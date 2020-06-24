const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../packages/**/*.stories.(tsx)'],
  addons: [
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    'storybook-addon-performance/register',
    'storybook-addon-themes/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs/register',
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

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {},
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

    config.resolve.extensions.push('.ts', '.tsx', '.json');

    return config;
  },
};
