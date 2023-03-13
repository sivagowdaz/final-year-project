const electron = require('electron');

const { app, BrowserWindow } = electron

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/public/index.html`);
})