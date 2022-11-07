'use strict';
import {Telegraf} from 'telegraf';
import {TOKEN} from './config.js';
import {downloadFile} from './download.js';

// Настройка логики бота
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Привет!\r\nПришли сюда .torrent файл или magnet-ссылку.'));

bot.on('document', (ctx) => {
    const doc = ctx.message.document;
    const fileName = doc.file_name;
    if (fileName.includes('.torrent')) {
        const fileId = doc.file_id;
        let fileUrl = '';
        ctx.telegram.getFileLink(fileId).then((link)=>{
          downloadFile(link,'./src/TorrentFiles',fileName);
          }
        );
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


