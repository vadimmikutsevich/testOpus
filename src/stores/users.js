/* eslint-disable consistent-return */
import { defineStore } from 'pinia';
import { db, auth } from 'src/boot/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection, getDocs, query, where, updateDoc, doc, setDoc, deleteDoc,
} from 'firebase/firestore';
import Router from 'src/router';
import { useStore } from './store';
import { useProfileStore } from './profile';

export const useUsersStore = defineStore('users', {
  state: () => ({
    data: [],
    store: useStore(),
    profile: useProfileStore(),
  }),
  actions: {
    async create(email, password, name, surname) {
      this.store.isLoading = true;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        if (user) {
          await setDoc(doc(db, 'usersCollection', user.uid), {
            uid: user.uid,
            name,
            surname,
            isManager: false,
          });

          this.data.push({
            uid: user.uid,
            name,
            surname,
            isManager: false,
          });
        }

        this.store.isLoading = false;
      } catch (e) {
        Router.push({ name: 'Error' });
        this.store.isLoading = false;
        return e.message;
      }
    },
    async update(id, newData) {
      this.store.isLoading = true;
      const modelRef = doc(db, 'usersCollection', id);

      try {
        await updateDoc(modelRef, {
          name: newData.name,
          surname: newData.surname,
        });

        this.data.map((user) => {
          if (user.uid === id) {
            user.name = newData.name;
            user.surname = newData.surname;
          }
          return user;
        });

        this.store.isLoading = false;
      } catch (e) {
        Router.push({ name: 'Error' });
        this.store.isLoading = false;
        return e.message;
      }
    },
    async delete(uid) {
      this.store.isLoading = true;
      const modelRef = doc(db, 'usersCollection', uid);

      try {
        await deleteDoc(modelRef);

        this.data = this.data.filter((user) => user.uid !== uid);
        this.store.isLoading = false;
      } catch (e) {
        Router.push({ name: 'Error' });
        this.store.isLoading = false;
        return e.message;
      }
    },
    async get() {
      this.store.isLoading = true;
      const modelRef = collection(db, 'usersCollection');
      const q = query(modelRef, where('isManager', '!=', true));

      try {
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((docRef) => docRef.data());
        this.data = users;
        this.store.isLoading = false;
        return users;
      } catch (e) {
        return e.message;
      }
    },
  },
});
