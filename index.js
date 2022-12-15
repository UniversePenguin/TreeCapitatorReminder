const { app, BrowserWindow, screen, remote } = require('electron');
const gkm = require('gkm');

var win;
let onCooldown = false;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    console.log(width);

    win = new BrowserWindow({
        x: width/2-107,
        y: height/2-95,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        show: false,
        transparent: true,
        center: true
    })

    win.setIgnoreMouseEvents(true);
    win.setAlwaysOnTop(true);

    win.on('ready-to-show', () => {
        win.show();
    })

    win.loadFile('green.html');

}

app.whenReady().then(createWindow);

gkm.events.on('mouse.pressed', function(data) {
    if (!onCooldown) {
        onCooldown = true;
        win.loadFile('red.html');
        setTimeout(() => {
            onCooldown = false;
            win.loadFile('green.html');
        }, 30000)
    }
});