import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/Auth";
import { login, logout } from "./features/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    authservice
      .isLogedin()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f2eb] text-[#171717]">
        <p className="text-xs uppercase tracking-[0.2em] text-black/40">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f5f2eb] text-[#171717]">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;