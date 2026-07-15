import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginaction } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import authservice from "../appwrite/Auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    // console.log("onSubmit fired with: ", data)
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.isLogedin();
        if (userData) dispatch(loginaction(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // console.log("RHF error: ", errors)
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className={`mx-auto w-full max-w-lg  rounded-2xl p-5  bg-white/20`}>
        <div className="flex justify-center">
          <span className="inline-block w-full max-w-[5vw]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your acount
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-4">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 9,
                  message: "Password must be atleast 9 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <Button
              onClick={(e) => console.log("button clicked")}
              className="w-full text-white hover:bg-violet-800"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
