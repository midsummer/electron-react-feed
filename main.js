const electron = require('electron');
const {app, dialog, BrowserWindow} = electron;

const path = require('path');
const url = require('url');
const fs = require('fs');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/public/built/index.html');

    mainWindow.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    //dialog.showOpenDialog({
    //    properties: ['openFile'],
    //    filters: [
    //        {
    //            name: 'RSS',
    //            extensions: ['rss', 'xml']
    //        }
    //    ]
    //}, (filePaths) => {
    //    if(filePaths === undefined) return;
    //    fs.readFile(filePaths[0], 'utf-8', (error, data) => {
    //        if(error) return;
    //        mainWindow.webContents.send('rss', data)
    //    });
    //});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('open-file', function(event) {
    event.preventDefault();

});
