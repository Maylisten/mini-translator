import {defineStore} from "pinia";
import {ref} from "vue";

export const useThemeStore = defineStore("theme", () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const isLightTheme = ref(mediaQuery.matches);
  const isDarkTheme = ref(!mediaQuery.matches);

  // 监听系统主题变化
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      isLightTheme.value = true;
      isDarkTheme.value = false;
    } else {
      isLightTheme.value = false;
      isDarkTheme.value = true;
    }
  });
  return {isLightTheme, isDarkTheme};
});
