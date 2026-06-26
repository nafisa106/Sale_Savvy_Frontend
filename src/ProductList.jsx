import React from 'react';
import './assets/styles.css';

export function ProductList({ products, onAddToCart }) {

  console.log("First Product:", products[0]);

  if (products.length === 0) {
    return <p className="no-products">No products available.</p>;
  }

  return (
    <div className="product-list">
      <div className="product-grid">

        {products.map((product) => (

          <div key={product.product_id} className="product-card">

            {product.discountPercentage > 0 && (
              <div className="discount-badge">
                {product.discountPercentage}% OFF
              </div>
            )}

            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
              }}
            />

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>

              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product.product_id)}
              >
                Add to Cart
              </button>
            </div>

          </div>

        ))}

      </div>
    </div>
  );
}