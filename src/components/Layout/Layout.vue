<template>
  <div style="width: 100%; flex: 1">
    <div v-if="!isLoading">
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
    <div
      v-else
      class="p-d-flex p-flex-column p-jc-center"
      style="min-height: 100vh"
    >
      <ProgressSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Header, LoginDialog } from "@/components";
import { LoginDialogType, AppState } from "@/store/types";
import { useStore } from "vuex";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  components: {
    Header,
    LoginDialog,
    ProgressSpinner,
  },
  setup() {
    const store = useStore<AppState>();
    const showLoginDialog = ref(false);
    const loginDialogType = ref<LoginDialogType>();
    const openLoginDialog = (dialogType: LoginDialogType) => {
      loginDialogType.value = dialogType;
      showLoginDialog.value = true;
    };
    const isLoading = computed(() => store.state.isLoading);
    return {
      isLoading,
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
  max-width: 1320px;
  margin: 0 auto;

  @include breakpoint-max-md {
    padding: 1rem;
  }
}
</style>
