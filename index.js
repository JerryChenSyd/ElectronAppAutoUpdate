const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
  // mainWindow.once('ready-to-show', () => {
  //   autoUpdater.checkForUpdatesAndNotify();
  // });
}

app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("app_version", event => {
  event.csender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on("update-available", info => {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

// autoUpdater.on('checking-for-update', () => {
//   console.log('Checking for update...');
// })
// autoUpdater.on('update-available', (info) => {
//   console.log('Update available.');
// })
// autoUpdater.on('update-not-available', (info) => {
//   console.log('Update not available.');
// })
// autoUpdater.on('error', (err) => {
//   console.log('Error in auto-updater. ' + err);
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   console.log(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//   console.log('Update downloaded');
// });



// app.on("ready", function() {
//   autoUpdater.checkForUpdates();
// });
// var message="checking-for-update";
// autoUpdater.on("checking-for-update", () => {
//   console.log(message);
// });
// autoUpdater.on("update-available", info => {
//   console.log(info);
//  // mainWindow.webContents.send("update_available");
// });
// autoUpdater.on("update-not-available", info => {
//   console.log(info);});
// autoUpdater.on("error", err => {console.log(err);});
// autoUpdater.on("download-progress", progressObj => {console.log(progressObj);});
// autoUpdater.on("update-downloaded", info => {
//   autoUpdater.quitAndInstall();
// });
