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
         className='inline-block md:text-sm text-xs md:px-4 px-2 py-1 duration-200 hover:outline-1 rounded-full'
         onClick={logoutHandler}
         >Logout</button>
  )
}

export default LogoutBtn
