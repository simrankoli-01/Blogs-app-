import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, EditProfile, Home, Login,  Profile,  Signup } from './components/index.js'
import AddPost from './components/Pages/AddPost.jsx'
import AllPost from './components/Pages/AllPost.jsx'
import EditPost from './components/Pages/EditPost.jsx'
import Post from './components/Pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            {""}
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            {""}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            {""}
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/Profile',
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: '/Edit-profile',
        element: (
          <AuthLayout authentication>
            <EditProfile />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <RouterProvider router={router} />
 </Provider>
);
