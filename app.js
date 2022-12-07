'use strict';
import {Telegraf} from 'telegraf';
import {TOKEN} from './apps/config.js';
import {downloadFile} from './apps/download.js';
import {createRar} from './apps/archive.js';


import * as https from 'https';
import * as fs from 'fs';

import {QBittorrent} from '@ctrl/qbittorrent';
const pathToIn = 'src/IN';
const torrentName = 'Кулинария. Вилки против ножей.torrent';
const magnetLink = 'magnet:?xt=urn:btih:E8F21F15F1E71730E584499BC09C27234B230D11&tr=http%3A%2F%2Fbt4.t-ru.org%2Fann%3Fmagnet&dn=Кулинария.%20Вилки%20против%20ножей%20-%20Сарно%20Ч.%2C%20Сарно%20Д.%2C%20Иоахим%20Д.%20-%20Неприлично%20полезная%20кулинарная%20книга%20%5B2019%2C%20DjVu%2C%20RUS%5D';
const torrentFile = `${pathToIn}/${torrentName}`;
// Настройка торрентов в QBittorrent
const client = new QBittorrent({
  baseUrl: 'http://localhost:8080/',
  username: 'admin',
  password: 'password',
});
// client.addTorrent(fs.readFileSync(torrentFile), {'paused' : 'true'}); // Работает
let torrentsAllData = await(client.getAllData()); // Работает

let torrents = [];
for (let torrent of torrentsAllData.torrents) {
  let torrentData = {};
  torrentData.hash =  torrent.id;
  torrentData.name =  torrent.name;
  torrents.push(torrentData);
  await(client.resumeTorrent(torrent.id));
}
let torrentsFiles = [];
for (let torrent of torrents) {
  let allFiles = await(client.torrentFiles(torrent.hash));
  let fileData = [];
  for (let file of allFiles) {
    fileData.push(torrent.hash);
    fileData.push(file.index);
    fileData.push(file.name);
    // listFiles.push(file.size);
  }
  torrentsFiles.push(fileData);
  // torrentsFiles.push(allFiles);
}

// for (let file of torrentsFiles) {
//   let torrentHash = file[0];
//   let fileIndex = `${file[1]}`;
//   let priority = 7; // 0,1,6,7
//   await(client.setFilePriority(torrentHash, fileIndex, priority));
// }
// так нельзя, надо упаковать id в одну строку с разделителем|



await(client.resumeTorrent('e8f21f15f1e71730e584499bc09c27234b230d11')); //Работает
await(client.setFilePriority('e8f21f15f1e71730e584499bc09c27234b230d11', '0', 7)); //Работает (0,1,6,7)


console.log(typeof(`${4}`));



// async setFilePriority(hash, fileIds, priority)

// let files = torrentFiles(hash);

// function addTorrent(torrentFile) {
//   const result = client.addTorrent(fs.readFileSync(torrentFile));
//   // console.log(result);
// }
// function allTorrents() {
//   const data = client.getAllData();
//   // console.log(data.torrents);
// }





// Настройка логики бота
// const bot = new Telegraf(TOKEN);

// bot.start((ctx) => ctx.reply('Привет!\r\nПришли сюда .torrent файл или magnet-ссылку.'));

// bot.on('document', (ctx) => {
//     const doc = ctx.message.document;
//     const fileName = doc.file_name;
//     if (fileName.includes('.torrent')) {
//         const fileId = doc.file_id;
//         let fileUrl = '';
//         ctx.telegram.getFileLink(fileId).then((link)=>{
//           downloadFile(link,'./src/TorrentFiles',fileName);
//           }
//         );
//     } 
//   } 
// ); 
// bot.on('text', (ctx) => {
//   let text = ctx.message.text;
//   if (text.includes('magnet:?')) {
//       ctx.reply(`ето магнет ссылка`);
//   } 
// } 
// ); 

// const channelId = -1001864974810;
// bot.telegram.sendMessage(channelId, 'ПРОВЕРКА СВЯЗИ ПИДОРАСЫ 😏');

// bot.telegram.sendDocument(channelId, {
//   source: data,
//   filename: 'somefilename.txt'
//   }).catch(function(error){ console.log(error);
//   });

// bot.launch();

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));



