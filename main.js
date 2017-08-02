const electron = require('electron');
const {app, dialog, BrowserWindow, Menu} = electron;

const path = require('path');
const url = require('url');
const fs = require('fs');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/public/built/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    let template = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Open',
                        click: () => { showOpen(); }
                    }, {
                        label: 'Exit',
                        click: () => { app.quit(); }
                    }
                ]
            }
        ],
        menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
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

let showOpen = function() {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: 'RSS',
                extensions: ['rss', 'xml']
            }
        ]
    }, (filePaths) => {
        if(filePaths === undefined) return;
        fs.readFile(filePaths[0], 'utf-8', (error, data) => {
            if(error) return;
            mainWindow.webContents.send('rss', data)
        });
    });
};