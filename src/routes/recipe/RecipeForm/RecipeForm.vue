<template>
  <Card>
    <template #title>
      {{ recipe ? t("recipe.edit") : t("recipe.add") }}
    </template>
    <template #content>
      <form @submit.prevent="submitForm">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="name">{{ t("recipe.name") }} *</label>
            <InputText id="name" type="text" v-model="form.name" />
          </div>
          <div class="p-field p-col-6">
            <label for="source">{{ t("recipe.sourceLabel") }}</label>
            <RecipeSource @update-source="updateForm" />
          </div>
          <div class="p-field p-col-6">
            <label for="url">{{ t("recipe.dates") }}</label>
            <Calendar
              v-model="selectedDates"
              selectionMode="multiple"
              :maxDate="maxInputValue"
            />
          </div>
          <div class="p-field p-col-6">
            <label for="ingredients">{{ t("recipe.ingredients") }}</label>
            <RecipeIngredients
              @update-ingredients="updateForm"
              :recipe="recipe"
            />
          </div>
          <div class="p-field p-col-12">
            <label for="rating">{{ t("recipe.rating") }}</label>
            <Rating :stars="RATING_MAX" v-model="form.rating" :cancel="false" />
          </div>
          <div class="p-field p-col-12">
            <label for="notes">{{ t("recipe.notes") }}</label>
            <Textarea id="notes" v-model="form.notes" rows="4" />
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <Button
        class="p-mr-3"
        type="submit"
        @click="submitForm"
        :label="t('common.submit')"
      />
      <Button
        type="button"
        class="p-button p-button-outlined p-button-secondary"
        :label="t('common.back')"
        @click="backToList"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onMounted,
  watch,
  onUnmounted,
} from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Rating from "primevue/rating";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import Card from "primevue/card";
import router from "@/routes";
import RecipeSource from "../RecipeForm/RecipeSource";
import RecipeIngredients from "./RecipeIngredients";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Recipe, AppState } from "@/store/types";
import { useI18n } from "vue-i18n";
import { RATING_MAX } from "@/static/data.config";
import { timestampsToDates } from "@/services/utils.service";
export default defineComponent({
  components: {
    InputText,
    Textarea,
    Rating,
    Calendar,
    Button,
    RecipeSource,
    RecipeIngredients,
    Card,
  },
  setup() {
    const store = useStore<AppState>();
    const route = useRoute();
    const recipeId = route.params.id;
    const selectedDates = ref<Date[]>([]);
    const maxInputValue = ref<Date>(new Date());
    const recipe = computed(() => store.state.activeRecipe);
    const user = computed(() => store.state.user);
    const form: Partial<Recipe> = reactive({
      name: "",
      notes: "",
      rating: 1,
      source: "other",
      ingredients: [],
    });
    const allIngredients = ref([]);

    const updateForm = (values: Partial<Recipe>) => {
      Object.assign(form, values);
    };

    watch(recipe, () => {
      if (!recipe.value) return;
      updateForm(recipe.value);
      if (recipe.value.dates?.length)
        selectedDates.value = timestampsToDates(recipe.value.dates);
    });

    const selectedDatesAsTimestamps = () => {
      return selectedDates.value?.map((date) => new Date(date).getTime());
    };

    const submitForm = () => {
      if (selectedDates.value.length) form.dates = selectedDatesAsTimestamps();
      //TODO: Add validation for dates and text fields
      if (recipeId) {
        store.dispatch("updateRecipe", { id: recipeId, ...form });
      } else {
        const dateCreated = new Date().getTime();
        store.dispatch("createRecipe", { dateCreated, ...form });
        backToList();
      }
    };

    const backToList = () => {
      router.push({ name: "list" });
    };

    const getRecipeDataById = () => {
      if (recipeId) {
        store.dispatch("fetchRecipeById", recipeId);
      }
    };

    onMounted(() => {
      getRecipeDataById();
    });

    watch(user, () => {
      if (user.value) getRecipeDataById();
    });

    onUnmounted(() => {
      store.dispatch("resetActiveRecipe");
    });

    return {
      form,
      allIngredients,
      selectedDates,
      submitForm,
      backToList,
      updateForm,
      recipe,
      RATING_MAX,
      maxInputValue,
      ...useI18n(),
    };
  },
});
</script>

<style scoped></style>
