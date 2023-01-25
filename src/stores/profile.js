import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  collection, getDocs, query, where, addDoc, limit,
} from 'firebase/firestore';
import { auth, db } from 'src/boot/firebase';
import Router from 'src/router';
import { useStore } from './store';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: '',
    surname: '',
    isManager: false,
    uid: '',
    store: useStore(),
  }),

  getters: {

  },

  mutations: {

  },

  actions: {
    async register(email, password, name, surname, isManager) {
      this.store.isLoading = true;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;
        if (user) {
          const docRef = await addDoc(collection(db, 'usersCollection'), {
            uid: user.uid,
            name,
            surname,
            isManager: true,
          });

          if (docRef) {
            this.name = name;
            this.surname = surname;
            this.uid = user.uid;
            this.isManager = isManager;
          }
        }

        this.store.isLoading = false;
        this.store.isAuth = true;
        Router.push({ name: 'Home' });
        return user;
      } catch (e) {
        this.store.isLoading = false;
        Router.push({ name: 'Error' });
        return e.message;
      }
    },

    async fetchAuth(email, password) {
      this.store.isLoading = true;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        if (user) {
          const modelRef = collection(db, 'usersCollection');

          const q = query(modelRef, where('uid', '==', user.uid), limit(1));
          const querySnapshot = await getDocs(q);

          const userInfo = querySnapshot.docs[0].data();
          console.log(userInfo);

          if (userInfo) {
            this.name = userInfo.name;
            this.surname = userInfo.surname;
            this.uid = userInfo.uid;
            this.isManager = userInfo.isManager;
          }
        }

        this.store.isAuth = true;
        this.store.isLoading = false;
        Router.push({ name: 'Home' });
        return user;
      } catch (e) {
        this.store.isLoading = false;
        Router.push({ name: 'Error' });
        return e.message;
      }
    },
  },
});
