
/*
    BRIELLE SKINCARE WEBSITE

    File: OrderConfirmation.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's order confirmation page.

    Verifies payment status through the server
    and clears the shopping bag only after
    payment has been confirmed.
*/

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { useCart } from "../context/CartContext";

import "./OrderConfirmation.css";


function OrderConfirmation() {

    const [searchParams] = useSearchParams();

    const sessionId = searchParams.get("session_id");

    const { clearCart } = useCart();

    const [status, setStatus] = useState("loading");


    /*
        Verify the payment through the server.

        The success page URL alone does not
        prove that a payment was successful.
    */

    useEffect(() => {

        if (!sessionId) {
            return;
        }

        const controller = new AbortController();

        async function verifyPayment() {

            try {

                const response = await fetch(
                    "/api/verify-checkout-session?session_id=" +
                    encodeURIComponent(sessionId),
                    {
                        signal: controller.signal
                    }
                );

                if (!response.ok) {
                    throw new Error("Verification failed.");
                }

                const result = await response.json();

                if (controller.signal.aborted) {
                    return;
                }

                if (result.paid === true) {

                    // Clear bag only after verified payment
                    clearCart();

                    setStatus("paid");

                } else if (
                    result.paymentStatus === "unpaid" &&
                    result.checkoutStatus === "complete"
                ) {

                    setStatus("pending");

                } else {

                    setStatus("unconfirmed");

                }

            } catch (error) {

                if (error.name !== "AbortError") {
                    setStatus("error");
                }

            }

        }

        verifyPayment();

        return () => controller.abort();

    }, [sessionId, clearCart]);


    // Determine which message to display
    const currentStatus = sessionId
        ? status
        : "missing";


    return (

        <main className="confirmation-page">

            <div className="confirmation-container">

                {/* Brielle branding */}
                <Link
                    to="/"
                    className="confirmation-brand"
                >
                    BRIELLE
                </Link>

                <p className="confirmation-eyebrow">
                    YOUR BRIELLE EXPERIENCE
                </p>


                {/* Payment verification */}
                {currentStatus === "loading" && (
                    <>
                        <div className="confirmation-symbol">
                            ◌
                        </div>

                        <h1>Verifying Your Payment</h1>

                        <p className="confirmation-message">
                            We're checking your payment status
                            securely with Stripe.
                        </p>
                    </>
                )}


                {/* Successful payment */}
                {currentStatus === "paid" && (
                    <>
                        <div className="confirmation-symbol">
                            ✓
                        </div>

                        <h1>Thank You for Your Order</h1>

                        <p className="confirmation-subtitle">
                            Your Brielle ritual begins here.
                        </p>

                        <p className="confirmation-message">
                            Your payment has been confirmed.
                            Thank you for choosing Brielle.
                            We're delighted to be part of
                            your everyday skincare ritual.
                        </p>

                        <div className="confirmation-details">

                            <p className="confirmation-details-title">
                                WHAT HAPPENS NEXT
                            </p>

                            <p>
                                Your order will be prepared
                                for fulfillment after processing.
                            </p>

                            <p>
                                Check your email for any
                                payment receipt or order updates.
                            </p>

                        </div>
                    </>
                )}


                {/* Payment still processing */}
                {currentStatus === "pending" && (
                    <>
                        <div className="confirmation-symbol">
                            ◌
                        </div>

                        <h1>Your Payment Is Processing</h1>

                        <p className="confirmation-message">
                            Stripe has not confirmed your
                            payment yet. Please check your
                            payment status before trying
                            to purchase again.
                        </p>
                    </>
                )}


                {/* Payment unconfirmed */}
                {currentStatus === "unconfirmed" && (
                    <>
                        <div className="confirmation-symbol">
                            ?
                        </div>

                        <h1>Payment Not Confirmed</h1>

                        <p className="confirmation-message">
                            We couldn't confirm a completed
                            payment for this checkout.
                            Your shopping bag has been preserved.
                        </p>
                    </>
                )}


                {/* Payment verification error */}
                {currentStatus === "error" && (
                    <>
                        <div className="confirmation-symbol">
                            !
                        </div>

                        <h1>
                            We Couldn't Verify Your Payment
                        </h1>

                        <p className="confirmation-message">
                            Your payment status is currently
                            unavailable. Please check Stripe's
                            payment confirmation before
                            attempting another payment.
                        </p>
                    </>
                )}


                {/* No checkout session */}
                {currentStatus === "missing" && (
                    <>
                        <div className="confirmation-symbol">
                            ◌
                        </div>

                        <h1>No Checkout Session Found</h1>

                        <p className="confirmation-message">
                            Visit your shopping bag to begin
                            a secure checkout.
                        </p>
                    </>
                )}


                {/*
                    Navigation buttons

                    Flexbox gives the buttons their
                    own spacing and alignment.
                */}

                <div className="confirmation-actions">

                    <Link
                        to="/shop"
                        className="confirmation-primary"
                    >
                        CONTINUE SHOPPING
                    </Link>

                    <Link
                        to="/"
                        className="confirmation-secondary"
                    >
                        RETURN TO HOME
                    </Link>

                </div>


                {/* Closing message */}
                <p className="confirmation-footer-note">
                    Thoughtfully crafted body care
                    for your everyday ritual.
                </p>

            </div>

        </main>
    );
}

export default OrderConfirmation;
