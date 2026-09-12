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
    <div className="min-h-[80vh] bg-[#f5f2eb] px-4 py-16 text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-8 flex justify-center">
            <Logo width="90px" />
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-black/40">
            Join the journal
          </p>

          <h1 className="font-serif text-4xl font-normal sm:text-5xl">
            Create account
          </h1>

          <p className="mt-4 text-sm text-black/50">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black underline underline-offset-4"
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
          className="border-t border-black/10 pt-8"
        >
          <div className="space-y-6">
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

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;