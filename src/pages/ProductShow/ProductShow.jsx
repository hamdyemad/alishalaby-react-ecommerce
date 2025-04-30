import React, { useEffect, useRef, useState } from "react";
import "./ProductShow.scss";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/product/default.jpg";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { getProductById } from "../../api/Product";
import { createOrder } from "../../api/Order";

import * as Yup from "yup";


// Toastr
import {toastrError, toastrSuccess} from '../../components/Toastr/Toastr'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useFormik } from "formik";

export default function ProductShow() {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let [count, setCounter] = useState(1);
  let [photos, setPhotos] = useState([]);
  let [selectedColors, setSelectedColors] = useState([]);
  let [selectedSizes, setSelectedSizes] = useState([]);
  let [activeBoxIndex, setActiveBoxIndex] = useState(0);
  let naviate = useNavigate();
  const ActiveImageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState('center center');




  const apiUrl = import.meta.env.VITE_API_URL;

  const validationSchema = Yup.object({
    name: Yup.string().required('الأسم مطلوب'),
    address: Yup.string().required('العنوان مطلوب'),
    phone: Yup.string().required('رقم الهاتف مطلوب'),
    notes: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      notes: '',
    },
    validationSchema,
    onSubmit: handleSubmit
  })


  function changeCounter(type = '+') {
    if(type == '+') {
      count++
    } else {
      if(count > 1) {
        count--
      }
    }
    setCounter(count)
  }

  // Function to handle color selection for each quantity
  function changeColor(colorIndex, quantityIndex) {
    let updatedColors = [...selectedColors];
    updatedColors[quantityIndex] = colorIndex;  // Store the color selection for the quantity
    setSelectedColors(updatedColors);
  }

  // Function to handle size selection for each quantity
  function changeSize(sizeIndex, quantityIndex) {
    let updatedSizes = [...selectedSizes];
    updatedSizes[quantityIndex] = sizeIndex;  // Store the size selection for the quantity
    setSelectedSizes(updatedSizes);
  }





  function changeBox(boxIndex, event) {
    setActiveBoxIndex(boxIndex)

    setSelectedColors(Array(product.prices[boxIndex].qty).fill(0))
    setSelectedSizes(Array(product.prices[boxIndex].qty).fill(0))

  }

  function handleMouseMove(e) {
    const { width, height, left, top } = e.target.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    // Calculate the scale based on mouse position
    const scaleValue = 1 + (Math.abs(offsetX - width / 2) + Math.abs(offsetY - height / 2)) / 500;

    // Set the scale value and transform origin to the mouse position
    setScale(scaleValue);
    setTransformOrigin(`${(offsetX / width) * 100}% ${(offsetY / height) * 100}%`);

  }

  useEffect(() => {

    getProductById(id)
      .then((data) => {
        console.log(data)
        if(data) {
          (data.photos) ? setPhotos(JSON.parse(data.photos)) : '';
          setProduct(data);
          setSelectedColors(Array(data.prices[activeBoxIndex].qty).fill(0))
          setSelectedSizes(Array(data.prices[activeBoxIndex].qty).fill(0))
        }

      })
      .catch((err) =>  {
        toastrError(err.message)
      });

  }, []);


  function changeImageView(e) {
    let clicked_img = e.target;
    ActiveImageRef.current.src = clicked_img.src;
  }


  function handleSubmit(values) {

    // Gather the order data
    const orderData = {
      ...values,
      product_id: product.id,
      price_id: product?.prices[activeBoxIndex].id
    };


    if(product.colors.length > 0) {
      orderData.colors =  selectedColors.map((index) => product.colors[index].id)
      orderData.sizes =  selectedSizes.map((index) => product.sizes[index].id)
    }

    
    createOrder(orderData).then((res) => {
      toastrSuccess(res.message)
      if(res.status) {
        formik.resetForm();
      } else {
        toastrError(res.message)
      }
    }).catch((err) => {
      toastrError(err.message)
    })
  }



  return (
    <>
      <div className="show_product">
        <BreadCrumb name={product?.name}/>
        <div className="row">
          <div className="col-md-8">
            <div className="images">
              <div className="active mb-3">
                {photos.length > 0 ? <img 
                ref={ActiveImageRef}
                 onMouseMove={handleMouseMove}
                  src={apiUrl + photos[0]}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.1s ease',
                    transform: `scale(${scale})`,
                    transformOrigin: transformOrigin,
                  }}
                   alt="active photo" /> : <img src={defaultImage} alt="active photo" />}
              </div>
              <div className="list d-flex align-items-center">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      navigation
                      modules={[Pagination, Navigation]}
                    >
                      
                  {photos.length > 0 ? photos.map((photo, index) => {
                    return  <SwiperSlide><div className="img"><img  onClick={changeImageView} key={index} src={apiUrl + photo} alt="" /></div></SwiperSlide>;
                  }) : ''}
                  
                </Swiper>
                
              </div>
              
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <h2>{product?.name}</h2>
              <div className="prices d-flex align-items-center">
                <h4 className="text-decoration-line-through old_price">{product?.price?.price} جنيه</h4>
                <h4 className="main_price">{product?.price?.price_after_discount} جنيه</h4>
              </div>
              <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
            </div>
            <hr />
            <h5>للطلب الرجاء ادخال التفاصيل</h5>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="prices">
                {product?.prices?.map((priceObj, boxIndex) => {
                  return <div className={`box ${(activeBoxIndex == boxIndex) ? 'active' : ''}`} id={`box-${boxIndex}`} onClick={(e) => changeBox(boxIndex, e)} key={boxIndex}>
                    <div className="header d-flex align-items-center justify-content-between">
                      <h6 className="text">{priceObj.description}</h6>
                      <div className="prices">
                        <h6 className="old_price text-decoration-line-through">{priceObj.price} جنيه</h6>
                        <h6 className="price">{priceObj.price_after_discount} جنيه</h6>
                      </div>
                    </div>
                    {(product?.colors.length > 0 || product?.sizes.length > 0) ? <div className={`card mt-3 ${(activeBoxIndex != boxIndex) ? 'd-none' : ''}`} onClick={(e) => e.stopPropagation()}>
                      <div className="card-header">
                        اللون, المقاس
                      </div>
                      <div className="card-body">
                        {[...Array(priceObj.qty)].map((val, qtyObjectIndex) => {
                          return <div className="object" id={`object-${qtyObjectIndex}`} key={qtyObjectIndex}>
                            #{qtyObjectIndex + 1}
                            {product?.colors.length > 0 ? <div className="colors d-flex align-items-center mb-2">
                              <h6>الالوان: </h6>
                              {product?.colors?.map((color, colorIndex) => {
                                return (
                                  <div
                                    key={colorIndex}
                                    className={`color ${
                                      selectedColors[qtyObjectIndex] === colorIndex ? 'active' : ''
                                      ||
                                      colorIndex == 0 && selectedColors[qtyObjectIndex] != colorIndex && isNaN(selectedColors[qtyObjectIndex]) ? 'active' : ''

                                    }`}  id={`color-${colorIndex}`} onClick={() => changeColor(colorIndex, qtyObjectIndex)}
                                    style={{ backgroundColor: color?.value }}
                                  ></div>
                                );
                              })}
                            </div> : ''}
                            
                            {product?.sizes.length > 0 ? <div className="sizes d-flex align-items-center mb-3">
                              <h6>المقاسات: </h6>
                              {product?.sizes?.map((size, sizeIndex ) => {
                                return (
                                  <div
                                    key={sizeIndex}
                                    
                                    className={`size ${
                                      selectedSizes[qtyObjectIndex] === sizeIndex ? 'active' : ''
                                      ||
                                      sizeIndex == 0 && selectedSizes[qtyObjectIndex] != sizeIndex && isNaN(selectedSizes[qtyObjectIndex]) ? 'active' : ''
                                    }`} id={`size-${sizeIndex}`}
                                    onClick={() => changeSize(sizeIndex, qtyObjectIndex)}
                                  >{size?.variant}</div>
                                );
                              })}
                            </div> : ''}
                            
                          </div>
                        })}
                      </div>
                    </div>: ''}
                    
                    
                  </div>
                })}
              </div>
              <div className="form-group mb-2">
                <input className="form-control" type="text" placeholder="الاسم"name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  />
                  {(formik.touched.name && formik.errors.name) ? <div className="text-danger">{formik.errors.name}</div> : ''}
              </div>
              <div className="form-group mb-2">
                <input className="form-control" type="text" placeholder="رقم الهاتف"name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  />
                  {(formik.touched.phone && formik.errors.phone) ? <div className="text-danger">{formik.errors.phone}</div> : ''}
              </div>
              <div className="form-group mb-2">
                <input className="form-control" type="text" placeholder="العنوان"name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  />
                  {(formik.touched.address && formik.errors.address) ? <div className="text-danger">{formik.errors.address}</div> : ''}
              </div>
              <div className="form-group">
                <textarea name="notes" className="form-control" placeholder="الملاحظات"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ></textarea>
                {(formik.touched.notes && formik.errors.notes) ? <div className="text-danger">{formik.errors.notes}</div> : ''}
              </div>
              <button type="submit" disabled={!formik.isValid || !formik.dirty} className="btn submit_form">أشترى الان الدفع بعد الاستلام</button>
            </form>


          </div>
        </div>
      </div>
    </>
  );
}
