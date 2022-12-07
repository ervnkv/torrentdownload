'use strict';
import * as https from 'https';
import * as fs from 'fs';
import {QBittorrent} from '@ctrl/qbittorrent';

// Настройка торрентов в QBittorrent
const client = new QBittorrent({
  baseUrl: 'http://localhost:8080/',
  username: 'admin',
  password: 'password',
});

function addTorrent(torrentFile) {
  const result = client.addTorrent(fs.readFileSync(torrentFile));
  // console.log(result);
}
function allTorrents() {
  const data = client.getAllData();
  // console.log(data.torrents);
}


export function downloadFile(url,folder,name) {
    https.get(url, (res) => {
        const path = `${folder}/${name}`;
        const writeStream = fs.createWriteStream(path);
      
        res.pipe(writeStream);
      
        writeStream.on('finish', () => {
          writeStream.close();
          console.log('Download Completed');
          addTorrent(path);
          console.log('Torrent started');
        });
      });
}

