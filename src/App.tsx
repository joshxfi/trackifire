import React from 'react'
import { TaskList } from './components/TaskList'
import { FirestoreProvider } from './context/FirestoreContext'
import { AddTask } from './components/AddTask'
import { useAuth } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Authorize } from './components/Authorize'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col items-center pt-4 min-h-screen">
      {user ? (
        <main className="w-[80%]">
          <Navbar />
          <FirestoreProvider>
            <AddTask />
            <TaskList />
          </FirestoreProvider>
        </main>
      ) : (
        <Authorize />
      )}
    </div>
  )
}
