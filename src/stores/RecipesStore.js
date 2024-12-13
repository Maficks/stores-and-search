import { defineStore } from 'pinia'

export const useRecipesStore = defineStore('RecipesStore', {
    state: () => ({
        activeTab: 1,
        recipes: [],
        searchingRecipes: [],
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
        findRecipes(search) {
            this.searching = true
            this.loading = true
            this.searchingRecipes = this.recipes.filter((elem) => elem.name.includes(search))
            search === '' ? this.searching = false : console.log(this.searchingRecipes)
            this.loading = false
            // TODO: чтобы оптимизировать можно еще сделать таймаут на this.loading = false чтобы не нагружать на каждый символ вызывая, чтобы успеть вписать сколько-то символов, или даже скорее не на фолс, а в самом начале сделать таймаут на это же, чтобы не сразу начинались вычисления после каждого символа, да, так правильней даже
        }
    }
})