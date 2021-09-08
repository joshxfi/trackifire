import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'AIzaSyC2qbwDkItmmqskNEIzqxF5ZtJbnN9Dais',
  authDomain: 'hello-world-e6c48.firebaseapp.com',
  projectId: 'hello-world-e6c48',
  storageBucket: 'hello-world-e6c48.appspot.com',
  messagingSenderId: '219393099994',
  appId: '1:219393099994:web:32c42e48ccfbfadb257de3',
})

const auth = getAuth(app)
const db = getFirestore(app)

export default function App() {
  const [user, setUser] = useState(() => auth.currentUser)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null)
    })

    return unsub
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    auth.useDeviceLanguage()

    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.log(err)
    }
  }

  const signOut = async () => {
    try {
      auth.signOut()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {user ? (
        <button onClick={signOut}>sign out</button>
      ) : (
        <button onClick={signIn}>sign in</button>
      )}
    </div>
  )
}
