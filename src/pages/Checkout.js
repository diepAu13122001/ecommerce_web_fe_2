import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Checkout = () => {

  const [cartItems, setCart] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCart();
  }, []);

  let products = cartItems.data?.products;
  // console.log(products)
  const loadCart = async () => {
    const result = await axios.get("http://localhost:8080/veggy-service/v1/cart/get/14");
    setCart(result.data);
  };
  let navigate = useNavigate()
  const [order, setOrder] = useState({
    orderStatus: "Da dat hang",
    paymentMethodId: 0,
    addressId: 0,
    isDelivered: false
  })

  const { orderStatus,
    paymentMethodId,
    addressId,
    isDelivered } = order

  const onInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/veggy-service/v1/order/create", order)
    navigate("/");
  }

  let total = 0;


  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Daily delicious food</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              {/* <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
              Ngoc Diep Ne (makyky@gmail.com)
              </p> */}
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Viet Nam
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Note..."
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Phường/ Xã
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Quận/ Huyện
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    disabled
                    placeholder="TP.HCM"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/" className="button" onClick={onSubmit}>
                      Order
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">

            {products?.map((product) => (
              <div className="border-bottom py-4">
                <div className="d-flex gap-10 mb-2 align-align-items-center">
                  <div className="w-75 d-flex gap-10">
                    <div className="w-25 position-relative">
                      <span
                        style={{ top: "-10px", right: "2px" }}
                        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                      >
                        {cartItems.data?.productAmount}
                      </span>
                      <img className="img-fluid" src="https://vinmec-prod.s3.amazonaws.com/images/20210606_012933_045889_cu-hanh-tim-co-tac-.max-1800x1800.jpg" alt="product" />
                    </div>
                    <div>
                      <h5 className="total-price">{product.name}</h5>
                      <p className="total-price">{product.price}đ</p>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="total">{product.price * cartItems.data?.productAmount}đ</h5>
                    {total += product.price * cartItems.data?.productAmount}
                  </div>
                </div>
              </div>

            ))
            }
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">{total}đ</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">30000đ</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">{total + 30000}đ</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
