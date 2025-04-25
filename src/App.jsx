import React, { useEffect, useState } from 'react'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

import './App.scss';

// JS
import 'bootstrap/dist/js/bootstrap.min.js';


import Loader from './components/Loader/Loader';
import Notfound from './components/Notfound/Notfound';
import Products from './pages/Products/Products';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import ProductShow from './pages/ProductShow/ProductShow';





const routers = createBrowserRouter([
  {path: '', element: <Layout/>, children: [
    {index: true, element: <Products/>},
    {path: '/products/:id', element: <ProductShow/>},
    {path: '*', element: <Notfound/>}
  ]}
]);




export default function App() {

  return <RouterProvider router={routers}></RouterProvider>
}
