import {BrowserWindow} from "electron";
import path from "node:path";
import {app, globalShortcut} from "electron";
import {PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL} from "./config.ts";

export class WindowManager {
  settingWindow: BrowserWindow | null;
  translationWindow: BrowserWindow | null;
  communicationWindow: BrowserWindow | null;

  constructor() {
    this.settingWindow = null;
    this.translationWindow = null;
    this.communicationWindow = null;
  }

  async active() {
    await app.whenReady();
    app.on('activate', () => {
      if (!this.checkIfExistActiveWindow()) {
        this.createSettingWindow();
      }
    });

    globalShortcut.register('option+cmd+T', () => {
      if (this.translationWindow !== null) {
        this.translationWindow.close();
        this.translationWindow = null;
      } else {
        this.createTranslationWindow();
      }
    });
    this.createCommunicationWindow();
    // this.createTranslationWindow();
    this.createSettingWindow();
  }

  createSettingWindow() {
    const win = new BrowserWindow({
      show: true,
      width: 1200,
      height: 600,
      minWidth: 1200,
      minHeight: 600,
      webPreferences: {
        preload: PRELOAD_PATH,
      },
      titleBarStyle: "hidden",
      alwaysOnTop: true,
      hasShadow: true,
      transparent: true
    });
    win.webContents.openDevTools();
    if (VITE_DEV_SERVER_URL) {
      win.loadURL(`${VITE_DEV_SERVER_URL}/#/setting`);
    } else {
      win.loadFile(path.join(RENDERER_DIST, `index.html`), {hash: "setting"});
    }
    this.settingWindow = win;
    win.once("closed", () => {
      this.settingWindow = null;
    });
    return win;
  }

  createTranslationWindow() {
    const win = new BrowserWindow({
      show: true,
      webPreferences: {
        preload: PRELOAD_PATH,
      },
      autoHideMenuBar: true,
      alwaysOnTop: true,
      frame: false,
      transparent: true,
    });
    win.setWindowButtonVisibility(false);
    if (VITE_DEV_SERVER_URL) {
      win.loadURL(`${VITE_DEV_SERVER_URL}/#/translation`);
    } else {
      win.loadFile(path.join(RENDERER_DIST, `index.html`), {hash: "translation"});
    }
    this.translationWindow = win;
    win.once("closed", () => {
      this.translationWindow = null;
    });
    return win;
  }

  createCommunicationWindow() {
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: PRELOAD_PATH,
      },
    });
    this.communicationWindow = win;
    return win;
  }

  checkIfExistActiveWindow() {
    return !!this.settingWindow || !!this.translationWindow;
  }
}
