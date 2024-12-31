import { defineStore } from 'pinia'
import {IRecipe, IRecipes} from "../types/types";

export const useRecipesStore = defineStore('RecipesStore', {
    state: () => ({
        activeTab: 1,
        recipes: [] as IRecipes['recipes'],
        searchingRecipes: [] as IRecipes['recipes'],
        loading: false,
        searching: false,
    }),
    actions: {
        setFavouriteTab(){
            this.activeTab = 1
        },
        setSearchTab(){
            this.activeTab = 2
        },
        findRecipes(search: string) {
            this.searching = true
            this.loading = true
            this.searchingRecipes = this.recipes.filter((elem) => elem.name.toLowerCase().includes(search.toLowerCase()))
            search === '' ? this.searching = false : console.log(this.searchingRecipes)
            this.loading = false
            // TODO: на лоадинг сделать анимацию загрузки можно
            // TODO: чтобы оптимизировать можно еще сделать таймаут на this.loading = false чтобы не нагружать на каждый символ вызывая, чтобы успеть вписать сколько-то символов, или даже скорее не на фолс, а в самом начале сделать таймаут на это же, чтобы не сразу начинались вычисления после каждого символа, да, так правильней даже
        },
        deleteRecipe(recipe: IRecipe){
            this.searchingRecipes = this.recipes.filter((elem) => elem.name.toLowerCase() !== recipe.name.toLowerCase())
            this.recipes = this.searchingRecipes
        }
    }
})