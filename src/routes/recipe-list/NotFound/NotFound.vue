<template>
  <Card class="not-found">
    <template #content>
      <div v-if="isLoggedIn && searchPhrase">
        <h3>{{ t("common.notFoundPhrase", { phrase: searchPhrase }) }}</h3>
      </div>
      <div v-else-if="isLoggedIn">
        <h2>{{ t("app.welcome") }}</h2>
        <router-link :to="{ name: 'add-recipe' }">
          <Button :label="t('recipe.addFirstRecipe')" />
        </router-link>
      </div>
      <div v-else>
        <h2>{{ t("common.notLoggedIn") }}</h2>
        <div class="p-mb-3">{{ t("common.logInToSave") }}</div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Card from "primevue/card";
import { AppState } from "@/store/types";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
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

    return {
      isLoggedIn,
      ...useI18n(),
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
