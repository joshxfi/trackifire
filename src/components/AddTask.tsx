import React, { useState } from 'react'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'
import { useAuth } from '../context/AuthContext'
import { FaPlus } from 'react-icons/fa'

export const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('')
  const { taskRef } = useFirestore()
  const { uid } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      description: newTask,
      dateAdded: serverTimestamp(),
      completed: false,
      uid,
    }

    setNewTask('')
    newTask && (await addDoc(taskRef, payload))
  }

  return (
    <form
      className="mb-8 mt-28"
      onSubmit={handleSubmit}
      spellCheck="false"
      autoComplete="off"
    >
      <div className="flex justify-between border-b-2 border-gray-300 pb-4">
        <input
          className="bg-gray-200 text-gray-900 w-full pr-4 text-lg outline-none focus:border-gray-400"
          type="text"
          value={newTask}
          placeholder="add a new task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="hover:text-green-700 color-trans" type="submit">
          <FaPlus />
        </button>
      </div>
    </form>
  )
}
