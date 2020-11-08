'use strict';

import {createApp} from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';

import Loading from '../src/index';

const app = createApp(App);
app.mount('#app')
app.use(Loading)
