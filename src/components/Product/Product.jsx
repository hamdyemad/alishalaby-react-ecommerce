import React from "react";
import "./Product.scss";
import p1 from "../../assets/product/1.png";
import heart from "../../assets/product/heart.png";
import eye from "../../assets/product/eye.png";
import emptyStar from "../../assets/product/stars/empty.png";
import fullStar from "../../assets/product/stars/full.png";
import { Link } from "react-router-dom";

export default function Product(props) {
  const apiUrl = import.meta.env.VITE_API_URL;

  let product = props.product,
    images = JSON.parse(product.photos),
    productImage = null;

  if (images && images.length > 0) {
    productImage = images[0];
    productImage = apiUrl + productImage;
  }
  return (
    <>
      <div className="product">
        <Link to={`products/` + product.id}>
          <div className="info">
            {product.price.discount ? <div className="discount">{product.price.discount}جنيه</div> : ''}
            

            <img
              className="product-image"
              src={productImage ? productImage : p1}
              alt="product image"
            />
            <div className="icons">
              <div className="icon">
                <img src={heart} alt="" />
              </div>
              <div className="icon">
                <img src={eye} alt="" />
              </div>
            </div>
          </div>
          <div className="content">
            <h6>{product?.name}</h6>
            <div className="prices">
              <span className="main-price">
                {product.price.price_after_discount} جنيه
              </span>
              <span className="discount-price">{product.price.price} جنيه</span>
            </div>
            <div className="rates d-flex">
              <div className="rates-stars d-flex align-items-center">
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
                <img src={emptyStar} alt="" />
              </div>
              <span className="rates-text">(88)</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
