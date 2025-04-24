import React, { useState, useEffect } from 'react'
import './Products.scss';
import axios from 'axios';

import Product from '../../components/Product/Product';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';

import {getAllProducts} from '../../api/Product';



export default function Products() {

    let [loading, setLoading] = useState(true);
    let [per_page, setPerPage] = useState(8);
    let [products, setProducts] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [lastPage, setlastPage] = useState(1);
    let [totalPages, setTotalPages] = useState(1);
  
  
    const apiUrl = import.meta.env.VITE_API_URL;
  
  
    const getPages = () => {
      const pages = [];
      if (lastPage <= 10) {
        for (let i = 1; i <= lastPage; i++) pages.push(i);
      } else {
        pages.push(1);
  
        if (currentPage > 4) pages.push('...');
  
        const start = Math.max(2, currentPage - 2);
        const end = Math.min(lastPage - 1, currentPage + 2);
        for (let i = start; i <= end; i++) pages.push(i);
  
        if (currentPage < lastPage - 3) pages.push('...');
        pages.push(lastPage);
      }
      return pages;
    };
  
  
    function onPageChange(page) {
      setLoading(true);
      setCurrentPage(page)
    }
    
  
    useEffect(() => {
      getAllProducts(per_page, currentPage).then((data) => {
        setProducts(data.data)
        setTotalPages(data.total)
        setlastPage(data.last_page)
        setCurrentPage(data.current_page)
        setLoading(false);

      }).catch((err) => {
        console.log(err)
      })
    }, [lastPage, currentPage])

  

  return (
    <>
      <div className="products">
        <h3>المنتجات</h3>

        {(loading == true) ? <Loader/> : <div className="row justify-content-center">
          {products.map((product, index) => (
            <div className="col-md-3" key={product.id}>
              <Product product={product}/>
            </div>
          ))}

          <Pagination currentPage={currentPage} lastPage={lastPage} getPages={getPages} onPageChange={onPageChange} />
        
        </div>}
        
      </div>
    </>
  )
}
