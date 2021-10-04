<template>
  <header>
    <h1>{{ $t("app.name") }}</h1>
    <div class="buttons-wrapper">
      <template v-if="!isLoggedIn">
        <Button
          class="p-mr-3"
          :label="$t('user.logIn')"
          @click="$emit('open-dialog', 'login')"
        />
        <Button
          class="p-button-secondary"
          :label="$t('user.register')"
          @click="$emit('open-dialog', 'register')"
        />
      </template>
      <template v-else>
        <Button
          class="p-button-secondary"
          :label="$t('user.logOut')"
          @click="logOut"
        />
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Button from "primevue/button";
import { useStore } from "vuex";
import { AppState } from "@/store/types";

export default defineComponent({
  components: {
    Button,
  },

  setup() {
    const store = useStore<AppState>();
    const isLoggedIn = computed(() => !!store.state.user);
    const logOut = () => {
      store.dispatch("logOutUser");
    };
    return {
      isLoggedIn,
      logOut,
    };
  },
  emits: ["open-dialog", "log-out"],
});
</script>
<style lang="scss" scoped>
header {
  min-height: 300px;
  background: url("./../../assets/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @include breakpoint-max-md {
    min-height: 200px;
    padding: 3rem 2rem 2rem;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  h1 {
    color: white;
    font-size: 5rem;
    line-height: 1;
    z-index: 100;
    text-align: center;

    @include breakpoint-max-md {
      font-size: 3em;
    }
  }

  .buttons-wrapper {
    position: absolute;
    right: 2rem;
    top: 2rem;
    z-index: 1000;
  }
}
</style>
