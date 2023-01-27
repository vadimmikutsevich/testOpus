import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'src/stores/store';
import routes from './routes';

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createWebHistory(),
});

// eslint-disable-next-line consistent-return
Router.beforeResolve(async (to) => {
  const store = useStore();

  if (!store.isAuth && to.name !== 'Login' && to.name !== 'Error') {
    return { name: 'Login' };
  }
});

export default Router;
