import React, { useState } from 'react'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'
import { useAuth } from '../context/AuthContext'
import { User } from '@firebase/auth'
import { MdAdd } from 'react-icons/md'

export const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('')
  const { taskRef } = useFirestore()
  const { user } = useAuth()

  const { uid } = user as User

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
      className="my-8 flex"
      onSubmit={handleSubmit}
      spellCheck="false"
      autoComplete="off"
    >
      <input
        className="bg-gray-300 text-gray-900 w-full rounded-xl mr-1 px-4 text-lg h-2rem outline-none border-2 focus:border-gray-400"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="h-[3rem] px-[1rem] rounded-xl bg-green-600 text-gray-200"
        type="submit"
      >
        <MdAdd className="text-xl" />
      </button>
    </form>
  )
}
