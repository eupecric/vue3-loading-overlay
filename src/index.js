import Component from './js/Component.vue';
import LoadingApi from './js/api';
import './css/index.css';

const Plugin = (app, props = {}, slots = {}) => {
  app.config.globalProperties.$loading = LoadingApi(app, props, slots);
};

Component.install = Plugin;

export default Component;
