import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    isAuth: false,
    isLoading: false,
  }),
});
