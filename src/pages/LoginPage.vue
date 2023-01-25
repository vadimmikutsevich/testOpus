<template>
  <q-page class="flex flex-center">
    <IntroView  v-if="currentView == 'intro'" :viewHandler="changeView" />
    <LoginPopup v-else-if="currentView == 'login'"/>
    <NewAccount v-else-if="currentView == 'account'"/>
  </q-page>
</template>

<script>
import IntroView from 'components/IntroView.vue';
import LoginPopup from 'src/components/LoginPopup.vue';
import NewAccount from 'src/components/NewAccount.vue';

export default {
  name: 'LoginPage',
  components: {
    IntroView,
    LoginPopup,
    NewAccount,
  },
  data() {
    return {
      currentView: 'intro',
    };
  },
  methods: {
    changeView(newView) {
      this.currentView = newView;
    },
  },
};
</script>
