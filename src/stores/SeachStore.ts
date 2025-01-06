import { defineStore } from 'pinia'
import { useRecipesStore } from './RecipesStore'
const url = 'https://dummyjson.com/recipes' // попробовать заменить на url = new Request(ссылка)
import {IRecipe, IRecipes} from "../types/types";

export const useSearchStore = defineStore("SearchStore", {
    state: () => ({
        loader: false,
        recipes: [] as IRecipes['recipes'],
        skip: 0,
        pages: [],
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
        async getPaginatedRecipesImmediately(){
            let preferableAmount:number = 0
            if (screen.width >= 1080){
                preferableAmount = 9
            } else {
                preferableAmount = 8
            }
            console.log(preferableAmount)
            const res = await fetch(`${url}?limit=${preferableAmount}&skip=${this.skip}`)
            this.skip += preferableAmount
            this.pages.push(this.pages.length+1)
            const data = await res.json()
            this.recipes = data.recipes
            // TODO: --разделить фетч часть и функцию, ее вызывать на маунте, хотя так не получмится, так как результат из vue setup не импортировать
            // TODO: тогда сделать функцию с фетч частью еще одну, но не имидиейтли, а по нажатию на страницы в диве из v-for по pages
        }
    },
    getters: {

    }
})