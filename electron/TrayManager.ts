import {app, Tray, Menu} from "electron";
import {LOGO_IMAGE} from "./config.ts";

export class TrayManager {
  tray: Tray | null = null;

  constructor() {
  }

  async active() {
    await app.whenReady();
    this.tray = new Tray(LOGO_IMAGE);
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Item1', type: 'radio'},
      {label: 'Item2', type: 'radio'},
      {label: 'Item3', type: 'radio', checked: true},
      {label: 'Item4', type: 'radio'}
    ]);
    this.tray.setToolTip('迷你翻译');
    this.tray.setContextMenu(contextMenu);
  }
}
