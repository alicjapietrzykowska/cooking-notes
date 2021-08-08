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
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Button from "primevue/button";
import { SourceKey, Recipe } from "@/store/types";

export default defineComponent({
  components: {
    Button,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<Recipe>,
    },
  },
  setup(props) {
    const theLatestDate = props.recipe.dates
      ? Math.max(...props.recipe.dates)
      : "unknown";
    const recipeSource = ref<SourceKey>(props.recipe.source);

    return {
      recipeSource,
      theLatestDate,
    };
  },
});
</script>

<style scoped></style>
