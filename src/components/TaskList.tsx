import React, { useState, useEffect } from 'react'
import { onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'
import { FaCheck, FaTrashAlt } from 'react-icons/fa'

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
      <div className="w-full flex">
        <button
          className="hover:text-red-800 color-trans border-r-2 border-gray-300 pr-4"
          onClick={removeTask}
        >
          <FaTrashAlt />
        </button>
        <p className="px-4">{task.description}</p>
      </div>
      <button className="hover:text-green-700 color-trans border-gray-300">
        <FaCheck />
      </button>
    </div>
  )
}
