<template>
  <Card class="not-found">
    <template #content>
      <div v-if="searchPhrase">
        <h3>{{ $t("common.notFoundPhrase", { phrase: searchPhrase }) }}</h3>
      </div>
      <div v-else-if="isFiltered">
        <h3>{{ $t("common.notFoundFilters") }}</h3>
      </div>
      <div v-else-if="isLoggedIn">
        <h2>{{ $t("app.welcome") }}</h2>
        <router-link :to="{ name: 'add-recipe' }">
          <Button :label="$t('recipe.addFirstRecipe')" />
        </router-link>
      </div>
      <div v-else>
        <h2>{{ $t("common.notLoggedIn") }}</h2>
        <div>{{ $t("common.logInToSave") }}</div>
        <div class="p-mb-2 p-mt-4">{{ $t("common.saveInCurrentDevice") }}</div>
        <router-link :to="{ name: 'add-recipe' }">
          <Button :label="$t('recipe.addFirstRecipe')" />
        </router-link>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Card from "primevue/card";
import { AppState } from "@/store/types";
import { useStore } from "vuex";
import Button from "primevue/button";

export default defineComponent({
  components: {
    Card,
    Button,
  },
  props: {
    searchPhrase: {
      type: String,
      required: false,
    },
  },
  setup() {
    const store = useStore<AppState>();
    const isLoggedIn = computed(() => !!store.state.user);
    const isFiltered = computed(() => !!store.state.activeFilters.length);

    return {
      isLoggedIn,
      isFiltered,
    };
  },
});
</script>

<style scoped lang="scss">
.not-found {
  text-align: center;

  h2 {
    margin-top: 0;
  }
}
</style>
