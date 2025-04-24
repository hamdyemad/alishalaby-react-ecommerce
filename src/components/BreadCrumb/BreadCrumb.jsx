import React from 'react'
import './BreadCrumb.scss';
import { Link } from 'react-router-dom';

export default function BreadCrumb(props) {
  let {name} = props;
  return <>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <Link className="breadcrumb-item" to="/">
          المنتجات
        </Link>
        <li className="breadcrumb-item active" aria-current="page">
          {name}
        </li>
      </ol>
    </nav>
  </>
}
