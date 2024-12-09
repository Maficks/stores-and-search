import { defineStore } from 'pinia'
// options api
export const useMovieStore = defineStore('MovieStore', {
    state: () => ({
        loader: false,
        movies: [],
    }),
    actions: {
        async getMovies(search) {
            this.loader = false
            const res = await fetch(`${url}${search}`);
            const data = await res.json();
            this.movies = data.results;
            this.loader = false;
        }
    }
})
// composition api
// import { ref } from 'pinia'
/*
export const useMovieStore = defineStore('MovieStore', {
    const loader = ref(false)
    const movies = ref([])

    const getMovies = async(search) => {
    loader.value = true;
    const res = await fetch(`${url}${search}`);
    const data = await res.json();
    movies.value = data.results;
    loader.value = false
    }
})
 */

