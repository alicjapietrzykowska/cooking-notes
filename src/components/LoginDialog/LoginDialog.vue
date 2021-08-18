<template>
  <Dialog
    class="login-dialog"
    :header="dialogType === 'login' ? t('user.logIn') : t('user.createAccount')"
    :modal="true"
  >
    <form class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12">
        <label for="email">{{ t("user.email") }}</label>
        <InputText
          id="email"
          type="email"
          v-model="email"
          @keyup="checkEmail"
        />
        <div
          class="validation-error p-mt-2"
          v-if="email.length && !isEmailValid"
        >
          {{ t("validation.invalidEmail") }}
        </div>
      </div>
      <div class="p-field p-col-12">
        <label for="password">{{ t("user.password") }}</label>
        <Password
          id="password"
          v-model="password"
          @keyup="checkPassword"
          toggleMask
          :feedback="dialogType === 'register'"
        ></Password>
        <div
          class="validation-error p-mt-2"
          v-if="
            password.length && dialogType === 'register' && !isPasswordStrong
          "
        >
          {{ t("validation.weakPassword") }}
        </div>
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
        :disabled="!isPasswordStrong || !isEmailValid"
        @click="manageConfirm"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
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
    const isPasswordStrong = ref(false);
    const isEmailValid = ref(false);
    const user = computed(() => store.state.user);

    watch(user, () => emit("close"));

    const checkPassword = () => {
      if (props.dialogType !== "register") return;
      //Minimum 6 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number
      const strongPasswordRegex = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      );
      isPasswordStrong.value = strongPasswordRegex.test(password.value);
    };
    const checkEmail = () => {
      const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      isEmailValid.value = emailRegex.test(email.value);
    };

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
    };
    return {
      email,
      password,
      isEmailValid,
      isPasswordStrong,
      checkEmail,
      checkPassword,
      manageConfirm,
      ...useI18n(),
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.p-dialog .p-dialog-content) {
  max-width: 520px;
}
</style>
