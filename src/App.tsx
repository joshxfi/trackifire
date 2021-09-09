import React from 'react'
import { TaskList } from './components/TaskList'
import { FirestoreProvider } from './context/FirebaseContext'
import { AddTask } from './components/AddTask'

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <FirestoreProvider>
        <AddTask />
        <TaskList />
      </FirestoreProvider>
    </div>
  )
}
