import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { createRouter, createWebHistory } from 'vue-router';
import UserList from './components/UserList.vue';
import UserForm from './components/UserForm.vue';

const routes = [
  { path: '/', name: 'user-list', component: UserList },
  { path: '/user-form/:userId?', name: 'user-form', component: UserForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');