const { merge } = require('webpack-merge');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (config, context) => {
  return merge(config, {
    plugins:[
        new MonacoWebpackPlugin(
            {
                languages: ['typescript', 'javascript', 'css','json']
            }
        )
    ]
  });
};