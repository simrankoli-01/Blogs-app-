import React from "react";
import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center text-white shadow-xl">

        <div className="text-6xl mb-4">📧</div>

        <h1 className="text-3xl font-bold">
          Check your email
        </h1>

        <p className="mt-4 text-gray-300">
          We've sent a verification link to your email address.
        </p>

        <p className="mt-2 text-gray-400 text-sm">
          Please verify your account before logging in.
        </p>

        <Link
          to="/login"
          className="inline-block mt-8 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
};

export default CheckEmail;