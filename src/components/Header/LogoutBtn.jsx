import React from "react";
import { logout } from "../../features/authSlice";
import authservice from "../../appwrite/Auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authservice.logout();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="text-[12px] uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;