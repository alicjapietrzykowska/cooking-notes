<template>
  <div>
    <div class="p-inputgroup">
      <InputText placeholder="Add ingredient" v-model.trim="ingredient" />
      <Button
        @click="addIngredient"
        icon="pi pi-plus"
        class="p-button-primary"
      />
    </div>
    <MultiSelect
      v-model="selectedIngredients"
      :options="ingredients"
      optionLabel="name"
      placeholder="Select ingredients"
      :filter="true"
      class="multiselect-custom"
      @change="updateForm"
    >
    </MultiSelect>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { Recipe } from "@/store/types";

export default defineComponent({
  components: {
    InputText,
    Button,
    MultiSelect,
  },
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: false,
    },
  },
  emits: ["update-ingredients"],
  setup(props, { emit }) {
    const ingredient = ref<string>("");
    const ingredients = ref(props.recipe ? [...props.recipe.ingredients] : []);
    const selectedIngredients = ref(props.recipe?.ingredients || []);
    watch(
      () => props.recipe,
      () => {
        if (!props.recipe) return;
        ingredients.value = [...props.recipe.ingredients];
        selectedIngredients.value = props.recipe.ingredients;
      }
    );

    const updateForm = () => {
      const chosenIngredients = {
        ingredients: selectedIngredients.value,
      };
      emit("update-ingredients", chosenIngredients);
    };

    const addIngredient = () => {
      const newIngredient = {
        name: ingredient.value,
        id: ingredients?.value?.length | 0,
      };
      ingredients.value.push(newIngredient);
      selectedIngredients.value.push(newIngredient);
      ingredient.value = "";
      updateForm();
    };

    return {
      addIngredient,
      updateForm,
      ingredient,
      ingredients,
      selectedIngredients,
    };
  },
});
</script>

<style scoped lang="scss"></style>
