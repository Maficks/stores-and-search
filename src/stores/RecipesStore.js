import { defineStore } from 'pinia'

export const useRecipesStore = defineStore('RecipesStore', {
    state: () => ({
        activeTab: 1,
        recipes: [],
        searchingRecipes: [],
        loading: false,
    }),
    actions: {
        setFavouriteTab(){
            this.activeTab = 1
        },
        setSearchTab(){
            this.activeTab = 2
        },
        findRecipes(search) {
            this.loading = true
            this.searchingRecipes = this.recipes.filter((elem) => elem.name === search)
            search === '' ? this.loading = false : console.log(search)
        }
    }
})