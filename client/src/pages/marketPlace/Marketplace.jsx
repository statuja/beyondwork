import React, { useState } from "react";
import "./MarketPlace.scss";
import doona1 from "./image/doona1.jpg";
import doona2 from "./image/doona2.jpg";
import doona3 from "./image/doona3.jpg";
import straller3 from "../marketPlace/image/straller3.png";
import straller4 from "./image/straller4.jpg";
import straller5 from "./image/straller5.jpg";
import chair1 from "./image/chair1.jpg";
import chair2 from "./image/chair2.jpg";
import chair3 from "./image/chair3.jpg";

function MarketPlace() {
  const products = [
    {
      id: 1,
      name: "Liki Trike",
      description:
        "The small fold trike is designed to encourage toddlers to explore and engage with the world around them with ease and confidence. With its 5 different modes of use, Liki will grow along with them from 10 to 36 months, as they form their independence and develop their motor skills.",
      condition: "Like new",
      price: 189.99,
      images: [doona1, doona2, doona3],
      category: "stroller",
    },
    {
      id: 2,
      name: "EEZY S TWIST",
      description:
        "With one hand the seat unit and integrated leg rest can be rotated 360°—from parent-facing to forward-facing and back again. The 3-in-1 Travel System gives parents multiple options for the journey ahead.",
      price: 100.0,
      condition: "used",
      images: [straller4, straller5, straller3],
      category: "stroller",
      // Add more details as needed
    },
    {
      id: 3,
      name: "Gray Dining Chairs",
      description:
        "With their striking profile, these Perth chairs are a perfect balance of form and function. Their sleek cantilevered legs and soft upholstery makes them both stylish and comfy. Pair them with a contemporary dining table to make a glamorous statement.",
      price: 34.0,
      condition: "good",
      images: [chair1, chair2, chair3],
      category: "Chairs",
    },
    // Add more products
  ];

  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="wrapper">
      <div className="products-container">
        <div className="product-card">
          <div className="product-images">
            <img src={product.images[currentImageIndex]} alt={product.name} />
            <span className="carousel-button" onClick={previousImage}>
              &lt; Prev
            </span>
            <span className="carousel-button" onClick={nextImage}>
              Next &gt;
            </span>
          </div>
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>
              <b>Category: </b>
              {product.category}
            </p>
            <p>
              <b>Description: </b>
              {product.description}
            </p>
            <p>
              <b>Product Condition: </b>
              {product.condition}
            </p>
            <p>
              <b>Price: </b>${product.price}
            </p>

            <button>Contact the seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPlace;
