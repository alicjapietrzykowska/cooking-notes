<template>
  <form @submit.prevent="submitForm" class="p-fluid p-formgrid p-grid">
    <div class="p-field p-col-6">
      <label for="name">Recipe name *</label>
      <InputText id="name" type="text" v-model="form.name" />
    </div>

    <div class="p-field p-col-4">
      <label for="url">Dates of recipe use</label>
      <Calendar v-model="form.dates" selectionMode="multiple" />
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
      <RecipeIngredients @update-ingredients="updateForm" />
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
import { defineComponent, reactive, ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Rating from "primevue/rating";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import router from "@/routes";
import RecipeSource from "../RecipeForm/RecipeSource";
import { Recipe } from "../store/types";
import RecipeIngredients from "./RecipeIngredients";

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
    const form: Partial<Recipe> = reactive({
      name: "",
      dates: [],
      notes: "",
      rating: 1,
      ingredients: [],
    });

    const allIngredients = ref([]);

    const submitForm = () => {
      console.log(form);
    };

    const backToList = () => {
      router.push({ name: "List" });
    };

    const updateForm = (values: Partial<Recipe>) => {
      Object.assign(form, values);
      console.log(form);
    };

    return {
      form,
      allIngredients,
      submitForm,
      backToList,
      updateForm,
    };
  },
});
</script>

<style scoped></style>
