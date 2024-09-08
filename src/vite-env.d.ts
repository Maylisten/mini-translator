/// <reference types="vite/client" />

interface Window {
  api: {
    engine: {
      setActive: (option: { engine: string }) => Promise<void>;
      getActive: () => Promise<string>;
      setAppKey: (option: { engine: string, app: string, key: string }) => Promise<void>;
      getAppKey: (option: { engine: string }) => Promise<{ app: string, key: string }>;
    },
    native: {
      openLinkByDefaultBrowser: (option: { url: string }) => Promise<void>;
    }
  }
}
