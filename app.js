'use strict';
import {Telegraf} from 'telegraf';
import {QBittorrent} from '@ctrl/qbittorrent';
import * as axios from 'axios';
import {TOKEN} from './config.js';

const client = new QBittorrent({
  baseUrl: 'http://localhost:8080/',
  username: 'admin',
  password: 'password',
});

async function addTorrent(file) {
  const result = await client.addTorrent(file);
  console.log(result);
}

const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Привет!\r\nПришли сюда .torrent файл или magnet-ссылку.'));

bot.on('document', (ctx) => {
    const doc = ctx.message.document;
    const fileName = doc.file_name;
    if (fileName.includes('.torrent')) {
        // ctx.reply(`ето торрент`);
        const fileId = doc.file_id;
        const fileUrl = ctx.telegram.getFileLink(fileId);
        const response = axios.get(fileUrl);
        ctx.reply(`ето торрент, вот ссылка:\n ${response.data}`);
        // addTorrent(ctx.message.document);
        
    } 
  } 
); 
bot.on('text', (ctx) => {
  let text = ctx.message.text;
  if (text.includes('magnet:?')) {
      ctx.reply(`ето магнет ссылка`);
  } 
} 
); 



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


