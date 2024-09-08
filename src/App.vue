<template>
  <div class="h-screen w-screen relative" :data-theme="theme">
    <div class="absolute h-[25px] w-full draggable"></div>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {useEngineStore, useThemeStore} from "@/store";
import {computed} from "vue";
import {storeToRefs} from "pinia";

const {isLightTheme} = storeToRefs(useThemeStore());
const theme = computed(() => isLightTheme.value ? "light" : "dark");

const engineStore = useEngineStore();
const {initStore: initEngineStore} = engineStore;
initEngineStore();

</script>

<style scoped>

</style>
