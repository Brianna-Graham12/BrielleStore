
/*
    BRIELLE SKINCARE WEBSITE

    File: verify-checkout-session.mjs
    Author: Brianna Graham

    Description:
    Verifies the customer's Stripe Checkout
    Session before displaying payment confirmation.

    Never exposes the Stripe secret key.
*/

import Stripe from "stripe";

const jsonHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
};

function jsonResponse(data, status = 200) {
    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: jsonHeaders
        }
    );
}

export default async function handler(request) {

    if (request.method !== "GET") {
        return jsonResponse(
            { error: "Method not allowed." },
            405
        );
    }

    const url = new URL(request.url);

    const sessionId = url.searchParams.get("session_id");

    if (
        !sessionId ||
        !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)
    ) {
        return jsonResponse(
            { error: "Invalid checkout session." },
            400
        );
    }

    try {

        const secretKey = Netlify.env.get(
            "STRIPE_SECRET_KEY"
        );

        if (!secretKey) {
            return jsonResponse(
                { error: "Stripe is not configured." },
                500
            );
        }

        const stripe = new Stripe(secretKey);

        // Ask Stripe directly for the payment status
        const session =
            await stripe.checkout.sessions.retrieve(sessionId);

        // Only return limited, non-sensitive information
        return jsonResponse({
            paid: session.payment_status === "paid",
            paymentStatus: session.payment_status,
            checkoutStatus: session.status
        });

    } catch (error) {

        console.error(
            "Brielle payment verification error:",
            error.type || error.name
        );

        return jsonResponse(
            { error: "Unable to verify payment." },
            500
        );
    }
}

export const config = {
    path: "/api/verify-checkout-session"
};
