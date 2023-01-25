<template>
    <div class="q-pa-md" style="width: 400px">

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="loginData.email"
        label="Your email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your email']"
      />

      <q-input
        filled
        v-model="loginData.password"
        label="Your password *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your password',
          val => val !== null && val !== '' || 'Password\'s length is not long enough'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

    </div>
</template>

<script>
import { useProfileStore } from 'src/stores/profile';

export default {
  name: 'LoginPopup',
  setup() {
    const profile = useProfileStore();

    return {
      profile,
    };
  },
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    onReset() {
      this.loginData.email = '';
      this.loginData.password = '';
    },
    onSubmit() {
      this.profile.fetchAuth(this.loginData.email, this.loginData.password);
    },
  },
};
</script>
