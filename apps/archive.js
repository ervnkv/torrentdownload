'use strict';
import {exec} from 'child_process';

const diskName = 'D';
const absPathToRarExe = 'C:\\Program Files\\WinRAR\\Rar.exe';
const absPathToDownloads = 'D:\\05. Светлое будущее\\ПРОЕКТЫ\\torrentdownload\\src\\Download';
const FolderName = 'KMS';
const maxSizeKb = 20480;
const cmdCommand = `cd /${diskName} "${absPathToDownloads}" && "${absPathToRarExe}" a -r -v${maxSizeKb} "${FolderName}.rar" ${FolderName}`;

exec(cmdCommand , function() {
    // ... do something cool here.
});