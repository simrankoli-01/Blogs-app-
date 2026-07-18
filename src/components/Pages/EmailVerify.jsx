import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authservice from "../../appwrite/Auth";

const EmailVerify = () => {
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("veryfying your email...");

  useEffect(() => {
    const verify = async () => {
      try {
        const userId = searchparams.get("userId");
        const secret = searchparams.get("secret");

        if (!userId || !secret) {
          setMessage("invalid verification link");
          return;
        }

        await authservice.verifyEmail(userId, secret);
        setMessage("✅ Email verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log("failed verification", error);
        setMessage("❌ verification failed");
      }
    };
    verify();
  }, [navigate, searchparams]);

  return;
  <div className="flex items-center justify-center min-h-screen">
    <h1 className="text-2xl font-semibold">{message}</h1>
  </div>;
};

export default EmailVerify;
