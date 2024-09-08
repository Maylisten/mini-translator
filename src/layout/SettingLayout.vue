<template>
  <div class="h-full w-full flex flex-row">
    <div class="w-[200px] h-full pt-[30px] pb-[10px] px-[10px] bg-base-300">
      <slot name="menu"></slot>
    </div>
    <div class="flex-1 h-full relative">
      <div class="absolute left-0 top-0 h-full w-full overflow-auto">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
