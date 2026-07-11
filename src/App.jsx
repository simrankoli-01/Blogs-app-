import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/Auth";
import { login, logout } from "./features/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Video from "./components/Video";

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
  }, []);

  return !loading ? (
    <div className="relative flex  flex-col min-h-screen">
      {isHome ? (
        <div className="fixed inset-0 -z-10">
          <Video />
        </div>
      ) : (
        <div className="fixed inset-0 -z-10 bg-linear-to-br from-[#1d187e] via-[#6720a9] to-[#54082e]" />
      )}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : (
    <div className='text-center text-2xl mt-20'>Loading.....</div>
  );
}

export default App;
