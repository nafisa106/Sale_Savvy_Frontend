import React from "react";  //React creates UI
import ReactDOM from "react-dom/client"; //displays React content on the webpage.
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// main.jsx is the entry point of a React
//  application. It creates the React root, 
// connects React to the HTML element with 
// id root, and renders the main App component
//  into the browser.