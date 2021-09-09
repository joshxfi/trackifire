interface TaskSchema {
  id: string
  description: string
  completed: boolean
  dateAdded: Date
}

interface Children {
  children: React.ReactNode;
}
