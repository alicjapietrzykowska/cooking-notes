<template>
  <Dropdown
    v-model="selectedSorting"
    :options="options"
    optionLabel="name"
    :placeholder="t('common.sort')"
    @change="sortList"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value">
        <span>{{ slotProps.value.order }}</span>
        <span>{{ slotProps.value.name }}</span>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div>
        <span>{{ slotProps.option.order }}</span>
        <span>{{ slotProps.option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import { sortingOptions } from "./sorting.config";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { AppState, SortOption } from "@/store/types";

export default defineComponent({
  components: {
    Dropdown,
  },

  setup() {
    const store = useStore<AppState>();
    const selectedSorting = ref<SortOption>();
    const options = computed(() => {
      const dynamicOptions: SortOption[] = [];

      [...sortingOptions].forEach((option) => {
        const alternativeOption = { ...option };
        alternativeOption.order = "DESC";
        dynamicOptions.push(option);
        dynamicOptions.push(alternativeOption);
      });
      return dynamicOptions;
    });

    const sortList = () => {
      store.dispatch("sortRecipeList", selectedSorting.value);
    };
    return {
      selectedSorting,
      options,
      sortList,
      ...useI18n(),
    };
  },
});
</script>

<style scoped></style>
