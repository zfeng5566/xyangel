#!/usr/bin/env node
import { Command } from 'commander';
import path = require('path');

import { extract, emitFile } from '../lib/sirius-nohup';
const program = new Command();

program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.8.0');

program
    .command('split')
    .description('Split a string into substrings and display as an array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });

program
    .command('publish')
    .description(
        '读取nohup.out文件，获取灵犀办公安装包信息，并完成拼接输出到指定文件'
    )
    .argument('<inputFilePath>', 'nohup.out文件路径')
    .argument('<outputFilepath>', '输出路径')
    .action((inputPath, outputPath) => {
        emitFile(
            path.resolve(process.cwd(), outputPath),
            extract(path.resolve(process.cwd(), inputPath))
        );
    });

program.parse();
