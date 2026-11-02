
/*
    BRIELLE SKINCARE WEBSITE

    File: ShoppingBag.jsx
    Author: Brianna Graham

    Description:
    Displays the customer's shopping bag.

    Supports quantity changes, removing items,
    and purchasing multiple products with Stripe.
*/

import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

import "./ShoppingBag.css";


function ShoppingBag() {

    const {
        cart,
        cartCount,
        subtotal,
        updateQuantity,
        removeFromCart
    } = useCart();

    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");


    /*
        Checkout the entire bag.

        Product prices are calculated again
        by the server, not trusted from the browser.
    */

    async function handleCheckout() {

        if (checkoutLoading || cart.length === 0) {
            return;
        }

        setCheckoutLoading(true);
        setCheckoutError("");

        try {

            const items = cart.map((item) => ({
                productId: item.productId,
                scent: item.scent,
                quantity: item.quantity
            }));

            const response = await fetch(
                "/api/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ items })
                }
            );

            const responseText = await response.text();

            if (!responseText.trim()) {
                throw new Error(
                    `Checkout server returned an empty response (${response.status}).`
                );
            }

            let data;

            try {
                data = JSON.parse(responseText);
            } catch {
                throw new Error(
                    `Checkout server returned invalid JSON (${response.status}).`
                );
            }

            if (!response.ok || !data?.url) {
                throw new Error(
                    data?.error ||
                    `Checkout could not be started (${response.status}).`
                );
            }

            window.location.assign(data.url);

        } catch (error) {

            console.error("Brielle checkout error:", error);

            setCheckoutError(
                error.message || "Unable to open checkout."
            );

            setCheckoutLoading(false);
        }
    }


    return (
        <main className="bag-page">

            <div className="bag-container">

                <p className="bag-eyebrow">
                    THE BRIELLE COLLECTION
                </p>

                <h1>Your Shopping Bag</h1>

                <p className="bag-intro">
                    Your selected essentials, thoughtfully
                    made for your everyday ritual.
                </p>


                {cart.length === 0 ? (

                    <div className="bag-empty">

                        <h2>Your bag is empty</h2>

                        <p>
                            Discover your next skincare favorite.
                        </p>

                        <Link
                            to="/shop"
                            className="bag-checkout-button"
                        >
                            EXPLORE THE COLLECTION
                        </Link>

                    </div>

                ) : (

                    <div className="bag-layout">

                        {/* Products selected by the customer */}
                        <div className="bag-items">

                            {cart.map((item) => (

                                <article
                                    className="bag-item"
                                    key={item.key}
                                >

                                    <div className="bag-product-image">
                                        <span>BRIELLE</span>
                                    </div>

                                    <div className="bag-product-information">

                                        <h2>{item.name}</h2>

                                        <p>{item.size}</p>

                                        <p>
                                            {item.scent || "All Four Scents"}
                                        </p>

                                        <strong>
                                            ${(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </strong>

                                        <div className="bag-item-actions">

                                            <div className="bag-quantity">

                                                <button
                                                    type="button"
                                                    aria-label="Decrease quantity"
                                                    disabled={item.quantity <= 1}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.key,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label="Increase quantity"
                                                    disabled={item.quantity >= 10}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.key,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                type="button"
                                                className="bag-remove"
                                                onClick={() =>
                                                    removeFromCart(item.key)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                            <Link
                                to="/shop"
                                className="bag-continue"
                            >
                                ← Continue Shopping
                            </Link>

                        </div>


                        {/* Order summary */}
                        <aside className="bag-summary">

                            <h2>Order Summary</h2>

                            <div className="bag-summary-line">
                                <span>Items</span>
                                <span>{cartCount}</span>
                            </div>

                            <div className="bag-summary-line bag-total">
                                <span>Subtotal</span>
                                <strong>
                                    ${subtotal.toFixed(2)}
                                </strong>
                            </div>

                            <p className="bag-shipping-note">
                                Shipping and applicable tax
                                are calculated at checkout.
                            </p>

                            <button
                                type="button"
                                className="bag-checkout-button"
                                onClick={handleCheckout}
                                disabled={checkoutLoading}
                            >
                                {checkoutLoading
                                    ? "OPENING CHECKOUT..."
                                    : "CHECKOUT SECURELY"}
                            </button>

                            {checkoutError && (
                                <p className="bag-error" role="alert">
                                    {checkoutError}
                                </p>
                            )}

                            <p className="bag-secure-note">
                                Secure checkout powered by Stripe.
                            </p>

                        </aside>

                    </div>

                )}

            </div>

        </main>
    );
}

export default ShoppingBag;
