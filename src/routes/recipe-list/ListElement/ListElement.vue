<template>
  <div class="p-card list-element p-mb-3">
    <div>
      <h3>{{ recipe?.name }}</h3>
      <div class="p-mb-2 p-d-flex" v-if="rating">
        <span class="p-text-bold p-mr-2">{{ t("recipe.rating") }}:</span>
        <Rating
          class="p-d-inline"
          v-model="rating"
          :stars="RATING_MAX"
          :readonly="true"
          :cancel="false"
        />
      </div>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ t("recipe.lastUsed") }}: </span>
        <span v-if="theLatestDate">{{ d(theLatestDate, "short") }}</span>
        <span v-else>{{ t("common.unknown") }}</span>
      </div>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ t("recipe.sourceLabel") }}: </span>
        <a
          v-if="recipeSource === 'link'"
          :href="`https://${recipe.recipeUrl}`"
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
      :text="t('recipe.deleteRecipeText')"
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
import Rating from "primevue/rating";

export default defineComponent({
  components: {
    Button,
    ConfirmDialog,
    Badge,
    Rating,
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
    const rating = Number(props.recipe.rating);
    const theLatestDate = props.recipe.dates
      ? Math.max(...props.recipe.dates)
      : undefined;
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
      rating,
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
    margin-bottom: 0.5rem;
  }
}

.settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 1rem;
  border-left: 1px solid #ced4da;

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
