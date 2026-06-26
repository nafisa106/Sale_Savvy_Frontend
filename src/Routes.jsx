import AdminDashboard from "./AdminDashboard";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./CartPage";
import Orders from "./Orders";
import AdminProducts from "./AdminProducts";


const AppRoutes = () => {
  return (
  <Routes>
  <Route path="/" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/customerhome" element={<CustomerHomePage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path="/admin-products" element={<AdminProducts />} />
</Routes>
  );
};

export default AppRoutes;
