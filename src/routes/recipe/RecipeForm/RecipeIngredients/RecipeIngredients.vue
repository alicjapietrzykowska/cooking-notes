<template>
  <div>
    <div class="p-inputgroup p-mb-2">
      <InputText
        :placeholder="t('ingredients.add')"
        v-model.trim="ingredient"
      />
      <Button
        @click="manageNewIngredient"
        icon="pi pi-plus"
        class="p-button-primary"
      />
    </div>
    <MultiSelect
      v-model="selectedIngredients"
      :options="ingredients"
      optionLabel="name"
      :placeholder="t('ingredients.select')"
      :filter="true"
      @change="updateForm"
      display="chip"
    >
      <template #option="slotProps">
        <div class="ingredient-option">
          <div>{{ slotProps.option.name }}</div>
          <Button
            @click.stop="confirmDelete(slotProps.option)"
            :title="t('ingredients.delete')"
            icon="pi pi-times"
            class="p-button-rounded p-button-danger p-button-text"
          />
        </div>
      </template>
    </MultiSelect>

    <ConfirmDialog
      v-if="showConfirmDialog"
      v-model:visible="showConfirmDialog"
      @close="
        showConfirmDialog = false;
        ingredientToDelete = undefined;
      "
      @confirm="deleteIngredient"
      :text="t('ingredients.deleteIngredientText')"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  PropType,
  onMounted,
  computed,
} from "vue";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { Recipe, AppState, NameId } from "@/store/types";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { useI18n } from "vue-i18n";
import { ConfirmDialog } from "@/components";

export default defineComponent({
  components: {
    InputText,
    Button,
    MultiSelect,
    ConfirmDialog,
  },
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: false,
    },
  },
  emits: ["update-ingredients"],
  setup(props, { emit }) {
    const store = useStore<AppState>();
    const user = computed(() => store.state.user);
    const ingredient = ref<string>("");
    const ingredients = computed(() => store.state.ingredientsList || []);
    const selectedIngredients = ref(props.recipe?.ingredients || []);
    const showConfirmDialog = ref(false);
    const ingredientToDelete = ref<NameId>();

    watch(
      () => props.recipe,
      () => {
        if (!props.recipe || !props.recipe.ingredients) return;
        selectedIngredients.value = props.recipe.ingredients;
      }
    );
    watch(ingredients, () => {
      if (ingredient.value) {
        manageNewIngredient();
      }
    });

    const updateForm = () => {
      const chosenIngredients = {
        ingredients: selectedIngredients.value,
      };
      emit("update-ingredients", chosenIngredients);
    };

    const manageNewIngredient = () => {
      const savedIngredient = ingredients.value.find(
        (savedIngredient) => savedIngredient.name === ingredient.value
      );
      if (savedIngredient) {
        selectedIngredients.value.push(savedIngredient);
        ingredient.value = "";
        updateForm();
      } else {
        const newIngredient = {
          id: uuidv4(),
          name: ingredient.value,
        };
        store.dispatch("createIngredient", newIngredient);
      }
    };

    const confirmDelete = (ingredient: NameId) => {
      showConfirmDialog.value = true;
      ingredientToDelete.value = ingredient;
    };

    const deleteIngredient = () => {
      selectedIngredients.value = selectedIngredients.value.filter(
        (selectedIngredient) =>
          selectedIngredient.id !== ingredientToDelete.value?.id
      );
      store.dispatch("removeIngredient", ingredientToDelete.value?.id);
      if (props.recipe) {
        store.dispatch("updateRecipe", {
          id: props.recipe.id,
          ingredients: ingredients.value.filter(
            (savedIngredient) =>
              savedIngredient.id !== ingredientToDelete.value?.id
          ),
        });
      }
      showConfirmDialog.value = false;
      ingredientToDelete.value = undefined;
    };

    onMounted(() => {
      store.dispatch("fetchIngredients");
    });

    watch(user, () => {
      store.dispatch("fetchIngredients");
    });

    return {
      manageNewIngredient,
      updateForm,
      ingredient,
      ingredients,
      selectedIngredients,
      confirmDelete,
      deleteIngredient,
      showConfirmDialog,
      ...useI18n(),
    };
  },
});
</script>

<style scoped lang="scss"></style>
