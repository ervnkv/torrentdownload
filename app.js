'use strict';
import {Telegraf} from 'telegraf';
import {TOKEN} from './apps/config.js';
import {downloadFile} from './apps/toolsFs.js';
import {createRar} from './apps/toolsWinrar.js';
import * as qbt from './apps/toolsQbt.js';

// Настройка логики бота
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Привет!\r\nПришли сюда .torrent файл или magnet-ссылку.'));

bot.on('document', (ctx) => {
    const doc = ctx.message.document;
    const fileName = doc.file_name;
    if (fileName.includes('.torrent')) {
        const fileId = doc.file_id;
        
        ctx.telegram.getFileLink(fileId).then(url => {
          // console.log(url);
          downloadFile(url,'./src/IN',fileName);
        });
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

// const channelId = -1001864974810;
// bot.telegram.sendMessage(channelId, 'ПРОВЕРКА СВЯЗИ ПИДОРАСЫ 😏');

// bot.telegram.sendDocument(channelId, {
//   source: data,
//   filename: 'somefilename.txt'
//   }).catch(function(error){ console.log(error);
//   });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));



