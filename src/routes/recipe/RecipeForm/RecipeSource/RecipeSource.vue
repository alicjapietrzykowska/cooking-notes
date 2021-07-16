<template>
  <div>
    <div class="p-d-flex">
      <div
        v-for="source of sourceOptions"
        :key="source.key"
        class="p-field-radiobutton"
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
      <div class="p-field p-col-6">
        <label for="url">Recipe url</label>
        <InputText id="url" type="text" v-model="form.recipeUrl" />
      </div>
    </div>
    <div v-if="selectedSource.key === 'book'">
      <div class="p-field p-col-6">
        <label for="title">Book title</label>
        <InputText id="title" type="text" v-model="form.bookTitle" />
      </div>
      <div class="p-field p-col-6">
        <label for="page">Book page</label>
        <InputText id="page" type="text" v-model="form.bookPage" />
      </div>
      <div class="p-field p-col-6">
        <label for="authors">Book author(s)</label>
        <InputText id="authors" type="text" v-model="form.bookAuthors" />
      </div>
    </div>
    <div v-if="selectedSource.key === 'other'">
      <div class="p-field p-col-6">
        <label for="comment">Comment</label>
        <Textarea id="comment" type="text" v-model="form.comment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, watch } from "vue";
import RadioButton from "primevue/radiobutton";
import { SourceOption } from "../../store/types";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

export default defineComponent({
  components: {
    RadioButton,
    InputText,
    Textarea,
  },
  emits: ["update-source"],
  setup(props, { emit }) {
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

    const initFormValues = {
      recipeUrl: "",
      bookTitle: "",
      bookPage: "",
      bookAuthors: "",
      comment: "",
    };

    const selectedSource = ref(sourceOptions.value[0]);

    //split object to create a new one and prevent from overriding initFormValues
    const form = reactive({ ...initFormValues });

    const changeSource = () => {
      // Clear inputs connected to source and add source to the form
      Object.assign(form, {
        ...initFormValues,
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
    };
  },
});
</script>

<style scoped></style>
