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
    { name: "Home", slug: "/", active: true },
    { name: "Stories", slug: "/all-posts", active: authStatus },
    { name: "Write", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f5f2eb]/95 backdrop-blur-md">
        <Container>
          <nav className="flex h-20 items-center justify-between border-b border-black/10">
            
            <Link to="/" className="text-black">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map(
                (item) =>
                  item.active && (
                    <Link
                      key={item.name}
                      to={item.slug}
                      className="text-[12px] uppercase tracking-[0.18em] text-black/70 transition hover:text-black"
                    >
                      {item.name}
                    </Link>
                  )
              )}

              {authStatus && <LogoutBtn />}
            </div>

            <div className="md:hidden flex items-center gap-3">
              {!authStatus && (
                <Link
                  to="/signup"
                  className="rounded-full bg-black px-5 py-2 text-xs uppercase tracking-wider text-white"
                >
                  Join
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(true)}
                className="text-2xl text-black"
              >
                <HiBars3 />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-[#f5f2eb] text-black transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 p-6">
          <Logo />

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl"
          >
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col px-6 pt-8">
          {navItems.map(
            (item) =>
              item.active && (
                <Link
                  key={item.name}
                  to={item.slug}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-black/10 py-5 text-sm uppercase tracking-[0.15em]"
                >
                  {item.name}
                </Link>
              )
          )}

          {authStatus && (
            <div className="py-5">
              <LogoutBtn />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;