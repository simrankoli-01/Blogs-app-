import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protector({children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
     if (authStatus !== authentication){
      if(authentication){
        navigate('/login')
      } else{
        navigate('/')
      }
     }
      setloader(false)
    }, [authStatus, navigate, authentication])
    
  return loader ? <h1>Loading.....</h1> : <>{children}</>
}