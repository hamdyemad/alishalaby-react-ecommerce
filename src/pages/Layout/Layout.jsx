import React from 'react'
import './Layout.scss';
import Navbar from '../../components/Navbar/Navbar';
import Products from '../Products/Products';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return <>
    <Navbar/>
      <div className="container">
        <Outlet></Outlet>
        {/* <Products /> */}
    </div>
  </>
}
