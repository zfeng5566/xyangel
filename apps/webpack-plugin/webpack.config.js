const { merge } = require('webpack-merge');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HelloWorldPlugin = require('./webpack.html.plugin');
const CalcZhPlugin = require('./plugins/calc.zh.plugin');
process.env['NX_COMMIT_HASH'] = '123213';
module.exports = (config, context) => {
    config.module.rules[2].options.ast = true;

    return merge(config, {
        plugins: [
            // new MonacoWebpackPlugin(
            //     {
            //         languages: ['typescript', 'javascript', 'css','json']
            //     }
            // ),
            new CalcZhPlugin(),
        ],
    });
};
