<template>
  <div class="p-[10px] flex flex-col gap-5">
    <div role="alert" class="alert" :class="[alertInfo.type]">
      <span> {{ alertInfo.content }} </span>
      <a v-show="showApplyLink" class="link text-primary min-w-[100px]" @click="handleApplyLinkClick">点击前往申请</a>
    </div>
    <label class="input input-bordered flex items-center gap-2">
      <span class="font-bold text-primary mr-3">应用 ID：</span>
      <input v-model="inputApp" type="text" class="grow" placeholder="请输入有道应用ID"/>
    </label>
    <label class="input input-bordered flex items-center gap-2">
      <span class="font-bold text-primary">应用密钥：</span>
      <input v-model="inputKey" type="password" class="grow" placeholder="请输入有道应用秘钥"/>
    </label>
    <div class="flex flex-row w-full gap-5">
      <button class="btn btn-neutral btn-outline flex-1 text-base" @click="handleResetButtonClick">重置</button>
      <button class="btn btn-primary flex-1 text-base" @click="handleSaveButtonClick">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useNative} from "@/hooks/native.ts";
import {computed, onActivated, onMounted, ref, watch} from "vue";
import {useEngineStore} from "@/store";
import {storeToRefs} from "pinia";

const inputApp = ref("");
const inputKey = ref("");
const engineStore = useEngineStore();
const {engineList} = storeToRefs(engineStore);

const engineInfo = computed(() => {
  return engineList.value.find(({name}) => name === "youdao");
});

const isModified = computed(() => {
  return inputApp.value !== engineInfo.value?.app || inputKey.value !== engineInfo.value.key;
});

const resetInput = () => {
  inputApp.value = engineInfo.value!.app;
  inputKey.value = engineInfo.value!.key;
};

watch(engineInfo, () => {
  resetInput();
}, {deep: true});

const isJustSave = ref(false);

const isJustReset = ref(false);

const handleSaveButtonClick = async () => {
  await engineStore.setAppKey({engine: "youdao", app: inputApp.value, key: inputKey.value});
  isJustSave.value = true;
  isJustReset.value = false;
};

const handleResetButtonClick = async () => {
  resetInput();
  isJustSave.value = false;
  isJustReset.value = true;
};

const alertInfo = computed(() => {
  if (isModified.value) {
    return {type: "alert-warning", content: "应用 ID 和 应用密钥有更改，请及时保存"};
  }

  if (isJustSave.value) {
    return {type: "alert-success", content: "应用 ID 和 应用密钥保存成功"};
  }

  if (isJustReset.value) {
    return {type: "alert-info", content: "应用 ID 和 应用密钥已恢复到修改前"};
  }

  return {type: "", content: "请提供『有道翻译』的应用 ID 和应用密匙"};
});

const showApplyLink = computed(() => {
  return !isModified.value && !isJustReset.value && !isJustSave.value;
});

const {openLinkByDefaultBrowser} = useNative();

const applyUrl = "https://ai.youdao.com/console/#/service-singleton/text-translation";
const handleApplyLinkClick = () => {
  openLinkByDefaultBrowser(applyUrl);
};

onMounted(() => {
  resetInput();
  isJustReset.value = false;
  isJustSave.value = false;
});

onActivated(() => {
  isJustReset.value = false;
  isJustSave.value = false;
});
</script>

<style scoped>

</style>
