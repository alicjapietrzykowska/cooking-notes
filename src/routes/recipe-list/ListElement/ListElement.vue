<template>
  <div class="p-card list-element p-mb-3">
    <div>
      <h3>{{ recipe?.name }}</h3>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ t("recipe.lastUsed") }}:</span>
        {{ d(theLatestDate, "short") }}
      </div>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ t("recipe.sourceLabel") }}: </span>
        <a
          v-if="recipeSource === 'link'"
          :href="recipe.recipeUrl"
          target="_blank"
        >
          <Badge :value="t('recipe.source.' + recipeSource)" class="p-mr-2" />
        </a>
        <Badge
          v-else
          :severity="recipeSource === 'book' ? 'success' : 'warning'"
          :value="t('recipe.source.' + recipeSource)"
          class="p-mr-2"
          v-tooltip="recipe.bookTitle || recipe.comment"
        />
      </div>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ t("recipe.rating") }}:</span>
        {{ recipe?.rating }} / {{ RATING_MAX }}
      </div>
    </div>
    <div class="settings">
      <router-link :to="{ name: 'recipe', params: { id: recipe.id } }">
        <Button
          icon="pi pi-info"
          :title="t('recipe.details')"
          class="settings-button p-button-rounded p-button-outlined"
        />
      </router-link>
      <router-link :to="{ name: 'edit-recipe', params: { id: recipe.id } }">
        <Button
          icon="pi pi-pencil"
          :title="t('recipe.edit')"
          class="
            settings-button
            p-button-rounded p-button-warning p-button-outlined
          "
        />
      </router-link>
      <Button
        icon="pi pi-trash"
        :title="t('recipe.delete')"
        class="
          settings-button
          p-button-rounded p-button-danger p-button-outlined
        "
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
import { useI18n } from "vue-i18n";
import Badge from "primevue/badge";
import Tooltip from "primevue/tooltip";
import { RATING_MAX } from "@/static/data.config";

export default defineComponent({
  components: {
    Button,
    ConfirmDialog,
    Badge,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<Recipe>,
    },
  },
  directives: {
    tooltip: Tooltip,
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
      RATING_MAX,
      ...useI18n(),
    };
  },
});
</script>

<style scoped lang="scss">
.list-element {
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  h3 {
    margin-top: 0;
    margin-bottom: 0.85rem;
  }
}

.settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    display: flex;
  }

  .settings-button {
    width: 2rem;
    height: 2rem;
    :deep(.pi) {
      font-size: 0.7rem;
    }
  }
}
</style>
