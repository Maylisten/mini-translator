<template>
  <div class="h-full overflow-auto flex flex-col gap-[10px]">
    <RouterLink v-for="menu of menuList" :key="menu.path" :to="menu.path"
                class="group text-sm h-[40px] flex flex-row items-center gap-1.5 px-3 font-bold text-base-content">
      <Component size="18px" :is="menu.iconComp" class="text-base-content"/>
      {{ menu.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import settingRoutes from "@/router/settingRoutes.ts";
import TranslationEngineIcon from "@/svg/TranslationEngineIcon.vue";
import SettingIcon from "@/svg/SettingIcon.vue";

defineOptions({
  components:{
    TranslationEngineIcon,
    SettingIcon,
  }
});

const menuList = settingRoutes.map(route => ({
  path: route.path,
  label: route.meta?.label,
  iconComp: route.meta?.iconComp
}));

console.log(menuList);

</script>

<style scoped lang="less">
.router-link-active {
@apply bg-base-content/20 rounded-sm;

  &:focus {
  @apply bg-primary/20;
  }
}
</style>
