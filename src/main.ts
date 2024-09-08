import { createApp } from 'vue';
import 'animate.css';
import './style.css';
import App from './App.vue';
import {router} from "./router";
import {createPinia} from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
createApp(App).use(pinia).use(router).use(Toast).mount('#app');
