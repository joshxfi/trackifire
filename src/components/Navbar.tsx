import React from 'react'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { user, signIn, signOut } = useAuth()
  const { photoURL } = user || {}

  return (
    <nav className="flex justify-between text-sm items-center">
      <div className="rounded-full overflow-hidden inline-block h-[40px] w-[40px] mr-2">
        {photoURL && <img src={`${photoURL}`} alt="user profile photo" />}
      </div>
      <div>
        {user ? (
          <button onClick={signOut}>sign out</button>
        ) : (
          <button onClick={signIn}>sign in</button>
        )}
      </div>
    </nav>
  )
}
