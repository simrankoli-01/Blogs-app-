import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import profileService from '../../appwrite/profile'
import { useForm } from 'react-hook-form'

const EditProfile = () => {
    const [profile, setProfile] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    const { register, handleSubmit, reset, watch } = useForm()

    useEffect(() => {
      if(userData){
        profileService.getUserProfile(userData.$id)
        .then((data) => {
            setProfile(data)

            reset({
                name: data.name,
                Bio: data.Bio
            })
        })
      }
    }, [userData. reset]) 
    console.log(profile)

  return profile
}

export default EditProfile