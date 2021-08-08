<template>
  <form @submit.prevent="submitForm" class="p-fluid p-formgrid p-grid">
    <div class="p-field p-col-6">
      <label for="name">Recipe name *</label>
      <InputText id="name" type="text" v-model="form.name" />
    </div>

    <div class="p-field p-col-4">
      <label for="url">Dates of recipe use</label>
      <Calendar v-model="selectedDates" selectionMode="multiple" />
    </div>
    <div class="p-field p-col-2">
      <label for="rating">Rating</label>
      <Rating v-model="form.rating" :cancel="false" />
    </div>
    <div class="p-field p-col-12">
      <label for="source">Recipe source</label>
      <RecipeSource @update-source="updateForm" />
    </div>
    <div class="p-field p-col-6">
      <label for="ingredients">Ingredients</label>
      <RecipeIngredients @update-ingredients="updateForm" :recipe="recipe" />
    </div>
    <div class="p-field p-col-12">
      <label for="notes">Notes</label>
      <Textarea id="notes" v-model="form.notes" rows="4" />
    </div>
    <Button type="submit" label="Submit" />
    <Button
      type="button"
      class="p-button p-button-outlined p-button-secondary"
      label="Cancel"
      @click="backToList"
    />
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onMounted,
  watch,
} from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Rating from "primevue/rating";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import router from "@/routes";
import RecipeSource from "../RecipeForm/RecipeSource";
import RecipeIngredients from "./RecipeIngredients";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Recipe } from "@/store/types";

export default defineComponent({
  components: {
    InputText,
    Textarea,
    Rating,
    Calendar,
    Button,
    RecipeSource,
    RecipeIngredients,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const recipeId = route.params.id;
    const selectedDates = ref([]);
    const recipe = computed(() => store.state.activeRecipe);
    const form: Partial<Recipe> = reactive({
      name: "",
      notes: "",
      rating: 1,
      ingredients: [],
    });
    const allIngredients = ref([]);

    const updateForm = (values: Partial<Recipe>) => {
      Object.assign(form, values);
    };

    watch(recipe, () => {
      updateForm(recipe.value);
      selectedDates.value = recipe.value.dates.map(
        (date: Date) => new Date(date)
      );
    });

    const selectedDatesAsTimestamps = () => {
      return selectedDates.value?.map((date) => new Date(date).getTime());
    };

    const submitForm = () => {
      form.dates = selectedDatesAsTimestamps();
      //TODO: Add validation for dates and text fields
      if (recipeId) {
        store.dispatch("updateRecipe", { id: recipeId, ...form });
      } else {
        store.dispatch("createRecipe", form);
      }
    };

    const backToList = () => {
      router.push({ name: "list" });
    };

    onMounted(() => {
      if (recipeId) {
        store.dispatch("fetchRecipeById", recipeId);
      }
    });

    return {
      form,
      allIngredients,
      selectedDates,
      submitForm,
      backToList,
      updateForm,
      recipe,
    };
  },
});
</script>

<style scoped></style>
