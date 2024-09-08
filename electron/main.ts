import {app} from 'electron';
import {WindowManager} from "./WindowManager.ts";
import {TrayManager} from "./TrayManager.ts";
import {LOGO_IMAGE} from "./config.ts";
import {CommunicationManager} from "./CommunicationManager.ts";

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.dock.setIcon(LOGO_IMAGE);

// app.dock.hide();

async function main() {
  const windowManager = new WindowManager();
  const trayManager = new TrayManager();
  const communicationManager = new CommunicationManager();
  await windowManager.active();
  await trayManager.active();
  communicationManager.active();
}

main().then();
