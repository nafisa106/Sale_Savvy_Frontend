import React, { useEffect, useState } from "react";
import "./assets/styles.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://sale-savvy.onrender.com/api/orders/myorders",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order.orderId}>

          <div className="order-header">
            <div>
              <h3>Order ID</h3>
              <p>{order.orderId}</p>
            </div>

            <div>
              <h3>Status</h3>
              <p className="success-status">{order.status}</p>
            </div>
          </div>

          <div className="order-details">
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Ordered On:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;