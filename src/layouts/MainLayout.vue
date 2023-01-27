<template>
  <q-layout view="hHh lpR fFf" :class="store.isLoading && 'light-dimmed'">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn v-if="store.isAuth" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          OPUS
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-if="store.isAuth" align="left">
          <q-route-tab to="/" label="Profile" />
          <q-route-tab v-if="profile.isManager" to="/users" label="Users" />
      </q-tabs>
    </q-header>

    <q-drawer v-if="store.isAuth"
      class="bg-primary text-white"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      style="padding-left: 14px"
      bordered>
        <h2>Welcome</h2>
        <p class="text-weight-bold text-subtitle1">Email: {{ profile.email }}</p>
        <p class="text-weight-bold text-subtitle1">Name: {{ profile.name }}</p>
        <p class="text-weight-bold text-subtitle1">Surname: {{ profile.surname }}</p>
        <p class="text-weight-bold text-subtitle1">
          Status: {{ profile.isManager ? 'Manager' : 'User'}}
        </p>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'src/stores/store';
import { useProfileStore } from 'src/stores/profile';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const profile = useProfileStore();

    return {
      store,
      profile,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
