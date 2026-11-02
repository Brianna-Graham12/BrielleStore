
/*
    BRIELLE SKINCARE WEBSITE

    File: main.jsx
    Author: Brianna Graham

    Description:
    Starts the React website.

    BrowserRouter manages page navigation.
    CartProvider shares the shopping bag.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <CartProvider>
                <App />
            </CartProvider>
        </BrowserRouter>
    </React.StrictMode>
);
