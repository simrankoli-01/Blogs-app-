// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { login as loginAction } from "../features/authSlice";
import authservice from "../appwrite/Auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

    try {
      const session = await authservice.login(data);

      if (session) {
        const userData = await authservice.isLogedin();

        if (userData) {
          dispatch(loginAction(userData));
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#f5f2eb] px-4 py-16 text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-8 flex justify-center">
            <Logo width="90px" />
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-black/40">
            Welcome back
          </p>

          <h1 className="font-serif text-4xl font-normal sm:text-5xl">
            Sign in
          </h1>

          <p className="mt-4 text-sm text-black/50">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-t border-black/10 pt-8"
        >
          <div className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Your password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 9,
                    message: "Password must be at least 9 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;