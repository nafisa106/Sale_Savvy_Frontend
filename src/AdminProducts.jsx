import React, { useEffect, useState } from "react";

import "./assets/AdminProducts.css";


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetch("https://sale-savvy.onrender.com/admin/products", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
            console.log("Products API Response:", data);
        setProducts(data);
        })
      .catch((error) => console.error(error));
  }, []);

     const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      "https://sale-savvy.onrender.com/admin/products/delete",
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      }
    );

    if (response.ok) {
      alert("Product deleted successfully");

      setProducts(
        products.filter(
          (product) => product.productId !== productId
        )
      );
    } else {
      alert("Delete failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};


const addProduct = async () => {
  try {
    const response = await fetch(
      "https://sale-savvy.onrender.com/admin/products/add",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          categoryId: Number(categoryId),
          imageUrl,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Product Added Successfully");

      setProducts([...products, data]);

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setImageUrl("");
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};




const editProduct = (product) => {
  setEditingProductId(product.productId);

  setName(product.name);
  setDescription(product.description);
  setPrice(product.price);
  setStock(product.stock);
  setCategoryId(product.category.categoryId);
};



// ----Update the existing product

const updateProduct = async () => {
  try {
    const response = await fetch(
      "https://sale-savvy.onrender.com/admin/products/update",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: editingProductId,
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          categoryId: Number(categoryId),
        }),
      }
    );

    const updatedProduct = await response.json();

    if (response.ok) {
      alert("Product Updated Successfully");

      setProducts(
        products.map((product) =>
          product.productId === editingProductId
            ? updatedProduct
            : product
        )
      );

      setEditingProductId(null);

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setImageUrl("");
    }
  } catch (error) {
    console.error(error);
  }
};


return (
  <div className="products-container">

    <h1 className="products-title">
      Product Management
    </h1>

    <button
      className="back-btn"
      onClick={() => window.location.href="/admin-dashboard"}
    >
      Back to Dashboard
    </button>

    <div className="content-layout">

      {/* Left Side Form */}

      <div className="form-section">

        <h2 className="section-title">
          {editingProductId ? "Update Product" : "Add Product"}
        </h2>

        <div className="product-form">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            type="number"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button
            onClick={
              editingProductId
                ? updateProduct
                : addProduct
            }
          >
            {editingProductId
              ? "Update Product"
              : "Add Product"}
          </button>

        </div>

      </div>

      {/* Right Side Table */}

      <div className="table-section">

        <table className="products-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.productId}>

                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.category.categoryName}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>

                <td>
                  <button
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteProduct(product.productId)
                    }
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>
);

}

export default AdminProducts;