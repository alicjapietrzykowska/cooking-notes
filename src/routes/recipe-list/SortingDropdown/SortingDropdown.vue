<template>
  <Dropdown
    class="sorting"
    v-model="selectedSorting"
    :options="options"
    optionLabel="name"
    :placeholder="$t('common.sort')"
    @change="sortList"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value">
        <i
          class="pi p-mr-2"
          :class="
            slotProps.value.order === 'ASC' ? 'pi-arrow-down' : 'pi-arrow-up'
          "
        />
        <span>
          {{ slotProps.value.name }}:
          {{ $t(`common.${slotProps.value.order}`) }}
        </span>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div>
        <i
          class="pi p-mr-2"
          :class="
            slotProps.option.order === 'ASC' ? 'pi-arrow-down' : 'pi-arrow-up'
          "
        />
        <span>
          {{ slotProps.option.name }}:
          {{ $t(`common.${slotProps.option.order}`) }}
        </span>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import { sortingOptions } from "./sorting.config";
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
    };
  },
});
</script>

<style scoped lang="scss">
.sorting {
  min-width: 250px;

  @include breakpoint-max-md {
    width: 100%;
  }
}
</style>
