<template>
  <Dialog
    :header="dialogType === 'login' ? 'Log in' : 'Create new account'"
    :modal="true"
  >
    <form class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="email" />
      </div>
      <div class="p-field p-col-12">
        <label for="password">Password</label>
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
        label="Cancel"
        @click="$emit('close')"
        class="p-button-outlined"
      />
      <Button
        :label="dialogType === 'login' ? 'Login' : 'Create account'"
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
    };
  },
});
</script>

<style scoped></style>
