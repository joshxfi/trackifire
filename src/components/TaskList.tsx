import React, { useState, useEffect } from 'react'
import { onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'
import { FaTimes } from 'react-icons/fa'

export const TaskList: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskSchema[]>([])
  const { db, taskRef } = useFirestore()

  // fetch data from firestore db
  useEffect(() => {
    if (db) {
      const unsub = onSnapshot(taskRef, (docs) => {
        let fetchTask: any[] = []

        docs.forEach((doc) => {
          let task = { ...doc.data(), id: doc.id }
          fetchTask = [task, ...fetchTask]
        })

        setTaskList(fetchTask)
      })

      return unsub
    }
  }, [db])

  return (
    <div>
      {taskList.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { db } = useFirestore()

  const removeTask = async () => {
    await deleteDoc(doc(db, 'tasks', task.id))
  }

  return (
    <div className="flex justify-between text-lg w-full border-b-2 border-gray-300 mb-8 pb-4">
      <p className="px-4">{task.description}</p>
      <button
        className="hover:text-red-800 transition-colors duration-150"
        onClick={removeTask}
      >
        <FaTimes />
      </button>
    </div>
  )
}
