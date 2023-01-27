<template>
  <router-view />
  <QSpinner/>
</template>

<script>
import QSpinner from './components/QSpinner.vue';
import { useUsersStore } from './stores/users';

export default {
  name: 'App',
  components: {
    QSpinner,
  },
  setup() {
    const users = useUsersStore();

    return {
      users,
    };
  },
  mounted() {
    this.users.get();
  },
};
</script>
