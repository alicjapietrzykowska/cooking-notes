<template>
  <div class="filters p-mt-3">
    <h3>{{ $t("filters.title") }}</h3>

    <div>
      <h4>{{ $t("filters.ingredients") }}</h4>
      <MultiSelect
        v-model="selectedIngredients"
        :options="ingredients"
        optionLabel="name"
        :placeholder="$t('ingredients.select')"
        :filter="true"
        @change="filterByIngredients"
        display="chip"
      >
        <template #option="slotProps">
          <div class="ingredient-option">
            {{ slotProps.option.name }}
          </div>
        </template>
      </MultiSelect>
    </div>
    <div class="p-pt-2">
      <h4>{{ $t("filters.source") }}</h4>
      <div class="p-field-checkbox" v-for="source of sources" :key="source">
        <Checkbox
          :id="source"
          name="source"
          :value="source"
          v-model="selectedSources"
          @change="filterBySource"
        />
        <label :for="source">{{ $t(`recipe.source.${source}`) }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import Checkbox from "primevue/checkbox";
import MultiSelect from "primevue/multiselect";
import { ConfirmDialog } from "@/components";
import Button from "primevue/button";
import { AppState, NameId, SourceKey, Filter } from "@/store/types";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Checkbox,
    MultiSelect,
    ConfirmDialog,
    Button,
  },
  setup() {
    const store = useStore<AppState>();
    const user = computed(() => store.state.user);
    const ingredients = computed(() => store.state.ingredientsList || []);
    const selectedIngredients = ref<NameId[]>([]);
    const selectedSources = ref<SourceKey[]>([]);
    const sources: SourceKey[] = ["link", "book", "other"];

    const filterByIngredients = () => {
      const filter: Filter = {
        value: selectedIngredients.value,
        filterType: "ingredients",
      };
      store.dispatch("filterRecipeList", filter);
    };

    const filterBySource = () => {
      const filter: Filter = {
        value: selectedSources.value,
        filterType: "source",
      };
      store.dispatch("filterRecipeList", filter);
    };

    onMounted(() => {
      store.dispatch("fetchIngredients");
    });

    watch(user, () => {
      store.dispatch("fetchIngredients");
    });

    return {
      ingredients,
      sources,
      selectedIngredients,
      selectedSources,
      filterByIngredients,
      filterBySource,
    };
  },
});
</script>

<style scoped lang="scss">
.filters {
  width: 100%;
}
</style>
