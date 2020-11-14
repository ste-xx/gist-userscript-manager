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
            manifest.key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuOA55Y/VfUyydcI2cWcezmCtvDjZ0ANF7eyq5SCvWiVvCca+qInh91GipobJQb3iFw5GXN0as4pJKbZg6pNRKn285Fo0uyegsdGMnXy//2tZ/yOgX7QiI0LM5XBc+NUPVER+QBsE/gbflKb0g3Z5aUcSJWreHxPqs8+PD/o2v6Z8YEmnEwDhn8w/YXmOiqnDrW4+4wEo49oOQYuVvehfFpE4dm8h9W/47tQNI2lmPrN7U8FTqdZnksmaUBUXaUUzIxhCDA3krYK/h+PrQq4i1F9hGt3YPDRhvkmNrZQsclfS+BdYE3yuWoNIQTJYO2xIhsrub4vBhvyl9W9SmPdyQIDAQAB";
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
