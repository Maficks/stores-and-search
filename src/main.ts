import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')

window.onload = () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.style.visibility = 'visible';
    }

    // const loadingElement = document.getElementById('loading');
    // if (loadingElement) {
    //     loadingElement.style.display = 'none';
    // }
    }

