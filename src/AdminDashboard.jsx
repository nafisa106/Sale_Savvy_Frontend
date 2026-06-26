import React, { useEffect, useState } from "react";
import "./assets/AdminDashboard.css";
function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

const [dailyRevenue, setDailyRevenue] = useState(0);
const [monthlyRevenue, setMonthlyRevenue] = useState(0);
const [yearlyRevenue, setYearlyRevenue] = useState(0);

const [orders, setOrders] = useState([]);

const [filter, setFilter] = useState("all");

useEffect(() => {
  fetch("http://localhost:8080/admin/products/count", {
    credentials: "include",
  })
    .then((response) => {
      console.log("Status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data);
      setProductCount(data);
    })
    .catch((error) => console.error("Error:", error));
}, []);




useEffect(() => {
  fetch("http://localhost:8080/admin/products/users/count", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setUserCount(data))
    .catch((error) => console.error(error));
}, []);



useEffect(() => {
  fetch("http://localhost:8080/admin/products/orders/count", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setOrderCount(data))
    .catch((error) => console.error(error));
}, []);



useEffect(() => {
  fetch("http://localhost:8080/admin/products/revenue", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setTotalRevenue(data))
    .catch((error) => console.error(error));
}, []);



// -------Daily evenue----------
useEffect(() => {
  fetch("http://localhost:8080/admin/products/revenue/daily", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setDailyRevenue(data))
    .catch((error) => console.error(error));
}, []);



// -------Montly Revenue----------
useEffect(() => {
  fetch("http://localhost:8080/admin/products/revenue/monthly", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setMonthlyRevenue(data))
    .catch((error) => console.error(error));
}, []);






// -------Yearky Revenue----------

useEffect(() => {
  fetch("http://localhost:8080/admin/products/revenue/yearly", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setYearlyRevenue(data))
    .catch((error) => console.error(error));
}, []);



// ------------orders status------------------
useEffect(() => {
  fetch("http://localhost:8080/admin/orders", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setOrders(data))
    .catch((error) => console.error(error));
}, []);




const filteredOrders =
  filter === "all"
    ? orders
    : orders.filter(
        (order) =>
          order.status ===
          filter.toUpperCase()
      );


const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(
      "http://localhost:8080/admin/orders/status",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          status: status,
        }),
      }
    );

    if (response.ok) {
        alert("Order status updated successfully");

  const updatedOrders = orders.map((order) =>
    order.orderId === orderId
      ? { ...order, status: status }
      : order
  );

  setOrders(updatedOrders);
    } else {
      alert("Failed to update order status");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};




const logout = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error(error);
  }
};




 return (
  <div className="dashboard-container">

    <h1 className="dashboard-title">
      Admin Dashboard
    </h1>

<button
  className="logout-btn"
  onClick={logout}
>
  Logout
</button>

<button
  className="manage-products-btn"
  onClick={() => window.location.href="/admin-products"}
>
  Manage Products
</button>

    <div className="cards-container">

      <div className="card">
        <h2>Total Products</h2>
        <p>{productCount}</p>
      </div>

      <div className="card">
        <h2>Total Users</h2>
        <p>{userCount}</p>
      </div>

      <div className="card">
        <h2>Total Orders</h2>
        <p>{orderCount}</p>
      </div>

      <div className="card">
        <h2>Total Revenue</h2>
        <p>₹{totalRevenue}</p>
      </div>
</div>


 <div className="cards-container">
    <div className="card">
    <h2>Daily Revenue</h2>
    <p>₹{dailyRevenue}</p>
  </div>

  <div className="card">
    <h2>Monthly Revenue</h2>
    <p>₹{monthlyRevenue}</p>
  </div>

  <div className="card">
    <h2>Yearly Revenue</h2>
    <p>₹{yearlyRevenue}</p>
  </div>
</div>
  



<div className="filter-buttons">
  <button onClick={() => setFilter("all")}>
    All Orders
  </button>

  <button onClick={() => setFilter("pending")}>
    Pending Orders
  </button>

  <button onClick={() => setFilter("success")}>
    Successful Orders
  </button>
</div>


  <h2 className="table-title">
  {filter === "all"
    ? "All Orders"
    : filter === "pending"
    ? "Pending Orders"
    : "Successful Orders"}
</h2>

<table className="orders-table">
  <thead>
    <tr>
      
      <th>Order ID</th>
      <th>User ID</th>
      <th>Status</th>
      <th>Total Amount</th>
      <th>Created At</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {filteredOrders.map((order) => (

      <tr key={order.orderId}>
        <td>{order.orderId}</td>
        <td>{order.userId}</td>


        <td
          style={{
              color: order.status === "SUCCESS" ? "green" : "orange",
              fontWeight: "bold",
          }}
>
    {order.status}
        </td>


        <td>₹{order.totalAmount}</td>
        <td>{order.createdAt}</td>



    <td>
  {order.status === "PENDING" ? (
    <button
      onClick={() =>
        updateOrderStatus(order.orderId, "SUCCESS")
      }
    >
      Mark Success
    </button>
  ) : (
    <span
      style={{
        color: "green",
        fontWeight: "bold",
      }}
    >
      Completed
    </span>
  )}
</td>


      </tr>
    ))}
  </tbody>
</table>


    
  </div>
);
}

export default AdminDashboard;