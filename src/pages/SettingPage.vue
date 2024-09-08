<template>
  <div class="h-screen w-screen">
    <SettingLayout>
      <template #menu>
        <SettingMenu/>
      </template>
      <template #main>
        <router-view/>
      </template>
    </SettingLayout>
  </div>
</template>

<script setup lang="ts">

import SettingLayout from "@/layout/SettingLayout.vue";
import SettingMenu from "@/components/setting/SettingMenu.vue";
import {useRoute} from "vue-router";

const route = useRoute();
console.log(route.fullPath);
</script>

<style scoped>

</style>
