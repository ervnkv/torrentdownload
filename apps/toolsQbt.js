'use strict';
import {QBittorrent} from '@ctrl/qbittorrent';
import * as fs from 'fs';

const pathToIn = 'src/IN';
const torrentName = 'Кулинария. Вилки против ножей.torrent';
const magnetLink = 'magnet:?xt=urn:btih:E8F21F15F1E71730E584499BC09C27234B230D11&tr=http%3A%2F%2Fbt4.t-ru.org%2Fann%3Fmagnet&dn=Кулинария.%20Вилки%20против%20ножей%20-%20Сарно%20Ч.%2C%20Сарно%20Д.%2C%20Иоахим%20Д.%20-%20Неприлично%20полезная%20кулинарная%20книга%20%5B2019%2C%20DjVu%2C%20RUS%5D';
const torrentFile = `${pathToIn}/${torrentName}`;


// Настройка QBittorrent. Работает
const client = new QBittorrent({
  baseUrl: 'http://localhost:8080/',
  username: 'admin',
  password: 'password',
});

// Добавить торрент через файл. Работает
client.addTorrent(fs.readFileSync(torrentFile), {'paused' : 'true'});

// Полная информация о всех торрентах. Работает
let torrentsAllData = await(client.getAllData());

// Полезная информация о всех торрентах. Работает
let torrents = [];
for (let torrent of torrentsAllData.torrents) {
  let torrentData = {};
  torrentData.hash =  torrent.id;
  torrentData.name =  torrent.name;
  torrents.push(torrentData);
  await(client.resumeTorrent(torrent.id));
}

// Полезная информация о всех файлах торрентов. Работает
let torrentsFiles = [];
for (let torrent of torrents) {
  let allFiles = await(client.torrentFiles(torrent.hash)); // Полная информация о всех файлах торрентов.
  let fileData = [];
  for (let file of allFiles) {
    fileData.push(torrent.hash);
    fileData.push(file.index);
    fileData.push(file.name);
    fileData.push(file.size);
  }
  torrentsFiles.push(fileData);
}

// Назначение приоритетов файлам. Работает, надо упаковать id в одну строку с разделителем|.
for (let file of torrentsFiles) {
  let torrentHash = file[0];
  let fileIndex = `${file[1]}`;
  let priority = 7; // 0,1,6,7
  await(client.setFilePriority(torrentHash, fileIndex, priority));
}


// Запустить торрент. Работает
await(client.resumeTorrent('e8f21f15f1e71730e584499bc09c27234b230d11'));

// Назначение приоритетов одному файлу. Работает, Приоритеты - 0,1,6,7
await(client.setFilePriority('e8f21f15f1e71730e584499bc09c27234b230d11', '0', 7));
