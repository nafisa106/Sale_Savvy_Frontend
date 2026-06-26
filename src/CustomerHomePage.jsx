import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./assets/styles.css";

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");

  // Load products once
  useEffect(() => {
    fetchProducts();
  }, []);

  // Load cart count whenever username is available
  useEffect(() => {
    if (username !== "") {
      fetchCartCount();
    }
  }, [username]);

  // Fetch products
  const fetchProducts = async (category = "") => {
    try {
      const response = await fetch(
        `https://sale-savvy.onrender.com/api/products${
          category ? `?category=${category}` : ""
        }`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log(data);
      console.log(data.user);

      if (data) {
        // DON'T use Guest
        if (data.user?.name) {
          setUsername(data.user.name);
        }

        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const response = await fetch(
        `https://sale-savvy.onrender.com/api/cart/items/count?username=${username}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const count = await response.json();
        setCartCount(count);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Category click
  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  // Add to cart
  const handleAddToCart = async (productId) => {
    console.log("Add To Cart clicked", productId);
    console.log("USERNAME =", username);

    try {
      const response = await fetch(
        "https://sale-savvy.onrender.com/api/cart/add",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            productId,
          }),
        }
      );

      if (response.ok) {
        fetchCartCount(); // update cart icon immediately
      } else {
        console.log(await response.text());
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="customer-homepage">
      <Header cartCount={cartCount} username={username} />

      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>

      <main className="main-content">
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />
    </div>
  );
}