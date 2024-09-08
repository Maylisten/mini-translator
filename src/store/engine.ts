import {defineStore} from "pinia";
import {ref} from "vue";

export const ENGINE_LIST = [
  {name: "youdao", label: "有道翻译",iconComp: "YoudaoTranslationIcon", app: "", key: ""},
  {name: "baidu", label: "百度翻译",iconComp: "BaiduTranslationIcon", app: "", key: ""}
];

export const useEngineStore = defineStore("engine", () => {
    const engineList = ref(ENGINE_LIST);
    const defaultEngine = engineList.value[0].name;
    const active = ref("");

    const setActive = async ({engine}: { engine: string }) => {
      await window.api.engine.setActive({engine});
      active.value = engine;
    };

    const setAppKey = async ({engine, app, key}: { engine: string, app: string, key: string }) => {
      const enginInfo = engineList.value.find(({name}) => name === engine);
      if (enginInfo) {
        enginInfo.app = app;
        enginInfo.key = key;
      }
      await window.api.engine.setAppKey({engine, app, key});
    };

    const initStore = async () => {
      const activeEngine = await window.api.engine.getActive();
      if (!activeEngine) {
        await setActive({engine: defaultEngine});
      } else {
        active.value = activeEngine;
      }

      for (const engine of engineList.value) {
        const engineInfo = await window.api.engine.getAppKey({engine: engine.name});
        if (engineInfo) {
          engine.app = engineInfo.app;
          engine.key = engineInfo.key;
        } else {
          engine.app = "";
          engine.key = "";
        }
      }
    };

    return {initStore, engineList, active, setActive, setAppKey};
  })
;
