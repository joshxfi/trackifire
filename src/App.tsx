import React, { useState, useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { TaskList } from './components/TaskList'
import { auth } from './config/firebase'
import { FirestoreProvider } from './context/FirestoreContext'

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
    <div className="flex flex-col justify-center pt-4">
      {user ? (
        <FirestoreProvider>
          <button onClick={signOut}>sign out</button>
          <TaskList />
        </FirestoreProvider>
      ) : (
        <button onClick={signIn}>sign in</button>
      )}
    </div>
  )
}
