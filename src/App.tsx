import React from 'react'
import { TaskList } from './components/TaskList'
import { FirestoreProvider } from './context/FirestoreContext'
import { AddTask } from './components/AddTask'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, signIn, signOut } = useAuth()

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      {user ? (
        <>
          <button onClick={signOut}>sign out</button>
          <FirestoreProvider>
            <AddTask />
            <TaskList />
          </FirestoreProvider>
        </>
      ) : (
        <button onClick={signIn}>sign in</button>
      )}
    </div>
  )
}
