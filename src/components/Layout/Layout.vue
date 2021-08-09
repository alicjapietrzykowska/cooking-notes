<template>
  <div>
    <Header @open-dialog="openLoginDialog" />
    <main>
      <router-view />
    </main>

    <LoginDialog
      v-if="showLoginDialog"
      v-model:visible="showLoginDialog"
      :dialogType="loginDialogType"
      @close="showLoginDialog = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Header, LoginDialog } from "@/components";
import { LoginDialogType } from "@/store/types";

export default defineComponent({
  components: {
    Header,
    LoginDialog,
  },
  setup() {
    const showLoginDialog = ref(false);
    const loginDialogType = ref<LoginDialogType>();
    const openLoginDialog = (dialogType: LoginDialogType) => {
      loginDialogType.value = dialogType;
      showLoginDialog.value = true;
    };
    return {
      showLoginDialog,
      loginDialogType,
      openLoginDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
main {
  padding: 2rem;
}
</style>
