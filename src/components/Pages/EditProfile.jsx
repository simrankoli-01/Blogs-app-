import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import profileService from '../../appwrite/profile'
import { useForm } from 'react-hook-form'
import { Button, Input, Logo } from '../index';
import { Link } from 'react-router-dom'

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
    // console.log(profile)

  return (
    <div className="flex items-center justify-center w-full md:py-10 py-0">
          <div className={`mx-auto w-full max-w-lg  md:rounded-2xl rounded-none p-5  bg-white/20`}>
            <div className="flex justify-center">
              <span className="inline-block w-full max-w-[5vw]">
                <Logo />
              </span>
            </div>
            {/* <h2 className="text-center text-2xl font-bold leading-tight">
              Sign in to your acount
            </h2> */}
            {/* <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p> */}
            {/* {error && <p className="text-red-500 mt-8 text-center"></p>} */}
            <form  className="mt-8">
              <div className="space-y-2">
                <Input
                  label="Name: "
                  placeholder="Enter your name"
                  type="text"
                  {...register("Name", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                        "Name should be unique",
                    },
                  })}
                />
                <Input
                  label="Bio: "
                  placeholder="Bio"
                  type="text"
                  {...register("Bio", {
                    required: true,
                    minLength: {
                      value: 300,
                      message: "characters should be 300",
                    },
                  })}
                />
                <Input
                  label="email: "
                  placeholder="email"
                  type="email"
                  {...register("email", {
                    required: true
                  })}
                />
                {/* {errors.password && (
                  <p className="text-red-500 text-sm mt-1"></p>
                )} */}
                <Button
                  onClick={(e) => console.log("button clicked")}
                  className="w-full text-white bg-pink-800"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default EditProfile