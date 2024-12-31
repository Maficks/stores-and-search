import { defineStore } from 'pinia'
import { useRecipesStore } from './RecipesStore'
const url = 'https://dummyjson.com/recipes' // попробовать заменить на url = new Request(ссылка)
import {IRecipe, IRecipes} from "../types/types";

export const useSearchStore = defineStore("SearchStore", {
    state: () => ({
        loader: false,
        recipes: [] as IRecipes['recipes'],
    }),
    actions: {
        async getRecipes(search: string){
            this.loader = true
            const res = await fetch(`${url}/search?q=${search}`)
            const data = await res.json()
            this.recipes = data.recipes
            this.loader = false
            // try catch finally
        },
        async getRecipesImmediately(){
            const res = await fetch(url)
            const data = await res.json()
            this.recipes = data.recipes
            console.log(this.recipes)
            // try catch finally
        },
        addRecipe(recipe: IRecipe){
            useRecipesStore().recipes.push(recipe)
            // TODO: сделать валидацию, чтобы нельзя было добавить одинаковый
        },
    },
    getters: {

    }
})