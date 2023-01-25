<template>
    <q-page class="flex flex-center">
      <q-banner class="bg-primary text-white">
          Unfortunately, your action did not go through, please try again.
       <template v-slot:action>
          <q-btn @click="onClick" flat color="white" label="GO BACK" />
        </template>
      </q-banner>
    </q-page>
</template>

<script>
import Router from 'src/router';

export default {
  name: 'ErrorPage',
  methods: {
    onClick() {
      Router.back();
    },
  },
};
</script>
