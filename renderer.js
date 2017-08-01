var ipcRenderer = require("electron").ipcRenderer;

ipcRenderer.on('rss', function(event, data) {
    console.log(data);
});