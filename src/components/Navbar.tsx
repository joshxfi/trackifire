import React from 'react'
import { useAuth } from '../context/AuthContext'

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()
  const { photoURL } = user || {}

  return (
    <nav className="flex py-3 bg-gray-900 items-center text-sm shadow-md w-screen left-0 fixed z-10">
      <div className="flex justify-between items-center w-[80%] max-w-screen-md mx-auto">
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden inline-block h-[40px] w-[40px] mr-2">
            {photoURL && <img src={`${photoURL}`} alt="user profile photo" />}
          </div>
          <h1 className="text-gray-300 font-semibold">tracki🔥</h1>
        </div>
        <div>
          <button className="font-semibold text-gray-300" onClick={signOut}>
            sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
