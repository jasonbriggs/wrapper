var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require("menu");
var shell = require('shell');
var fs = require('fs');
var os = require('os');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Only truly close the main window when the application itself quits. Avoids
// destroying/reloading the main window on window close 
var trueQuit = false;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    app.quit();
});

// Quit when all windows are closed.
app.on('before-quit', function() {
    trueQuit = true;
    mainWindow.close();
    mainWindow = null;
});

app.on("open-file", function(event, path) {
    event.preventDefault();
    filepath = path;

    if (ready) {
        mainWindow.webContents.send('open-file', filepath);
        filepath = null;

        return;
    }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        frame: true
    });

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Emitted when the window is closed.
    mainWindow.on('close', function(event) {
        if (trueQuit == false) {
            mainWindow.hide();
            event.preventDefault()
        }
    });

    //find and launch the meta client application
    var clientLocationFile = os.homedir(); + "/meta_client_location.txt";
    fs.readFile(clientLocationFile, function(err, data) {
        if (data && !err) {
            shell.openItem(data.toString());
        } else {
            //meta client not installed or file system not accessible
        }
    });

    var template = [{
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }, ]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.reload();
            }
        }, {
            label: 'Toggle Full Screen',
            accelerator: (function() {
                if (process.platform == 'darwin')
                    return 'Ctrl+Command+F';
                else
                    return 'F11';
            })(),
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: (function() {
                if (process.platform == 'darwin')
                    return 'Alt+Command+I';
                else
                    return 'Ctrl+Shift+I';
            })(),
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.toggleDevTools();
            }
        }, ]
    }, {
        label: 'Window',
        role: 'window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }, ]
    }, {
        label: 'Help',
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click: function() {
                require('shell').openExternal('http://electron.atom.io')
            }
        }, ]
    }, ];

    if (process.platform == 'darwin') {
        var name = require('app').getName();
        template.unshift({
            label: name,
            submenu: [{
                label: 'About ' + name,
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide ' + name,
                accelerator: 'Command+H',
                role: 'hide'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                role: 'hideothers'
            }, {
                label: 'Show All',
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function() {
                    app.quit();
                }
            }, ]
        });
        // Window menu.
        template[3].submenu.push({
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            role: 'front'
        });
    }

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
// Basically when the app icon is clicked and no windows are open.

app.on('activate-with-no-open-windows', function() {
    // if app icon is clicked and no windows are shown, show the
    // main window where it left off and focus on search bar
    mainWindow.show();
    mainWindow.focusOnWebView()
    mainWindow.webContents.send('focus', 'searchbar');
});
