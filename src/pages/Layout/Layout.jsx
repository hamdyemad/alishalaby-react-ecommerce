import React, { useEffect, useState } from 'react'
import './Layout.scss';
import Navbar from '../../components/Navbar/Navbar';
import Products from '../Products/Products';
import { Outlet } from 'react-router-dom';
import {getAllSettings} from '../../api/Setting';
import defaultLogo from '../../assets/default.png';

const apiUrl = import.meta.env.VITE_API_URL;


// Toastr
import { ToastContainer } from 'react-toastify';

export default function Layout() {

  const [logo, setLogo] = useState(defaultLogo);

  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    getAllSettings().then((res) => {
      if(res.status) {
        res.data.forEach((obj) => {
          if(obj.type == 'logo') {
            setLogo(apiUrl + obj.value)
            link.href = apiUrl + obj.value;
          } else if(obj.type == 'project_name') {
            document.title = obj.value; 
          }
        })
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }, []);

  return <>
    <Navbar logo={logo}/>
      <div className="container-fluid">
        <ToastContainer />
        <Outlet></Outlet>
    </div>
  </>
}
