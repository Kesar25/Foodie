import React, { useState, useRef, useEffect } from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
  let navigate = useNavigate();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();

  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    console.log(data)
  };

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div className="card-custom mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
      <img src={props.ImgSrc} className="card-custom-img-top" alt={props.foodName} />
      <div className="card-custom-body">
        <h5 className="card-custom-title">{props.foodName}</h5>
        <div className="card-custom-container w-100 p-0">
          <select
            className="card-custom-select m-2 h-100 w-20 bg-dark text-white rounded"
            onClick={handleClick}
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            className="card-custom-select m-2 h-100 w-20 bg-dark text-white rounded"
            ref={priceRef}
            onClick={handleClick}
            onChange={handleOptions}
          >
            {priceOptions.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <div className="card-custom-price d-inline ms-2 h-100 w-20 fs-5">
            ₹{finalPrice}/-
          </div>
        </div>
        <hr />
        <button
          className="card-custom-button btn btn-dark justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
