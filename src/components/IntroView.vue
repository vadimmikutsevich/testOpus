<template>
    <q-item tag="div" class="flex column items-center">
      <h6>
        Manage your customers anywhere!
      </h6>
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      >
      <h2>
        join Opus Team
      </h2>
      <div class="flex row justify-between items-center">
        <q-btn
          @click="viewHandler('login')"
          color="primary"
          label="SIGN IN"
          size="22px"
          class="q-px-xl q-py-xs">
        </q-btn>
        <q-btn
          @click="viewHandler('account')"
          text-color="black"
          color="white"
          label="jOIN US "
          size="22px"
          class="q-px-xl q-py-xs">
        </q-btn>
      </div>
    </q-item>
</template>

<script>

export default {
  name: 'IntroView',
  props: ['viewHandler'],
  methods: {
    signInHandler() {
      this.viewHandler('login');
    },
    joinUsHandler() {
      this.viewHandler('account');
    },
  },
};
</script>
