import React, { useState } from 'react'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useFirestore } from '../context/FirebaseContext'

export const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('')
  const { taskRef } = useFirestore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      description: newTask,
      dateAdded: serverTimestamp(),
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
