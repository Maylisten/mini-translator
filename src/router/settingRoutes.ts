import CommonSetting from "@/components/setting/common/CommonSetting.vue";
import AppKeySetting from "@/components/setting/key/AppKeySetting.vue";

export default [
  {path: "/setting/api", component: AppKeySetting, meta: {label: "翻译引擎", iconComp: "TranslationEngineIcon"}},
  {path: "/setting/common", component: CommonSetting, meta: {label: " 通用设置", iconComp: "SettingIcon"}},
];
