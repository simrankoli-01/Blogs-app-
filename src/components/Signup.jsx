import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import authservice from "../appwrite/Auth";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");

    try {
      const user = await authservice.createAccount(data);

      if (user) {
        navigate("/check-email");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] px-4  md:py-2 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2">
        <div className="mb-6 text-center">
          <div className="mb-2 flex justify-center">
            <Logo width="90px" />
          </div>

          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/40">
            Join the journal
          </p>

          <h1 className="font-serif text-white text-4xl font-normal sm:text-5xl">
            Create account
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(signup)}
          className="pt-8"
        >
          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              {...register("name", {
                required: true,
              })}
            />

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

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 9,
                  message: "Password must be at least 9 characters",
                },
              })}
            />

            <Button type="submit" className="w-full rounded-2xl bg-white text-black">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;