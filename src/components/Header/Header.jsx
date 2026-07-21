import React, { useState } from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];

  const handleNavigate = (slug) => {
    navigate(slug);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= Header ================= */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-md">
        <Container>
          <nav className="flex items-center justify-between py-3">

            {/* Logo */}
            <Link to="/">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-3 text-white">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-4 py-2 rounded-full hover:bg-white/20 transition"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}

              {authStatus && <LogoutBtn />}
            </ul>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-3">

              {!authStatus && (
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-full bg-pink-500 text-white"
                >
                  Signup
                </button>
              )}

              <button
                onClick={() => setMenuOpen(true)}
                className="text-white text-3xl"
              >
                <HiBars3 />
              </button>
            </div>
          </nav>
        </Container>
      </header>
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300
        ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black/30 text-white z-50
        transform transition-transform duration-300
        ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-bold">Menu</h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl"
          >
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col mt-5">

          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.slug)}
                  className="text-left px-6 py-4 hover:bg-white/10 transition"
                >
                  {item.name}
                </button>
              )
          )}

          {authStatus && (
            <div className="px-6 py-4">
              <LogoutBtn />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;