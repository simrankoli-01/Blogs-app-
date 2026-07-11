import React from 'react'
import {Logo, LogoutBtn, Container}  from '../index'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
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
  ]

  return (
   <header className='sticky z-50 top-0 w-full py-3 shadow bg-white/10 text-white'>
    <Container>
      <nav className='flex items-center justify-between'>
        <div className='md:mr-0 mr-4'>
          <Link to='/'>
          <Logo />
          </Link>
        </div>

        <ul className='flex gap-1 items-center'>
          {navItems.map((items) => 
          items.active ? (
            <li key={items.name}>
              <button className='inline-block md:px-4 px-1 md:text-sm text-xs py-1 duration-200 hover:outline-1 rounded-full' onClick={() => navigate(items.slug)}>{items.name}</button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </Container>
   </header>
  )
}

export default Header
