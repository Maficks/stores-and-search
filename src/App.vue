<script setup>
import { useRecipesStore } from './stores/RecipesStore.js'
import { useSearchStore} from './stores/SeachStore.js'
import { ref, onMounted } from 'vue'

const recipesStore = useRecipesStore()
const searchStore = useSearchStore()
const searchText = ref('')
const favouriteSearchText = ref('')

onMounted(() => {
  searchStore.getRecipesImmediately()
})
</script>

<template>
  <body>
    <header>
      <img class="logo" src="/logo.jpg" alt="logo" />
      <h2 class="headerText">My favourite recipes</h2>
    </header>
    <div class="navButtons">
      <button
          :class="{'btn-green': recipesStore.activeTab === 1}"
          @click="recipesStore.setFavouriteTab()"
      >
        Favourite
      </button>
      <button
          :class="{'btn-green': recipesStore.activeTab === 2}"
          @click="recipesStore.setSearchTab()"
      >
        Search
      </button>
    </div>
    <div class="recipes" v-if="recipesStore.activeTab === 1">
      <div class="searchInput">
        <input type="search" v-model="favouriteSearchText" @input="recipesStore.findRecipes(favouriteSearchText)">
      </div>
      <div
          class="recipe"
          v-for="recipe of recipesStore.recipes"
          :key="recipe.id"
          v-if="recipesStore.searching === false"
      >
        <img :src="recipe.image" alt="recipeImage" width="10%" height="auto">
        <span>Number: {{ recipe.id }}</span>
        <span>{{ recipe.name }}</span>
        <button @click="recipesStore.deleteRecipe(recipe)">Remove</button>
        <span
            v-for="recipeIngredient of recipe.ingredients"
            :key="recipeIngredient.id"
            class="ingredients"
        >
          {{ recipeIngredient }},
        </span>
        <span class="gap"></span>
        <span
            v-for="recipeInstruction of recipe.instructions"
            :key="recipeInstruction.id"
        >
          {{ recipeInstruction }}
        </span>
        <span class="gap"></span>
        <span>Preparation time(minutes): {{ recipe.prepTimeMinutes }}</span>
        <span>Cooking time(minutes): {{ recipe.cookTimeMinutes }}</span>
      </div>
      <div v-else>
        <!-- TODO: сделать стилей еще-->
        <div
            v-for="favouriteSearchedRecipe of recipesStore.searchingRecipes"
            :key="favouriteSearchedRecipe.id"
            class="recipe"
        >
          <img :src="favouriteSearchedRecipe.image" alt="recipeImage" width="10%" height="auto">
          <span>Number: {{ favouriteSearchedRecipe.id }}</span>
          <span>{{ favouriteSearchedRecipe.name }}</span>
          <button @click="recipesStore.deleteRecipe(favouriteSearchedRecipe)">Remove</button>
          <span
              v-for="recipeIngredient of favouriteSearchedRecipe.ingredients"
              :key="recipeIngredient.id"
          >
            {{ recipeIngredient }},
          </span>
          <span class="gap"></span>
          <span
              v-for="recipeInstruction of favouriteSearchedRecipe.instructions"
              :key="recipeInstruction.id"
          >
            {{ recipeInstruction }}
          </span>
          <span class="gap"></span>
          <span>Preparation time(minutes): {{ favouriteSearchedRecipe.prepTimeMinutes }}</span>
          <span>Cooking time(minutes): {{ favouriteSearchedRecipe.cookTimeMinutes }}</span>
        </div>
      </div>
    </div>
    <div class="recipes" v-else>
      <div class="searchInput">
        <input type="search" v-model="searchText" @input="searchStore.getRecipes(searchText)">
      </div>
      <div
          class="recipe"
          v-for="searchedItem of searchStore.recipes"
          :key="searchedItem.id"
      >
        <img :src="searchedItem.image" alt="recipeImage" width="10%" height="auto">
        <span>Number: {{ searchedItem.id }}</span>
        <span>{{ searchedItem.name }}</span>
        <button @click="searchStore.addRecipe(searchedItem)">Add</button>
        <span
            v-for="searchedItemIngredient of searchedItem.ingredients"
            :key="searchedItemIngredient.id"
        >
          {{ searchedItemIngredient }},
        </span>
        <span class="gap"></span>
        <span
            v-for="searchedItemInstruction of searchedItem.instructions"
            :key="searchedItemInstruction.id"
        >
          {{ searchedItemInstruction }}
        </span>
        <span class="gap"></span>
        <span>Preparation time(minutes): {{ searchedItem.prepTimeMinutes }}</span>
        <span>Cooking time(minutes): {{ searchedItem.cookTimeMinutes }}</span>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
header {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #535bf2;
}
.logo {
  position: relative;
  margin-top: 2%;
  height: auto;
  width: 10%;
}
.headerText {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 1%;
}
.recipes {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.navButtons {
  display: flex;
  justify-content: center;
  margin: 1%;
}
.searchInput {
  display: flex;
  justify-content: center;
  margin-bottom: 1%;
}
button {
  margin: 0 1em;
}
.recipe {
  margin-bottom: 2.5%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-green {
  background-color: limegreen;
}
.recipe > * {
  margin: 0.3%;
}
.gap {
  margin: 1%;
}
</style>