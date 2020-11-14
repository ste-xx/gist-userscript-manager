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

          if (process.env.INCLUDE_KEY === 'true') {
            manifest.key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg8eYUxVzvqDLHWq3z93P"+
              "tJ/9gOv84r7yLJ3r311VBZW9GmzMmgFsPKAF9Bfcr2dNYCwU6W72Z+stxYNnfgz8" +
              "5HXBELbearnsDpzF56TlSJNhWqE2/6HTn32qZ6dI5Pnq7oEhUITkbWESePvw3k2j" +
              "V0vTp6yJSFIyP+2+dP7/m6KOfcBhuJZi6RsDdfIw35XOJ+ORnfVJ3v1d5m0wAGF4" +
              "aUlgHsN8SIn043YZb7w+upuiCrmxHjhi6a+NY80tlMZDG7Fyi25KBSsjvrsC2HWR" +
              "lF6snolockJWWpwr+tmLIgazpXV9Z1YLZWExBKq2iiSPLKEdTjep1mngeNqYvkuZ" +
              "nQIDAQAB";
          }

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
      .optimization.delete('splitChunks').end();


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
