import React, { createContext, useContext } from 'react'
import { collection } from 'firebase/firestore'
import { CollectionReference, Firestore } from '@firebase/firestore'
import { db } from '../config/firebase'

interface Value {
  db: Firestore
  taskRef: CollectionReference
}

const FirestoreContext = createContext<Value>({} as Value)
export const useFirestore = () => {
  return useContext(FirestoreContext)
}

export const FirestoreProvider: React.FC<Children> = ({ children }) => {
  const taskRef = collection(db, 'tasks')

  const value: Value = {
    db,
    taskRef,
  }

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  )
}
