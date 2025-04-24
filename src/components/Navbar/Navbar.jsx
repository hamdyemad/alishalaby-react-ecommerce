import React from 'react'
import './Navbar.scss';
import logo from '../../assets/logo.jpeg';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                to='/'
              >المنتجات</NavLink>
                {/* <a className="nav-link" aria-current="page" href="#">Products</a> */}
              </li>
              <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                to='/about'
              >معلومات عنا</NavLink>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
