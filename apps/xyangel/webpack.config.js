const { merge } = require('webpack-merge');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HelloWorldPlugin = require('./webpack.html.plugin')

module.exports = (config, context) => {
  return merge(config, {
    plugins:[
        new MonacoWebpackPlugin(
            {
                languages: ['typescript', 'javascript', 'css','json']
            }
        ),
        new HelloWorldPlugin()
    ]
  });
};