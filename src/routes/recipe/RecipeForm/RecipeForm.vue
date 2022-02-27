<template>
  <Card>
    <template #title>
      {{ recipe ? $t("recipe.edit") : $t("recipe.add") }}
    </template>
    <template #content>
      <form>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="name">{{ $t("recipe.name") }} *</label>
            <InputText
              @keyup="checkValidation"
              id="name"
              type="text"
              v-model="form.name"
            />
            <div class="validation-error p-mt-2" v-if="!isNameValid">
              {{ $t("validation.required") }}
            </div>
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="source">{{ $t("recipe.sourceLabel") }}</label>
            <RecipeSource
              @is-valid="isSourceValid = $event"
              @update-source="updateForm"
            />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="url">{{ $t("recipe.dates") }}</label>
            <Calendar
              v-model="selectedDates"
              selectionMode="multiple"
              :maxDate="maxInputValue"
            />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="ingredients">{{ $t("recipe.ingredients") }}</label>
            <RecipeIngredients
              @update-ingredients="updateForm"
              :recipe="recipe"
            />
          </div>
          <div class="p-field p-col-12">
            <label for="rating">{{ $t("recipe.rating") }}</label>
            <Rating :stars="RATING_MAX" v-model="form.rating" :cancel="false" />
          </div>
          <div class="p-field p-col-12">
            <label for="notes">{{ $t("recipe.notes") }}</label>
            <Textarea id="notes" v-model="form.notes" rows="6" />
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <Button
        class="p-mr-3"
        type="button"
        :disabled="!isSourceValid || !isNameValid"
        @click="submitForm"
        :label="$t('common.submit')"
      />
      <Button
        type="button"
        class="p-button-outlined p-button-secondary"
        :label="$t('common.back')"
        @click="$router.go(-1)"
      />
    </template>
  </Card>
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
import Card from "primevue/card";
import RecipeSource from "../RecipeForm/RecipeSource";
import RecipeIngredients from "./RecipeIngredients";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Recipe, AppState } from "@/store/types";
import { RATING_MAX } from "@/static/data.config";
import {
  timestampsToDates,
  getTheLargestNumber,
} from "@/services/utils.service";
export default defineComponent({
  components: {
    InputText,
    Textarea,
    Rating,
    Calendar,
    Button,
    RecipeSource,
    RecipeIngredients,
    Card,
  },
  setup() {
    const store = useStore<AppState>();
    const route = useRoute();
    const router = useRouter();
    const recipeId = route.params.id;
    const selectedDates = ref<Date[]>([]);
    const maxInputValue = ref<Date>(new Date());
    const recipe = computed(() => store.state.activeRecipe);
    const user = computed(() => store.state.user);
    const form: Partial<Recipe> = reactive({
      name: "",
      notes: "",
      rating: 1,
      source: "link",
      ingredients: [],
    });
    const allIngredients = ref([]);
    const isSourceValid = ref(true);
    const isNameValid = ref(true);

    const updateForm = (values: Partial<Recipe>) => {
      Object.assign(form, values);
    };

    watch(recipe, () => {
      if (!recipe.value) return;

      updateForm(recipe.value);
      if (recipe.value.dates?.length)
        selectedDates.value = timestampsToDates(recipe.value.dates);
    });

    const selectedDatesAsTimestamps = () => {
      return selectedDates.value?.map((date) => new Date(date).getTime());
    };

    const submitForm = () => {
      if (!isSourceValid.value) return;
      if (selectedDates.value.length) {
        form.dates = selectedDatesAsTimestamps();
        form.lastUsed = getTheLargestNumber(form.dates);
      }
      if (recipeId) {
        store.dispatch("updateRecipe", { id: recipeId, ...form });
        router.push({ name: "recipe", params: { id: recipeId } });
      } else {
        const creationDate = new Date().getTime();
        store.dispatch("createRecipe", { creationDate, ...form });
        router.push({ name: "list" });
      }
    };

    const getRecipeDataById = () => {
      if (recipeId) {
        store.dispatch("fetchRecipeById", recipeId);
      }
    };

    const checkValidation = () => {
      isNameValid.value = !!form.name;
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
      isNameValid,
      isSourceValid,
      recipe,
      RATING_MAX,
      maxInputValue,
      submitForm,
      updateForm,
      checkValidation,
    };
  },
});
</script>

<style scoped></style>
