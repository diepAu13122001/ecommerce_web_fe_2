import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useParams } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();

  const [products, setProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/veggy-service/v1/product/list");
    setProducts(result.data);
  };

  // const deleteUser=async (id)=> {
  //     await axios.delete(`http://localhost:8080/user/${id}`)
  //     loadUsers();
  // }

  return (
    <>
      {
        products.data?.map((product, index) => (
          <div
            className={` ${location.pathname == "/product" ? `gr-${grid}` : "col-3"
              } `}
          >
            <Link
              to={`/product/${product.id}`}
              className="product-card position-relative"
            >
              {/* <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              {<img src={wish} alt="wishlist" />}
            </button>
          </div> */}
              <div className="product-image">
                <img src="https://znews-photo.zingcdn.me/w660/Uploaded/sgorvz/2016_07_21/rau_xanh_thai_doc_2_1.jpg" className="img-fluid" alt="product image" />
                <img src="https://sohanews.sohacdn.com/zoom/480_300/2017/photo1513653468810-1513653468810.jpg" className="img-fluid" alt="product image" />
              </div>
              <div className="product-details">
                {/* <h6 className="brand">Havels</h6> */}
                <h5 className="product-title">
                  {product.name}
                </h5>
                {/* <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            /> */}
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate non
                  provident, similique sunt...
                </p>
                <p className="price">{product.price}đ</p>
              </div>
              {/* <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div> */}
            </Link>
          </div>
        ))
      }
    </>
  );
};

export default ProductCard;
