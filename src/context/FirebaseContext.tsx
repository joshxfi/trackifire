import React, { useState, useEffect, createContext, useContext } from 'react'
import { collection } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { CollectionReference, Firestore } from '@firebase/firestore'
import { User } from '@firebase/auth'
import { db, auth } from '../config/firebase'

interface Value {
  db: Firestore
  taskRef: CollectionReference
  signIn: () => void
  signOut: () => void
  user: User | null
}

const FirestoreContext = createContext<Value>({} as Value)
export const useFirestore = () => {
  return useContext(FirestoreContext)
}

export const FirestoreProvider: React.FC<Children> = ({ children }) => {
  const taskRef = collection(db, 'tasks')

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

  const value: Value = {
    db,
    taskRef,
    signIn,
    signOut,
    user,
  }

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  )
}
