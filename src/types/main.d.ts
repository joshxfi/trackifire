interface TaskSchema {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  description: string;
  completed: boolean;
  dateAdded: Date;
}

interface Children {
  children: React.ReactNode;
}