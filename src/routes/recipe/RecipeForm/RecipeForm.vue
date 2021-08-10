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
      label="Back"
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
  onUnmounted,
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
import { Recipe, AppState } from "@/store/types";
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
    const store = useStore<AppState>();
    const route = useRoute();
    const recipeId = route.params.id;
    const selectedDates = ref<Date[]>([]);
    const recipe = computed(() => store.state.activeRecipe);
    const user = computed(() => store.state.user);
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
      if (!recipe.value) return;
      updateForm(recipe.value);
      if (recipe.value.dates?.length)
        selectedDates.value = recipe.value.dates.map(
          (timestamp: number) => new Date(timestamp)
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
    };
  },
});
</script>

<style scoped></style>
