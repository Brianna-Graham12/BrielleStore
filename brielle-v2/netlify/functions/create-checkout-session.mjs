
/*
    BRIELLE SKINCARE WEBSITE

    File: create-checkout-session.mjs
    Author: Brianna Graham

    Description:
    Creates secure Stripe Checkout Sessions.

    Prices are stored on the server so
    customers cannot change them in the browser.

    Supports all four Brielle products and
    the four signature fragrances.
*/

import Stripe from "stripe";


/*
    Brielle Product Catalog

    All prices are stored in cents.

    $25.00 = 2500
    $22.00 = 2200
    $15.00 = 1500
    $45.00 = 4500
*/

const products = {
    "body-creme": {
        name: "Body Crème",
        size: "8 oz",
        price: 2500
    },

    "body-lotion": {
        name: "Body Lotion",
        size: "8 oz",
        price: 2200
    },

    "hand-cream": {
        name: "Hand Cream",
        size: "3 oz",
        price: 1500
    },

    "sampler": {
        name: "Four-Tin Sampler",
        size: "4 tins",
        price: 4500
    }
};


// Brielle's available fragrances
const fragrances = [
    "Golden Vanilla",
    "Lavender Fields",
    "Midnight Ember",
    "Soft Bloom"
];


/*
    Checkout Session Function

    Receives the items selected on Brielle's
    website, validates them, and creates
    a Stripe-hosted payment session.
*/

export default async function handler(request) {

    // Only allow checkout requests using POST
    if (request.method !== "POST") {
        return Response.json(
            { error: "Method not allowed." },
            { status: 405 }
        );
    }

    // Read the private Stripe key from Netlify
    const stripeKey = Netlify.env.get("STRIPE_SECRET_KEY");

    if (!stripeKey) {
        return Response.json(
            { error: "Stripe API key is missing." },
            { status: 500 }
        );
    }

    try {

        const { items } = await request.json();

        // Validate the shopping bag
        if (
            !Array.isArray(items) ||
            items.length === 0 ||
            items.length > 20
        ) {
            return Response.json(
                { error: "Invalid shopping bag." },
                { status: 400 }
            );
        }


        /*
            Build Stripe Line Items

            Each item contains:
            productId
            scent
            quantity

            The server looks up the actual price.
        */

        const lineItems = items.map((item) => {

            const product = products[item.productId];

            if (!product) {
                throw new Error("Invalid product.");
            }

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 10
            ) {
                throw new Error("Invalid quantity.");
            }

            const isSampler = item.productId === "sampler";

            // Validate fragrance selection
            if (
                !isSampler &&
                !fragrances.includes(item.scent)
            ) {
                throw new Error("Invalid fragrance.");
            }

            const productName = isSampler
                ? product.name
                : `${item.scent} ${product.name}`;

            return {
                price_data: {
                    currency: "usd",

                    unit_amount: product.price,

                    product_data: {
                        name: productName,
                        description: product.size
                    }
                },

                quantity: item.quantity
            };

        });


        // Initialize Stripe with the private API key
        const stripe = new Stripe(stripeKey);

        // Use the website origin for return URLs
        const websiteUrl = new URL(request.url).origin;


        /*
            Create Stripe Checkout

            Customer enters payment details
            on Stripe's secure hosted page.

            Collect shipping addresses in the US.
        */

        const session = await stripe.checkout.sessions.create({

            mode: "payment",

            

            line_items: lineItems,

            billing_address_collection: "auto",

            shipping_address_collection: {
                allowed_countries: ["US"]
            },

            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",

                        fixed_amount: {
                            amount: 600,
                            currency: "usd"
                        },

                        display_name: "Standard Shipping"
                    }
                }
            ],

            // Enable after configuring Stripe Tax.
            // automatic_tax: { enabled: true },

            success_url:
                `${websiteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${websiteUrl}/shop`

        });


        // Return Stripe's payment page URL
        return Response.json({
            url: session.url
        });

    } catch (error) {

        console.error("Stripe checkout error:", error);

        const invalidInput = [
            "Invalid product.",
            "Invalid quantity.",
            "Invalid fragrance."
        ].includes(error.message);

        return Response.json(
            {
                error: invalidInput
                    ? error.message
                    : "Checkout could not be started."
            },
            {
                status: invalidInput ? 400 : 500
            }
        );
    }
}


/*
    Configure the API Route

    The React website can send requests to:
    /api/create-checkout-session
*/

export const config = {
    path: "/api/create-checkout-session"
};
