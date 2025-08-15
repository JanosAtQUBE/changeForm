import { createRouter, createWebHistory } from 'vue-router';
import Index from './pages/index.vue';
import ChangeImplementationForm from './pages/changeImplementationForm.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/changeImplementationForm', component: ChangeImplementationForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
