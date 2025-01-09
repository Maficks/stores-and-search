import { defineStore } from 'pinia'
import { useRecipesStore } from './RecipesStore'
const url = 'https://dummyjson.com/recipes' // попробовать заменить на url = new Request(ссылка)
import {IRecipe, IRecipes} from "../types/types";

export const useSearchStore = defineStore("SearchStore", {
    state: () => ({
        loader: false as boolean,
        recipes: [] as IRecipes['recipes'],
        skip: 0 as number,
        pages: [{page: 1, paginatedRecipes: null, filled: true}, {page: 2, paginatedRecipes: null, filled: false}] as object[],
        preferableAmount: 0 as number,
        currentPage: 1 as number
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
        // async getRecipesImmediately(){
        //     const res = await fetch(url)
        //     const data = await res.json()
        //     this.recipes = data.recipes
        //     console.log(this.recipes)
        //     // try catch finally
        // },
        addRecipe(recipe: IRecipe){
            useRecipesStore().recipes.push(recipe)
            // TODO: сделать валидацию, чтобы нельзя было добавить одинаковый
        },
        async getPaginatedRecipesImmediately(){
            screen.width >= 1080 ? this.preferableAmount = 9 : 8
            // const res = await fetch(`${url}?limit=${this.preferableAmount}&skip=${this.skip}`)
            const res = await fetch(`${url}?limit=${this.preferableAmount}`)
            this.skip += this.preferableAmount
            // this.pages.push(this.pages.length+1)
            const data = await res.json()
            this.recipes = data.recipes
            this.pages[0].paginatedRecipes = data.recipes
            // TODO: --разделить фетч часть и функцию, ее вызывать на маунте, хотя так не получмится, так как результат из vue setup не импортировать
            // TODO: тогда сделать функцию с фетч частью еще одну, но не имидиейтли, а по нажатию на страницы в диве из v-for по pages
        },
        async getPaginatedRecipes(page){
            // TODO: бляя вот это ебанина, сделать pages масивом объектов с полями page = page и paginatedRecipes для каждой страницы
            if (this.currentPage == page){
                for (let i = 0; i<4; i++){
                    this.currentPage = 0
                    await this.sleep(100)
                    this.currentPage = page
                    await this.sleep(100)
                }
            } else if (this.pages[page] && this.pages[page - 1].filled === true){
                console.log(page, "else if")
                this.currentPage = page
                console.log(this.pages)
                this.recipes = this.pages[page - 1].paginatedRecipes
            // } else if (this.pages[page-1].paginatedRecipes != null){
            //     this.currentPage = page
            //     this.recipes = this.pages[page-1]
            } else {
                new Promise((resolve, reject) => {
                    fetch(`${url}?limit=${this.preferableAmount}&skip=${this.skip}`)
                        // .then(async resolve => {
                        //     this.skip += this.preferableAmount
                        //     this.pages.push(this.pages.length+1)
                        //     this.currentPage += 1
                        //     const data = await resolve.json()
                        //     this.recipes = data.recipes
                        // }, reject => alert("No more recipes"))
                        .then(response => {
                            if (!response.ok) {
                                reject("Error fetching recipes")
                                return
                            }
                            return response.json()
                        })
                        .then(data => {
                            if (data.total < this.skip) {
                                reject("No more recipes")
                                alert("No more recipes")
                                return
                            } else {
                                console.log(page, "page")
                                this.skip += this.preferableAmount
                                this.currentPage += 1
                                if (this.currentPage === 2 && this.pages[1].filled === false){
                                    this.pages[1].paginatedRecipes = data.recipes
                                    this.pages[1].filled = true
                                    this.pages.push({page: this.pages.length + 1, paginatedRecipes: null, filled: false})
                                    this.recipes = this.pages[page - 1].paginatedRecipes
                                } else {
                                // let result = data.recipes
                                this.pages[page - 1].paginatedRecipes = data.recipes
                                this.pages[page - 1].filled = true
                                this.pages.push({page: this.pages.length + 1, paginatedRecipes: null, filled: false})
                                console.log(this.pages, "pages")
                                this.recipes = this.pages[page - 1].paginatedRecipes
                                }
                                resolve(data)
                            }
                        })
                        .catch(error => {
                            reject(error)
                            alert("No more recipes or error occurred")
                        })
                })
            }
        },
        sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }

},
    getters: {

    }
})