<template>
 <div class="q-pa-md" style="width: 400px">

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
        <q-input
            filled
            v-model="accountData.name"
            label="Your name *"
            hint="Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your name']"
        />

        <q-input
            filled
            v-model="accountData.surname"
            label="Your surname *"
            hint="Surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your surname']"
        />

        <q-input
            filled
            v-model="accountData.email"
            label="Your email *"
            hint="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your email']"
        />

        <q-input
            filled
            v-model="accountData.password"
            label="Your password *"
            lazy-rules
            :rules="[
                val => val !== null && val !== '' || 'Please type your password',
                val => val.length >= 8 || 'Password\'s length is not long enough'
            ]"
        />

        <q-toggle v-model="accountData.isManager" label="You're a manager?" />

        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>

    </div>
</template>

<script>
import { useProfileStore } from 'src/stores/profile';
import { useStore } from 'src/stores/store';

export default {
  name: 'NewAccount',
  setup() {
    const store = useStore();
    const profile = useProfileStore();

    return {
      store,
      profile,
    };
  },
  data() {
    return {
      accountData: {
        email: '',
        password: '',
        name: '',
        surname: '',
        isManager: false,
      },
    };
  },
  methods: {
    onReset() {
      this.accountData.email = '';
      this.accountData.password = '';
      this.accountData.name = '';
      this.accountData.surname = '';
      this.accountData.isManager = false;
    },
    onSubmit() {
      this.profile.register(
        this.accountData.email,
        this.accountData.password,
        this.accountData.name,
        this.accountData.surname,
        this.accountData.isManager,
      );
    },
  },
};
</script>
