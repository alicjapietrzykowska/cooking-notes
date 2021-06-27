<template>
  <div class="p-grid">
    <div class="p-col-3">
      <Button @click="addRecipe" class="btn btn-primary">Add recipe</Button>
      <SearchBar />
    </div>

    <div class="p-col">
      <div v-if="recipes?.length">
        <ListElement
          v-for="recipe of recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
      <NotFound v-else />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SearchBar from "../SearchBar";
import NotFound from "../NotFound";
import ListElement from "../ListElement";
import Button from "primevue/button";
import router from "@/routes";

export default defineComponent({
  components: {
    SearchBar,
    NotFound,
    ListElement,
    Button,
  },
  setup() {
    const recipes = [
      { brand: "Volkswagen", year: 2012, color: "Orange", vin: "dsad231ff" },
      { brand: "Audi", year: 2011, color: "Black", vin: "gwregre345" },
      { brand: "Renault", year: 2005, color: "Gray", vin: "h354htr" },
      { brand: "BMW", year: 2003, color: "Blue", vin: "j6w54qgh" },
      { brand: "Mercedes", year: 1995, color: "Orange", vin: "hrtwy34" },
      { brand: "Volvo", year: 2005, color: "Black", vin: "jejtyj" },
      { brand: "Honda", year: 2012, color: "Yellow", vin: "g43gr" },
      { brand: "Jaguar", year: 2013, color: "Orange", vin: "greg34" },
      { brand: "Ford", year: 2000, color: "Black", vin: "h54hw5" },
      { brand: "Fiat", year: 2013, color: "Red", vin: "245t2s" },
    ];

    const addRecipe = () => {
      router.push({ name: "Recipe" });
    };
    return { recipes, addRecipe };
  },
});
</script>

<style lang="scss" scoped></style>
