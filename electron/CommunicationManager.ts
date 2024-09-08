import {ipcMain, shell} from "electron";
import Store from "electron-store";

const store = new Store();

export class CommunicationManager {
  constructor() {

  }

  active() {
    this.initEngineAbout();
    this.initNativeAbout();
  }

  initEngineAbout() {
    ipcMain.handle('engine:setActive', (_, {engine}: { engine: string }) => {
      store.set("engine:active", engine);
    });

    ipcMain.handle('engine:getActive', () => {
      return store.get("engine:active");
    });

    ipcMain.handle('engine:setAppKey', (_, {engine, app, key}: { engine: string, app: string, key: string }) => {
      store.set(`engine:${engine}`, {app, key});
    });

    ipcMain.handle('engine:getAppKey', (_, {engine}: { engine: string }) => {
      return store.get(`engine:${engine}`);
    });
  }

  initNativeAbout() {
    ipcMain.handle('native:openLinkByDefaultBrowser', async (_, {url}: { url: string }) => {
      await shell.openExternal(url);
    });
  }
}
