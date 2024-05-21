import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: 'AIzaSyAau6KV7T_Je9ZIqwYbFaykJEHr_TKVTHE',
  authDomain: 'posease-49b47.firebaseapp.com',
  projectId: 'posease-49b47',
  storageBucket: 'posease-49b47.appspot.com',
  messagingSenderId: '350207854574',
  appId: '1:350207854574:web:eca0f57829650e23fdb0ff',
  measurementId: 'G-6XKWJRM2PP',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore,storage };
