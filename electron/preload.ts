import {ipcRenderer, contextBridge} from 'electron';

contextBridge.exposeInMainWorld('api', {
  engine: {
    setActive: ({engine}: { engine: string }) => {
      return ipcRenderer.invoke('engine:setActive', {engine});
    },
    getActive: () => {
      return ipcRenderer.invoke('engine:getActive');
    },
    setAppKey: ({engine, app, key}: { engine: string, app: string, key: string }) => {
      return ipcRenderer.invoke('engine:setAppKey', {engine, app, key});
    },
    getAppKey: ({engine}: { engine: string }) => {
      return ipcRenderer.invoke('engine:getAppKey', {engine});
    }
  },
  native: {
    openLinkByDefaultBrowser: ({url}: { url: string }) => {
      return ipcRenderer.invoke('native:openLinkByDefaultBrowser', {url});
    }
  }
});
