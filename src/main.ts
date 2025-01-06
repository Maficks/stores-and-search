import {computed, createApp} from 'vue'
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

// let tempPreferableAmount:number = 0
// function maxScreenResolution() {
//     if (screen.width >= 1080){
//         tempPreferableAmount = 9
//     } else {
//         tempPreferableAmount = 8
//     }
//     return tempPreferableAmount
// }

// export function getPreferableAmount() {
//     return maxScreenResolution()
// }

// const resultMaxScreenResolution = maxScreenResolution()
// export function getPreferableAmount() {
//     return resultMaxScreenResolution
// }

// console.log(window.devicePixelRatio); // Вернёт коэффициент плотности пикселей, например, 2 или 3
//
// export let preferableAmount: number
// (function maxScreenResolution(){
//     if (screen.width >= 1080){
//         preferableAmount = 9
//     } else {
//         preferableAmount = 8
//     }
//     return preferableAmount
// })()

