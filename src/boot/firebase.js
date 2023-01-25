import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAKcymz8vObOddQabBIxgUPSlI9p72E8S8',
  authDomain: 'testopus-7e365.firebaseapp.com',
  projectId: 'testopus-7e365',
  storageBucket: 'testopus-7e365.appspot.com',
  messagingSenderId: '657364070039',
  appId: '1:657364070039:web:bb0fd8d41e65d401ff43d2',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
