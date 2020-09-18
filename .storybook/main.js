const path = require('path');

module.exports = {
   stories: ['../examples/**/*.stories.tsx'],
   addons: ['@storybook/addon-knobs'],
   webpackFinal: async config => {
      config.module.rules.push({
         test: /\.(ts|tsx)$/,
         use: [
            {
               loader: require.resolve('babel-loader'),
               options: {
                  cwd: path.resolve(''),
                  presets: [['react-app', { flow: false, typescript: true }]],
               },
            },
         ],
      });

      config.resolve.extensions.push('.ts', '.tsx');

      return config;
   },
};
