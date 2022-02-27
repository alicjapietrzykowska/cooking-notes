<template>
  <div>
    <div class="p-d-flex">
      <div
        v-for="source of sourceOptions"
        :key="source.key"
        class="p-field-radiobutton p-mr-4"
      >
        <RadioButton
          :id="source.key"
          name="source"
          :value="source"
          v-model="selectedSource"
          @change="changeSource"
        />
        <label :for="source.key">{{ source.name }}</label>
      </div>
    </div>
    <div v-if="selectedSource.key === 'link'">
      <div class="p-field">
        <label for="url">{{ $t("recipe.url") }}</label>
        <InputText
          @keyup="validateUrl"
          id="url"
          type="url"
          v-model="form.recipeUrl"
        />
        <div
          class="validation-error p-mt-2"
          v-if="form.recipeUrl && !isUrlValid"
        >
          {{ $t("validation.invalidUrl") }}
        </div>
      </div>
    </div>
    <div v-if="selectedSource.key === 'book'">
      <div class="p-field">
        <label for="title">{{ $t("recipe.book.title") }}</label>
        <InputText id="title" type="text" v-model="form.bookTitle" />
      </div>
      <div class="p-field">
        <label for="page">{{ $t("recipe.book.page") }}</label>
        <InputText id="page" type="text" v-model="form.bookPage" />
      </div>
      <div class="p-field">
        <label for="authors">{{ $t("recipe.book.authors") }}</label>
        <InputText id="authors" type="text" v-model="form.bookAuthors" />
      </div>
    </div>
    <div v-if="selectedSource.key === 'other'">
      <div class="p-field">
        <label for="comment">{{ $t("recipe.comment") }}</label>
        <Textarea id="comment" type="text" v-model="form.comment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  Ref,
  ref,
  watch,
  PropType,
  computed,
} from "vue";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { SourceOption, Recipe, AppState } from "@/store/types";
import { useStore } from "vuex";
import { isValidHttpUrl } from "@/services/utils.service";

export default defineComponent({
  components: {
    RadioButton,
    InputText,
    Textarea,
  },
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: false,
    },
  },
  emits: ["update-source", "is-valid"],
  setup(props, { emit }) {
    const store = useStore<AppState>();
    const isUrlValid = ref();
    const sourceOptions: Ref<SourceOption[]> = ref([
      {
        name: "Link",
        key: "link" as const,
      },
      {
        name: "Book",
        key: "book" as const,
      },
      {
        name: "Other",
        key: "other" as const,
      },
    ]);

    const recipe = computed(() => store.state.activeRecipe);

    const getSource = () => {
      return (
        sourceOptions.value.find(
          (option) => option.key === recipe?.value?.source
        ) || sourceOptions.value[0]
      );
    };

    const initFormValues = {
      source: "link",
      recipeUrl: "",
      bookTitle: "",
      bookPage: "",
      bookAuthors: "",
      comment: "",
    };

    const selectedSource = ref(getSource());
    //split object to create a new one and prevent from overriding initFormValues
    const form = reactive({ ...initFormValues, ...recipe.value });

    watch(recipe, () => {
      Object.assign(form, { ...recipe.value });
      selectedSource.value = getSource();
    });

    const validateUrl = () => {
      if (selectedSource.value.key !== "link") {
        emit("is-valid", true);
      } else {
        isUrlValid.value = isValidHttpUrl(form.recipeUrl);
        emit("is-valid", isUrlValid.value);
      }
    };

    const changeSource = () => {
      const source = {
        source: selectedSource.value.key,
      };
      emit("update-source", source);
      validateUrl();
    };

    return {
      form,
      sourceOptions,
      selectedSource,
      isUrlValid,
      changeSource,
      validateUrl,
    };
  },
});
</script>

<style scoped></style>
