import React, { useState, useEffect, useContext, createContext } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { User } from '@firebase/auth'
import { auth } from '../config/firebase'

interface Value {
  user: User | null
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<Value>({} as Value)
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<Children> = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null)
    })

    return unsub
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    auth.useDeviceLanguage()

    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.log(err)
    }
  }

  const signOut = async () => {
    try {
      auth.signOut()
    } catch (err) {
      console.log(err)
    }
  }

  const value = {
    user,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
