/* import App from './src/App.vue'

export default {
    components: {
        App
    },
    setup() {
        return {

        }
    }
}

import { Vue, createApp } from 'vue'

const app = {
    data() {
        return {
            msg: 'gg'
        }
    }
}
Vue.createApp(app).mount('#app') - vue2 options api вот так вроде выглядит */

// vue 3 composition api
/* const { createApp, ref } = Vue

createApp({
    setup() {
        const message = ref('Hello Vue!')
        return {
            message
        }
    }
}).mount('#app') */