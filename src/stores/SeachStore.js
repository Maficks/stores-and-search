import { defineStore } from 'pinia'
import { useRecipesStore } from './RecipesStore.js'
const url = 'https://dummyjson.com/recipes' // попробовать заменить на url = new Request(ссылка)

export const useSearchStore = defineStore("SearchStore", {
    state: () => ({
        loader: false,
        recipes: [],
    }),
    actions: {
        async getRecipes(search){
            this.loader = true
            const res = await fetch(`${url}/search?q=${search}`)
            const data = await res.json()
            this.recipes = data.recipes
            this.loader = false
        },
        async getRecipesImmediately(){
            const res = await fetch(url)
            const data = await res.json()
            this.recipes = data.recipes
        },
        addRecipe(recipe){
            useRecipesStore().recipes.push(recipe)
        },
    },
    getters: {

    }
})