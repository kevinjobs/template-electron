import "reflect-metadata";
import { app, BrowserWindow } from "electron";
import path from "path";
import Eipc from "./eipc";
import channels from "./channels";
import MyHandler from "./handlers/my-handler";

const isDev = process.env["NODE_ENV"] === "development";

async function createWindow() {
  const w = new BrowserWindow({
    width: 1000,
    height: 600,
    // frame: true,
    resizable: true,
    // movable: true,
    // transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true, // this config make react use electron.
      webSecurity: true,
    },
  });

  // to-do: auto import handler from handlers dir
  const eipc = new Eipc(w.webContents, channels, [MyHandler]);
  await eipc.init();

  if (isDev) w.loadURL("http://localhost:9000/").then();
  // 生产环境应使用相对地址
  // 打包后的根目录为 app/
  else w.loadFile("./dist/index.html").then();

  if (isDev) w.webContents.openDevTools();

  w.on("closed", () => {
    w.destroy();
    eipc.destory();
  })

  return w;
}

app.whenReady().then(() => {
  // create main window
  // const mainWindow = createWindow();
  createWindow()

  // only in macOS
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow().then();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
