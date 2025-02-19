import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Material from '@primevue/themes/material';
import Button from 'primevue/button';

// Configuration globale d'axios
axios.defaults.baseURL = 'http://localhost/auth/api';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue, {
    theme: {
        preset: Material,
    }
})

app.component('Button', Button);

// Vérification de l'authentification au démarrage de l'application
store.dispatch('checkAuth')

app.mount('#app')