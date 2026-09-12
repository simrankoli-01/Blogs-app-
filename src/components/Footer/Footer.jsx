import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-[#171717] px-5 py-12 text-[#f5f2eb] md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="lg:col-span-2">
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
              A place for thoughtful stories, honest ideas and
              meaningful conversations.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Explore
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-white/70 hover:text-white">
                Home
              </Link>

              <Link
                to="/all-posts"
                className="text-sm text-white/70 hover:text-white"
              >
                Stories
              </Link>

              <Link
                to="/add-post"
                className="text-sm text-white/70 hover:text-white"
              >
                Write
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Account
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="text-sm text-white/70 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-sm text-white/70 hover:text-white"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/30 md:flex-row">
          <p>© 2026 Blog's</p>
          <p>Stories that stay with you.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;