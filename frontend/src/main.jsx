import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Pizza from './pages/Pizza' 
import Sides from './pages/Sides' 
import Beverages from './pages/Beverages' 
import Burger from './pages/Burger'

import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sesion', element: <Login /> }, 
      { path: 'register', element: <Register /> },
      { path: 'menu', element: <Menu /> },
      { path: 'pizza', element: <Pizza /> },
      { path: 'sides', element: <Sides /> },
      { path: 'beverages', element: <Beverages /> },
      { path: 'burger', element: <Burger /> },
      // -----------------------------
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)