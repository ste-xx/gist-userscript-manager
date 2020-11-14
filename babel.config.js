const vueCliPreset = require('@vue/cli-plugin-babel/preset');

/*
 * Because browserslist "last 2 Chrome versions" already supports optional chaining and nullish coalescing,
 * @vue/cli-plugin-babel/preset will not transpile them. Unfortunately webpack 4 does not support them, that's why we
 * are adding them here again. Optional chaining and nullish coalescing are supported in webpack 5, but vue cli does not
 * support webpack 5 yet.
 */
const customVuePreset = (context, options = {}) => {
  const preset = vueCliPreset(context, options);
  preset.overrides[0].plugins.push("@babel/plugin-proposal-nullish-coalescing-operator");
  preset.overrides[0].plugins.push("@babel/plugin-proposal-optional-chaining");
  return preset;
};

module.exports = {
  presets: [
    customVuePreset(),
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript'
  ]
};
