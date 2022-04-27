<template>
  <Card class="recipe">
    <template #title>{{ recipe?.name }}</template>
    <template #content>
      <div v-if="recipe" class="p-fluid p-formgrid p-grid">
        <div class="p-col-12">
          <Rating
            v-model="recipe.rating"
            :stars="RATING_MAX"
            :readonly="true"
            :cancel="false"
            class="p-mb-3"
          />
        </div>
        <div class="p-col-12 p-md-6 recipe-row">
          <label>{{ $t("recipe.ingredients") }}:</label>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
              {{ ingredient.name }}
            </li>
          </ul>
        </div>
        <div class="p-col-12 p-md-6 recipe-source">
          <div class="recipe-row">
            <label> {{ $t("recipe.sourceLabel") }}: </label>
            {{ $t("recipe.source." + recipe.source) }}
          </div>
          <div v-if="recipe.source === 'link'" class="recipe-row">
            <label> {{ $t("recipe.url") }}: </label>
            <a :href="recipe.recipeUrl" target="_blank">
              {{ recipe.recipeUrl }}
            </a>
          </div>
          <template v-else-if="recipe.source === 'book'">
            <div class="recipe-row">
              <label>{{ $t("recipe.book.title") }}:</label>
              {{ recipe.bookTitle }}
            </div>
            <div class="recipe-row">
              <label>{{ $t("recipe.book.authors") }}:</label>
              {{ recipe.bookAuthors }}
            </div>
            <div class="recipe-row">
              <label>{{ $t("recipe.book.page") }}:</label>
              {{ recipe.bookPage }}
            </div>
          </template>
          <div class="recipe-row" v-else>
            <label>{{ $t("recipe.comment") }}:</label>
            {{ recipe.comment }}
          </div>
        </div>
        <div class="p-col-12 recipe-row p-mt-3">
          <label class="p-d-block p-mb-1">{{ $t("recipe.notes") }}:</label>
          <div class="notes">{{ recipe.notes }}</div>
        </div>
        <div class="p-col-12 p-md-6 recipe-row p-mt-3">
          <label class="p-d-block p-mb-1">{{ $t("recipe.dates") }}:</label>
          <Calendar
            :selectionMode="'multiple'"
            v-model="selectedDates"
            :maxDate="maxDateValue"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        class="p-mr-3"
        @click="$router.push({ name: 'edit-recipe', id: recipeId })"
        :label="$t('recipe.edit')"
      />
      <Button
        class="p-button-outlined p-button-secondary"
        @click="$router.go(-1)"
        :label="$t('common.back')"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { AppState } from "@/store/types";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  watch,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Card from "primevue/card";
import Button from "primevue/button";
import { RATING_MAX } from "@/static/data.config";
import Rating from "primevue/rating";
import Calendar from "primevue/calendar";
import { timestampsToDates } from "@/services/utils.service";

export default defineComponent({
  components: {
    Card,
    Button,
    Rating,
    Calendar,
  },
  setup() {
    const store = useStore<AppState>();

    const route = useRoute();
    const recipeId = route.params.id;

    const recipe = computed(() => store.state.activeRecipe);
    const user = computed(() => store.state.user);
    const maxDateValue = ref<Date>(new Date());

    const selectedDates = computed(() =>
      timestampsToDates(recipe.value?.dates || [])
    );

    onMounted(() => {
      store.dispatch("fetchRecipeById", recipeId);
    });

    watch(user, () => {
      if (user.value) store.dispatch("fetchRecipeById", recipeId);
    });

    onUnmounted(() => {
      store.dispatch("resetActiveRecipe");
    });

    return {
      recipeId,
      recipe,
      RATING_MAX,
      selectedDates,
      maxDateValue,
    };
  },
});
</script>

<style scoped lang="scss">
.recipe {
  &-row {
    margin-bottom: 0.5rem;
    label {
      font-weight: bold;
    }
  }

  .notes {
    white-space: pre-wrap;
  }
}
</style>
