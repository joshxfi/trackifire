import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FcGoogle } from 'react-icons/fc'

export const Authorize: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <div className="w-[80%] flex flex-col items-center mt-32">
      <h1 className="text-5xl lg:text-9xl font-bold text-gray-900">
        Trackifire
      </h1>
      <p className="lg:text-4xl">
        <i>just another task-tracker 🔥</i>
      </p>
      <div
        className="mt-8 flex items-center bg-gray-900 text-gray-200 p-2 px-16 rounded-md cursor-pointer hover:bg-gray-800 color-trans lg:text-2xl"
        onClick={signIn}
      >
        <p className="mr-2 text-sm lg:text-lg">sign in with google</p>
        <FcGoogle />
      </div>
    </div>
  )
}
