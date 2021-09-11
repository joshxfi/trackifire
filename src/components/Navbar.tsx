import React from 'react'
import { useAuth } from '../context/AuthContext'

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()
  const { photoURL } = user || {}

  return (
    <nav className="flex py-2 bg-gray-200 items-center text-sm shadow-lg w-screen left-0 fixed z-10">
      <div className="flex justify-between items-center w-[80%] mx-auto">
        <div className="rounded-full overflow-hidden inline-block h-[40px] w-[40px] mr-2">
          {photoURL && <img src={`${photoURL}`} alt="user profile photo" />}
        </div>
        <div>
          <button className="font-semibold" onClick={signOut}>
            sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
