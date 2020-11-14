/* eslint-disable */
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const {version} = require('./package.json');

module.exports = {
  chainWebpack: config => {
    const copyPluginPatterns = [
      {
        from: 'src/manifest.json',
        to: 'manifest.json',
        transform(content) {
          const manifest = JSON.parse(content);

          manifest.version = `${version}.0`;

          return JSON.stringify(manifest, null, 2);
        }
      },
      { from: 'res', to: 'res' },
      { from: 'src/devtools.html', to: 'devtools.html'},
      { from: 'src/devtools.js', to: 'devtools.js'},
    ];

    config
      .plugin('reloader').use(ExtensionReloader).end()
      .plugin('monacoEditor').use(MonacoWebpackPlugin).end()
      .plugin('copy').use(CopyPlugin, [{patterns: copyPluginPatterns}]).end()
      .optimization.delete('splitChunks').end()

    // .gql files
    config.module.rule('gql')
      .test(/\.gql$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('raw-loader')
        .loader('raw-loader')
  },
  filenameHashing: false,
  parallel: false
};
