import React from 'react'
import { logout } from '../../features/authSlice'
import authservice from '../../appwrite/Auth'
import { useDispatch } from 'react-redux'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authservice.logout()
        .then(() => {
            dispatch(logout())
        })
    }

  return (
        <button
         className='inline-block text-sm md:px-6 px-0 py-2 duration-200  hover:bg-white/10 transition rounded-full'
         onClick={logoutHandler}
         >Logout</button>
  )
}

export default LogoutBtn
