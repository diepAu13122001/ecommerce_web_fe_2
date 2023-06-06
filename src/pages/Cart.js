import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCart] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    loadCart();
  }, []);

  let products =cartItems.data?.products;
  // console.log(products)
  const loadCart = async () => {
      const result = await axios.get("http://localhost:8080/veggy-service/v1/cart/get/14");
      setCart(result.data);
  };

  const deleteItem=async (productId)=> {
      await axios.delete(`http://localhost:8080/veggy-service/v1/cart/deleteProduct/14/${productId}`)
      loadCart();
  }

  const checkout = async () => {
    await axios.create();
    loadCart();
  }

  let total = 0;

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            { products?.map((product) => (
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className="w-25">
                  <img src="https://vinmec-prod.s3.amazonaws.com/images/20210606_012933_045889_cu-hanh-tim-co-tac-.max-1800x1800.jpg" className="img-fluid" alt="product image" />
                </div>
                <div className="w-75">
                  <p>{product.name}</p>
                  {/* <p>: hgf</p>
                  <p>Color: gfd</p> */}
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">{product.price}đ</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                  {cartItems.data?.productAmount}
                </div>
                {/* <div>
                  <AiFillDelete className="text-danger " />
                </div> */}
              </div>
              <div className="cart-col-4">
                <h5 className="price">{product.price*cartItems.data?.productAmount}đ</h5>
                {total += product.price*cartItems.data?.productAmount}
              </div>
            </div>
            ))
              }
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: {total}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
