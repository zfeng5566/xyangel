import path = require('path');
import LineByLine = require('n-readlines');
import fs = require('fs-extra');

export const extract = (filePath: string) => {
    const liner = new LineByLine(filePath);
    let line;
    let prevContent = '';
    let currentContent = '';

    const result: { fileName: string; cdnUrl: string }[] = [];

    while ((line = liner.next())) {
        prevContent = currentContent;
        currentContent = line.toString('utf-8');
        if (
            currentContent.startsWith('CDNUrl') &&
            prevContent.startsWith('FileName')
        ) {
            result.push({
                fileName: prevContent,
                cdnUrl: currentContent,
            });
        }
    }

    const linkArray: string[] = [];
    result.forEach((item) => {
        const fileName = item.fileName.match(/sirius-desktop\S*/);
        const url = item.cdnUrl.match(/https:\/\/[\w/.-]+/);
        if (fileName && url) {
            linkArray.push(`${url[0]}?download=${fileName[0]}`);
        }
    });

    return linkArray.join('\n');
};

export const emitFile = (fileName: string, content: string) => {
    fs.outputFileSync(path.resolve(process.cwd(), fileName), content, {
        encoding: 'utf-8',
    });
};
