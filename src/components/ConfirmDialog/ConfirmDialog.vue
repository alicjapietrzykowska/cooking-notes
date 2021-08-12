<template>
  <Dialog :header="header" class="confirm-dialog" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>{{ text }}</span>
    </div>
    <template #footer>
      <Button
        :label="t('common.cancel')"
        icon="pi pi-times"
        @click="$emit('close')"
        class="p-button-text"
      />
      <Button
        :label="t('common.confirm')"
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
import { i18n } from "@/i18n";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    Dialog,
    Button,
  },
  props: {
    header: {
      type: String,
      default: i18n.global.t("common.areYouSure"),
    },
    text: {
      type: String,
      default: i18n.global.t("common.areYouSureProceed"),
    },
  },
  emits: ["close", "confirm"],
  setup() {
    return {
      ...useI18n(),
    };
  },
});
</script>

<style scoped lang="scss">
.confirm-dialog {
  max-width: 350px;
}
</style>
