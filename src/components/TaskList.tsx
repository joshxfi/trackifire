import React, { useState, useEffect } from 'react'
import { Firestore } from '@firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore'

interface TaskListProps {
  db: Firestore
}

export const TaskList: React.FC<TaskListProps> = ({ db }) => {
  const [taskList, setTaskList] = useState<TaskSchema[]>([])
  const taskRef = collection(db, 'tasks')

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
        <Task task={task} />
      ))}
    </div>
  )
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div>
      <h1>{task.description}</h1>
      <p>{task.id}</p>
    </div>
  )
}
