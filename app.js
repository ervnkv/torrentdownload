'use strict';
import {Telegraf} from 'telegraf';
import {TOKEN} from './apps/config.js';
import {downloadFile} from './apps/toolsFs.js';
import {createRar} from './apps/toolsWinrar.js';
import * as qbt from './apps/toolsQbt.js';



// Настройка логики бота
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Привет!\r\nПришли сюда .torrent файл'));

bot.on('document', (ctx) => {
    let doc = ctx.message.document;
    let fileName = doc.file_name;
    if (fileName.includes('.torrent')) {
        let fileId = doc.file_id;
        
        ctx.telegram.getFileLink(fileId).then(objUrl => { // Получаем ссылку на .torrent файл (url)
          let url = objUrl.href;
          qbt.startTorrent(url,ctx.chat.id);
          // console.log(url);
        });

        
        
        
    } 
  } 
); 

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

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));



