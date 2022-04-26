import { createStore } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

const manageState = () => {
  const localStore = localStorage.getItem("store");
  if (localStore) {
    return JSON.parse(localStore);
  } else {
    return state;
  }
};

const store = createStore({
  mutations,
  actions,
  state: manageState(),
  modules: {},
});

store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
