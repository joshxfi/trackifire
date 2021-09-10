import React, { useState } from 'react'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'
import { useAuth } from '../context/AuthContext'
import { User } from '@firebase/auth'

export const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('')
  const { taskRef } = useFirestore()
  const { user } = useAuth()

  const { uid, displayName, photoURL } = user as User

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      description: newTask,
      dateAdded: serverTimestamp(),
      completed: false,
      uid,
      displayName,
      photoURL,
    }

    await addDoc(taskRef, payload)
  }

  return (
    <form className="my-8 flex flex-col" onSubmit={handleSubmit}>
      <input
        className="bg-gray-300 text-gray-900 w-full mb-2 outline-none"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="p-2 bg-green-500" type="submit">
        add task
      </button>
    </form>
  )
}
