const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'users', name: 'Users', component: () => import('pages/UsersPage.vue') },
      { path: 'login', name: 'Login', component: () => import('pages/LoginPage.vue') },
      { path: 'error', name: 'Error', component: () => import('pages/ErrorPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
