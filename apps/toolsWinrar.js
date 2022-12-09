'use strict';
import {exec} from 'child_process';


export function createRar(name) {
    const diskName = 'D';
    const absPathToRarExe = 'C:\\Program Files\\WinRAR\\Rar.exe';
    const absPathToDownloads = 'D:\\05. Светлое будущее\\ПРОЕКТЫ\\torrentdownload\\src\\Download';
    const FolderName = name; // 'KMS';
    const maxSizeKb = 20480;
    const cmdCommand = `cd /${diskName} "${absPathToDownloads}" && "${absPathToRarExe}" a -r -v${maxSizeKb} "${FolderName}.rar" ${FolderName}`;
    exec(cmdCommand , (error, stdout, stderr) => {
        // if (error) {
        // console.error(`exec error: ${error}`);
        // return;
        // }
        // console.error(`stderr: ${stderr}`);
        // console.log(`stdout: ${stdout}`);
        if (stdout) {
            return 'finish';
            }
    });
}

createRar('VSCodeUserSetup-x64-1.72.1');