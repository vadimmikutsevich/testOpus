import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword,
} from 'firebase/auth';
import {
  collection, getDocs, query, where, setDoc, limit, doc,
} from 'firebase/firestore';
import { auth, db } from 'src/boot/firebase';
import Router from 'src/router';
import { useStore } from './store';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    email: '',
    name: '',
    surname: '',
    isManager: false,
    uid: '',
    store: useStore(),
  }),
  actions: {
    // eslint-disable-next-line consistent-return
    async register(email, password, name, surname, isManager) {
      this.store.isLoading = true;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;
        if (user) {
          await setDoc(doc(db, 'usersCollection', user.uid), {
            uid: user.uid,
            name,
            surname,
            isManager: !!isManager,
          });

          this.name = name;
          this.surname = surname;
          this.uid = user.uid;
          this.isManager = isManager;
          this.email = email;
        }

        this.store.isLoading = false;
        this.store.isAuth = true;
        Router.push({ name: 'Home' });
        return user;
      } catch (e) {
        this.store.isLoading = false;
        Router.push({ name: 'Error' });
        console.log(e.message);
      }
    },

    async fetchAuth(email, password) {
      this.store.isLoading = true;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        if (user) {
          this.email = user.email;
          const modelRef = collection(db, 'usersCollection');

          const q = query(modelRef, where('uid', '==', user.uid), limit(1));
          const querySnapshot = await getDocs(q);

          const userInfo = querySnapshot.docs[0].data();

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

    // eslint-disable-next-line consistent-return
    async updateEmail(email) {
      this.store.isLoading = true;

      try {
        await updateEmail(auth.currentUser, email);
        this.email = email;
        this.store.isLoading = false;
      } catch (e) {
        this.store.isLoading = false;
        Router.push({ name: 'Error' });
        return e.message;
      }
    },

    // eslint-disable-next-line consistent-return
    async resetPassword(password) {
      this.store.isLoading = true;

      try {
        await updatePassword(auth.currentUser, password);
        this.store.isLoading = false;
      } catch (e) {
        this.store.isLoading = false;
        Router.push({ name: 'Error' });
        return e.message;
      }
    },
  },
});
