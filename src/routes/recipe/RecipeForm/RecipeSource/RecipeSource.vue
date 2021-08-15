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
        <label for="url">{{ t("recipe.url") }}</label>
        <InputText id="url" type="text" v-model="form.recipeUrl" />
      </div>
    </div>
    <div v-if="selectedSource.key === 'book'">
      <div class="p-field">
        <label for="title">{{ t("recipe.book.title") }}</label>
        <InputText id="title" type="text" v-model="form.bookTitle" />
      </div>
      <div class="p-field">
        <label for="page">{{ t("recipe.book.page") }}</label>
        <InputText id="page" type="text" v-model="form.bookPage" />
      </div>
      <div class="p-field">
        <label for="authors">{{ t("recipe.book.authors") }}</label>
        <InputText id="authors" type="text" v-model="form.bookAuthors" />
      </div>
    </div>
    <div v-if="selectedSource.key === 'other'">
      <div class="p-field">
        <label for="comment">{{ t("recipe.comment") }}</label>
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
import { useI18n } from "vue-i18n";

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
  emits: ["update-source"],
  setup(props, { emit }) {
    const store = useStore<AppState>();
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

    const initFormValues = {
      recipeUrl: "",
      bookTitle: "",
      bookPage: "",
      bookAuthors: "",
      comment: "",
    };

    const getSource = () => {
      return (
        sourceOptions.value.find(
          (option) => option.key === recipe?.value?.source
        ) || sourceOptions.value[0]
      );
    };

    const selectedSource = ref(getSource());
    //split object to create a new one and prevent from overriding initFormValues
    const form = reactive({ ...initFormValues, ...recipe.value });

    watch(recipe, () => {
      Object.assign(form, { ...recipe.value });
      selectedSource.value = getSource();
    });

    const changeSource = () => {
      Object.assign(form, {
        source: selectedSource.value.key,
      });
    };

    watch(form, () => {
      emit("update-source", form);
    });

    return {
      form,
      sourceOptions,
      selectedSource,
      changeSource,
      ...useI18n(),
    };
  },
});
</script>

<style scoped></style>
