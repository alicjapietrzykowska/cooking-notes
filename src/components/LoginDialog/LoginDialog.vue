<template>
  <Dialog
    :header="dialogType === 'login' ? t('user.logIn') : t('user.createAccount')"
    :modal="true"
  >
    <form class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12">
        <label for="email">{{ t("user.email") }}</label>
        <InputText id="email" type="email" v-model="email" />
      </div>
      <div class="p-field p-col-12">
        <label for="password">{{ t("user.password") }}</label>
        <Password
          id="password"
          v-model="password"
          toggleMask
          :feedback="dialogType === 'register'"
        ></Password>
      </div>
    </form>
    <template #footer>
      <Button
        :label="t('common.cancel')"
        @click="$emit('close')"
        class="p-button-outlined"
      />
      <Button
        :label="
          dialogType === 'login' ? t('user.logIn') : t('user.createAccount')
        "
        @click="manageConfirm"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { useStore } from "vuex";
import { AppState, Credentials } from "@/store/types";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    InputText,
    Password,
    Dialog,
    Button,
  },
  props: {
    dialogType: {
      type: String,
      default: "login",
    },
  },
  setup(props, { emit }) {
    const store = useStore<AppState>();
    const email = ref("");
    const password = ref("");

    const manageConfirm = () => {
      const userCredentials: Credentials = {
        email: email.value,
        password: password.value,
      };
      if (props.dialogType === "login") {
        store.dispatch("loginUser", userCredentials);
      } else {
        store.dispatch("createUser", userCredentials);
      }
      emit("close");
    };
    return {
      email,
      password,
      manageConfirm,
      ...useI18n(),
    };
  },
});
</script>

<style scoped></style>
