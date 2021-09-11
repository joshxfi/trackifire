import React, { useState, useEffect } from 'react'
import { query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'
import { BsTrash, BsCheck } from 'react-icons/bs'
import { useAuth } from '../context/AuthContext'

export const TaskList: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskSchema[]>([])
  const { db, taskRef } = useFirestore()
  const { uid } = useAuth()

  // fetch data from firestore db
  useEffect(() => {
    if (db) {
      const queryTask = query(taskRef, orderBy('dateAdded'))
      const unsub = onSnapshot(queryTask, (docs) => {
        let fetchTask: TaskSchema[] | any[] = []

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
      {taskList
        .filter((task) => task.uid === uid)
        .map((task) => (
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
    <div className="flex justify-between text-lg w-full border-b-2 border-gray-300 mb-8 pb-4 group checkHover">
      <div className="w-full flex">
        <button
          className="hover:text-red-800 color-trans border-r-2 border-gray-300 pr-4"
          onClick={removeTask}
        >
          <BsTrash />
        </button>
        <p className="px-4">{task.description}</p>
      </div>
      <button className="hover:text-green-700 color-trans border-gray-300 opacity-0 check">
        <BsCheck className="text-2xl" />
      </button>
    </div>
  )
}
