<template>
  <router-view />
  <QSpinner/>
</template>

<script>
import QSpinner from './components/QSpinner.vue';

export default {
  name: 'App',
  components: {
    QSpinner,
  },
};
</script>
