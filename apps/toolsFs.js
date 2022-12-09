'use strict';
import * as https from 'https';
import * as fs from 'fs';

export function downloadFile(url,folder,name) {
    https.get(url, (res) => {
        const path = `${folder}/${name}`;
        const writeStream = fs.createWriteStream(path);
        res.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          console.log(`Document saved in ${folder}`);
        });
      });
}

