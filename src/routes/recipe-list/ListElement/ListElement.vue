<template>
  <div class="p-card list-element p-mb-3" @click="goToRoute('recipe')">
    <div>
      <h3>{{ recipe?.name }}</h3>
      <div class="p-mb-2 p-d-md-flex" v-if="rating">
        <span class="p-text-bold p-mr-2">{{ $t("recipe.rating") }}:</span>
        <Rating
          class="p-d-sm-inline p-mt-1 p-mt-md-0"
          v-model="rating"
          :stars="RATING_MAX"
          :readonly="true"
          :cancel="false"
        />
      </div>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ $t("recipe.lastUsed") }}: </span>
        <span v-if="recipe.lastUsed">{{ $d(recipe.lastUsed, "short") }}</span>
        <span v-else>{{ $t("common.unknown") }}</span>
      </div>
      <div class="p-mb-2">
        <span class="p-text-bold">{{ $t("recipe.sourceLabel") }}: </span>
        <a
          v-if="recipeSource === 'link'"
          @click.stop
          :href="recipe.recipeUrl"
          target="_blank"
        >
          <Badge :value="$t('recipe.source.' + recipeSource)" class="p-mr-2" />
        </a>
        <Badge
          v-else
          :severity="recipeSource === 'book' ? 'success' : 'warning'"
          :value="$t('recipe.source.' + recipeSource)"
          class="p-mr-2"
          v-tooltip="recipe.bookTitle || recipe.comment"
        />
      </div>
    </div>
    <div class="settings">
      <Button
        icon="pi pi-info"
        :title="$t('recipe.details')"
        @click.stop="goToRoute('recipe')"
        class="settings-button p-button-rounded p-button-outlined"
      />
      <Button
        icon="pi pi-pencil"
        :title="$t('recipe.edit')"
        @click.stop="goToRoute('edit-recipe')"
        class="
          settings-button
          p-button-rounded p-button-warning p-button-outlined
        "
      />
      <Button
        icon="pi pi-trash"
        :title="$t('recipe.delete')"
        class="
          settings-button
          p-button-rounded p-button-danger p-button-outlined
        "
        @click.stop="showConfirmDialog = true"
      />
    </div>
    <ConfirmDialog
      v-if="showConfirmDialog"
      v-model:visible="showConfirmDialog"
      @close="showConfirmDialog = false"
      @confirm="deleteRecipe"
      :text="$t('recipe.deleteRecipeText')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Button from "primevue/button";
import { SourceKey, Recipe } from "@/store/types";
import { ConfirmDialog } from "@/components";
import Badge from "primevue/badge";
import Tooltip from "primevue/tooltip";
import { RATING_MAX } from "@/static/data.config";
import Rating from "primevue/rating";
import router from "@/routes";

export default defineComponent({
  components: {
    Button,
    ConfirmDialog,
    Badge,
    Rating,
  },
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: true,
    },
  },
  directives: {
    tooltip: Tooltip,
  },
  emits: ["remove-element"],
  setup(props, { emit }) {
    const showConfirmDialog = ref(false);
    const rating = Number(props.recipe.rating);
    const recipeSource = ref<SourceKey>(props.recipe.source);

    const deleteRecipe = () => {
      showConfirmDialog.value = false;
      emit("remove-element", props.recipe.id);
    };

    const goToRoute = (routeName: string) => {
      router.push({ name: routeName, params: { id: props.recipe.id } });
    };

    return {
      showConfirmDialog,
      recipeSource,
      deleteRecipe,
      rating,
      RATING_MAX,
      goToRoute,
    };
  },
});
</script>

<style scoped lang="scss">
.list-element {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;

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
