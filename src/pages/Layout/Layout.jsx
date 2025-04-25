import React from 'react'
import './Layout.scss';
import Navbar from '../../components/Navbar/Navbar';
import Products from '../Products/Products';
import { Outlet } from 'react-router-dom';


// Toastr
import { ToastContainer } from 'react-toastify';


export default function Layout() {
  return <>
    <Navbar/>
      <div className="container">
        <ToastContainer />
        <Outlet></Outlet>
    </div>
  </>
}
