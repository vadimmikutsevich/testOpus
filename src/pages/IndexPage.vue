<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center" v-if="!profile.isManager">
      <div class="q-gutter-md flex flex-column" style="max-width: 300px; margin-right: 18px;">
        <h4 class='text-overline'> You can change email</h4>
        <q-input outlined v-model="dataForUpdate.email" label="New email" />
        <q-btn
          v-if="dataForUpdate.email.length"
          @click="onChangeEmail"
          color="primary"
          icon="mail"
          label="SET NEW EMAIL" />
      </div>
      <div class="q-gutter-md flex flex-column" style="max-width: 300px">
        <h4 class='text-overline'> or set a new password</h4>
        <q-input outlined v-model="dataForUpdate.password" label="New password" />
        <q-btn
          v-if="dataForUpdate.password.length"
          @click="onResetPassword"
          color="red"
          icon-right="lock"
          label="SET PASSWORD" />
      </div>
    </div>

    <q-banner v-if="profile.isManager" inline-actions rounded class="bg-orange text-white">
      <p>Welcome! Today there are some users to manage.</p>
      Unfortunately, in manager mode you cannot change your profile :(
      <p>Have good work!</p>
      <template v-slot:action>
        <q-btn @click="goToUsers" flat label="Go ahead!" />
      </template>
    </q-banner>
  </q-page>
</template>

<script>
import { useProfileStore } from 'src/stores/profile';
import Router from 'src/router';

export default {
  name: 'ProfilePage',
  setup() {
    const profile = useProfileStore();

    return {
      profile,
    };
  },
  data() {
    return {
      dataForUpdate: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    onChangeEmail() {
      this.profile.updateEmail(this.dataForUpdate.email);
      this.dataForUpdate.email = '';
    },
    onResetPassword() {
      this.profile.resetPassword(this.dataForUpdate.password);
      this.dataForUpdate.password = '';
    },
    goToUsers() {
      Router.push({ name: 'Users' });
    },
  },
};
</script>
