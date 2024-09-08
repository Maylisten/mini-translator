export const useNative = () => {
  const openLinkByDefaultBrowser = async (url: string) => {
    await window.api.native.openLinkByDefaultBrowser({url});
  };
  return {openLinkByDefaultBrowser};
};
