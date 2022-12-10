'use strict';
import * as https from 'https';
import * as fs from 'fs';

const pathToIN = './src/IN/';

export function downloadFile(url,name) {
    https.get(url, (res) => {
        const path = `${pathToIN}${name}`;
        const writeStream = fs.createWriteStream(path);
        res.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
        });
      });
}

