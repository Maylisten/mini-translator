import {createWebHashHistory, createRouter, RouteRecordRaw} from 'vue-router';
import TranslationPage from "@/pages/TranslationPage.vue";
import settingRoutes from "@/router/settingRoutes.ts";
import SettingPage from "@/pages/SettingPage.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {path: '/', redirect: "/translation"},
  {path: '/translation', component: TranslationPage},
  {
    path: '/setting',
    component: SettingPage, children: [
      ...settingRoutes,
      {
        path: '',
        redirect: settingRoutes[0].path,
      }]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
