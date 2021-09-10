import React from 'react'
import { useAuth } from '../context/AuthContext'
import { AiOutlineGoogle } from 'react-icons/ai'

export const Authorize: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <div className="w-[80%] flex flex-col items-center mt-32">
      <h1 className="text-5xl font-bold mb-4 text-green-800">Trackify</h1>
      <div
        className="flex items-center bg-green-700 text-gray-200 p-2 px-16 rounded-md cursor-pointer"
        onClick={signIn}
      >
        <p className="mr-2">sign in</p>
        <AiOutlineGoogle />
      </div>
    </div>
  )
}
