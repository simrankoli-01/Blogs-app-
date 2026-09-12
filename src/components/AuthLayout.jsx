// Protector.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protector({
  children,
  authentication = true,
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus !== authentication) {
      navigate(authentication ? "/login" : "/", {
        replace: true,
      });
      return;
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-black">
        <p className="md:text-6xl sm:text-sm lg:text-9xl uppercase tracking-[0.2em] text-white/40">
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}