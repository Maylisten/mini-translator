<template>
  <div class="w-full h-full flex flex-row">
    <div class="w-[220px] h-full border-r-2 border-base-300 p-2 flex flex-col gap-2">
      <div v-for="engine of engineList" :key="engine.name"
           class="form-control border-neutral-content/80 has-[:checked]:border-primary has-[:checked]:bg-primary/10
           has-[:checked]:text-primary border-[1px] p-1.5 rounded-md">
        <label class="label cursor-pointer flex flex-row items-center" @change="handleRadioChange(engine.name)">
          <span class="flex flex-row flex-1 items-center gap-2">
            <Component :is="engine.iconComp"/>
            <span> {{ engine.label }}</span>
          </span>
          <input type="radio" name="radio-10" class="peer radio checked:bg-primary" :checked="active === engine.name"/>
        </label>
      </div>
    </div>
    <div class="flex-1 h-full">
      <KeepAlive>
        <YoudaoAppKeyForm v-if="isYoudaoFormShow"/>
        <BaiduAppKeyForm v-else-if="isBaiduFormShow"/>
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEngineStore} from "@/store";
import {storeToRefs} from "pinia";
import YoudaoAppKeyForm from "@/components/setting/key/YoudaoAppKeyForm.vue";
import BaiduAppKeyForm from "@/components/setting/key/BaiduAppKeyForm.vue";
import YoudaoTranslationIcon from "@/svg/YoudaoTranslationIcon.vue";
import BaiduTranslationIcon from "@/svg/BaiduTranslationIcon.vue";
import {computed} from "vue";
import {useToast} from "vue-toastification";

defineOptions({
  components: {
    YoudaoTranslationIcon,
    BaiduTranslationIcon
  }
});

const enginStore = useEngineStore();
const {setActive} = enginStore;
const {engineList, active} = storeToRefs(enginStore);

const isYoudaoFormShow = computed(() => {
  return active.value === "youdao";
});
const isBaiduFormShow = computed(() => {
  return active.value === "baidu";
});

const toast = useToast();

const activeEngineLabel = computed(() => {
  return engineList.value.find(engine => engine.name === active.value)?.label;
});

const handleRadioChange = async (engine: string) => {
  await setActive({engine});
  toast.clear();
  toast.success(`切换为『${activeEngineLabel.value}』引擎`, {
    timeout: 1000,
    hideProgressBar: true,
    closeButton: false
  });
};

</script>

<style scoped>

</style>
