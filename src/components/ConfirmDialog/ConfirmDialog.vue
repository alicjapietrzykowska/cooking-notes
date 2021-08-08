<template>
  <Dialog :header="header" class="confirm-dialog" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>{{ text }}</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="$emit('close')"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="$emit('confirm')"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default defineComponent({
  components: {
    Dialog,
    Button,
  },
  props: {
    header: {
      type: String,
      default: "Are you sure?",
    },
    text: {
      type: String,
      default: "Are you sure you want to proceed?",
    },
  },
  emits: ["close", "confirm"],
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.confirm-dialog {
  max-width: 350px;
}
</style>
