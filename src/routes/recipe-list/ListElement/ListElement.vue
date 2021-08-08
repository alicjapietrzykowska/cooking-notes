<template>
  <div class="p-d-flex p-jc-between p-ai-baseline">
    <div>
      <h3>{{ recipe?.name }}</h3>
      <div>Last made: {{ theLatestDate }}</div>
      <div>
        Source:
        <a
          v-if="recipeSource === 'link'"
          :href="recipe.recipeUrl"
          target="_blank"
        >
          {{ recipeSource }}
        </a>
        <span v-else>{{ recipeSource }}</span>
      </div>
      <div>Rating: {{ recipe?.rating }}</div>
    </div>
    <div class="p-d-flex p-flex-column">
      <router-link :to="{ name: 'recipe', params: { id: recipe.id } }">
        <Button icon="pi pi-info" class="p-button-rounded p-button-outlined" />
      </router-link>
      <router-link :to="{ name: 'edit-recipe', params: { id: recipe.id } }">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-warning p-button-outlined"
        />
      </router-link>
      <Button
        icon="pi pi-trash"
        class="p-button-rounded p-button-danger p-button-outlined"
        @click="showConfirmDialog = true"
      />
    </div>
    <ConfirmDialog
      v-if="showConfirmDialog"
      v-model:visible="showConfirmDialog"
      @close="showConfirmDialog = false"
      @confirm="deleteRecipe"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Button from "primevue/button";
import { SourceKey, Recipe } from "@/store/types";
import { ConfirmDialog } from "@/components";

export default defineComponent({
  components: {
    Button,
    ConfirmDialog,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<Recipe>,
    },
  },
  emits: ["remove-element"],
  setup(props, { emit }) {
    const showConfirmDialog = ref(false);
    const theLatestDate = props.recipe.dates
      ? Math.max(...props.recipe.dates)
      : "unknown";
    const recipeSource = ref<SourceKey>(props.recipe.source);

    const deleteRecipe = () => {
      showConfirmDialog.value = false;
      emit("remove-element", props.recipe.id);
    };

    return {
      showConfirmDialog,
      recipeSource,
      theLatestDate,
      deleteRecipe,
    };
  },
});
</script>

<style scoped></style>
