import React, { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { useFirestore } from '../context/FirestoreContext'

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
  return (
    <div>
      <h1>{task.description}</h1>
    </div>
  )
}
