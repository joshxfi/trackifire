import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyC2qbwDkItmmqskNEIzqxF5ZtJbnN9Dais',
  authDomain: 'hello-world-e6c48.firebaseapp.com',
  projectId: 'hello-world-e6c48',
  storageBucket: 'hello-world-e6c48.appspot.com',
  messagingSenderId: '219393099994',
  appId: '1:219393099994:web:32c42e48ccfbfadb257de3',
});

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
