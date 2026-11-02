
/*
    BRIELLE SKINCARE WEBSITE

    File: stripe-webhook.mjs
    Author: Brianna Graham

    Description:
    Verifies Stripe payment notifications.

    Saves paid customer orders in Netlify Blobs
    and sends order notifications through Resend.

    Uses the Stripe Checkout Session ID
    to reduce duplicate order processing.
*/

import Stripe from "stripe";
import { getStore } from "@netlify/blobs";


function jsonResponse(data, status = 200) {

    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        }
    });
}


// Convert amounts in cents to formatted currency
function formatMoney(amount, currency = "usd") {

    if (typeof amount !== "number") {
        return "Not available";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase()
    }).format(amount / 100);
}


// Make text safe to include inside email HTML
function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}


// Format Stripe's shipping address for the email
function formatAddress(address) {

    if (!address) {
        return "No shipping address provided";
    }

    return [
        address.line1,
        address.line2,
        [
            address.city,
            address.state,
            address.postal_code
        ].filter(Boolean).join(", "),
        address.country
    ].filter(Boolean).join("\n");
}


/*
    Save a paid order using the Checkout Session ID.

    The existing order is not overwritten
    when Stripe sends a repeated webhook.
*/

async function savePaidOrder(stripe, sessionId) {

    const session =
        await stripe.checkout.sessions.retrieve(sessionId);

    const isPaid =
        session.mode === "payment" &&
        session.status === "complete" &&
        session.payment_status === "paid";

    if (!isPaid) {

        console.log(
            "Brielle payment not yet confirmed:",
            sessionId
        );

        return null;
    }

    const storeName = session.livemode
        ? "brielle-orders-live"
        : "brielle-orders-test";

    const orders = getStore(storeName);

    const existingOrder = await orders.get(
        sessionId,
        { type: "json" }
    );

    if (existingOrder) {
        return existingOrder;
    }

    // Retrieve all products actually purchased
    const purchasedItems = [];

    for await (
        const item of stripe.checkout.sessions.listLineItems(
            sessionId,
            { limit: 100 }
        )
    ) {

        purchasedItems.push({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            unitAmount: item.price?.unit_amount ?? null,
            amountTotal: item.amount_total,
            currency: item.currency
        });
    }

    const shippingDetails =
        session.collected_information?.shipping_details ??
        session.shipping_details ??
        null;

    const order = {

        orderId: session.id,
        createdAt: new Date().toISOString(),

        paymentStatus: session.payment_status,
        checkoutStatus: session.status,

        currency: session.currency || "usd",
        subtotal: session.amount_subtotal,
        total: session.amount_total,

        tax:
            session.total_details?.amount_tax ?? 0,

        shippingCost:
            session.total_details?.amount_shipping ?? 0,

        customer: {
            name:
                session.customer_details?.name ??
                shippingDetails?.name ??
                null,

            email:
                session.customer_details?.email ?? null,

            phone:
                session.customer_details?.phone ?? null
        },

        shipping: {
            name: shippingDetails?.name ?? null,
            address: shippingDetails?.address ?? null
        },

        products: purchasedItems,

        fulfillmentStatus: "unfulfilled",

        environment: session.livemode
            ? "live"
            : "test"
    };

    const result = await orders.setJSON(
        sessionId,
        order,
        { onlyIfNew: true }
    );

    if (result.modified) {

        console.log(
            "Brielle order saved:",
            sessionId
        );

        return order;
    }

    // Another webhook may have saved this order
    return await orders.get(
        sessionId,
        { type: "json" }
    );
}


/*
    Send an order notification to Brielle.

    A separate notification record is stored
    after Resend accepts the email request.

    The Resend Idempotency-Key provides
    additional protection against retries.
*/

async function notifyBrielle(order) {

    const apiKey = Netlify.env.get("RESEND_API_KEY");
    const fromEmail = Netlify.env.get("RESEND_FROM_EMAIL");

    const toEmail =
        Netlify.env.get("ORDER_NOTIFICATION_EMAIL") ||
        "briellebybri@gmail.com";

    if (!apiKey || !fromEmail) {

        console.log(
            "Brielle email notification not configured."
        );

        return;
    }

    const notificationStore = getStore(
        order.environment === "live"
            ? "brielle-email-notifications-live"
            : "brielle-email-notifications-test"
    );

    const notificationId = order.orderId;

    // Check for a previously sent notification
    const existingNotification =
        await notificationStore.get(
            notificationId,
            { type: "json" }
        );

    if (existingNotification) {

        console.log(
            "Brielle notification already recorded:",
            notificationId
        );

        return;
    }

    const itemRows = order.products.map((item) => {

        const description = escapeHtml(
            item.description || "Brielle product"
        );

        const quantity = Number(item.quantity) || 0;

        const total = formatMoney(
            item.amountTotal,
            item.currency || order.currency
        );

        return `
            <tr>
                <td style="padding:10px;border-bottom:1px solid #ddd;">
                    ${description}
                </td>
                <td style="padding:10px;border-bottom:1px solid #ddd;">
                    ${quantity}
                </td>
                <td style="padding:10px;border-bottom:1px solid #ddd;">
                    ${escapeHtml(total)}
                </td>
            </tr>
        `;
    }).join("");

    const address = formatAddress(
        order.shipping?.address
    );

    const html = `
        <div style="
            font-family:Arial,sans-serif;
            color:#38291f;
            max-width:650px;
            margin:auto;
        ">

            <h1 style="
                font-family:Georgia,serif;
                font-weight:normal;
            ">
                BRIELLE
            </h1>

            <p style="letter-spacing:2px;">
                NEW PAID ORDER
            </p>

            <h2>You've received a new order</h2>

            <p>
                <strong>Environment:</strong>
                ${escapeHtml(order.environment)}
            </p>

            <p>
                <strong>Stripe Reference:</strong>
                ${escapeHtml(order.orderId)}
            </p>

            <h3>Customer</h3>

            <p>
                ${escapeHtml(order.customer?.name || "Not provided")}
            </p>

            <p>
                ${escapeHtml(order.customer?.email || "Not provided")}
            </p>

            <p>
                ${escapeHtml(order.customer?.phone || "Not provided")}
            </p>

            <h3>Shipping Address</h3>

            <p style="white-space:pre-line;">
                ${escapeHtml(address)}
            </p>

            <h3>Products Purchased</h3>

            <table style="
                width:100%;
                border-collapse:collapse;
                text-align:left;
            ">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    ${itemRows}
                </tbody>
            </table>

            <p>
                Subtotal:
                ${escapeHtml(formatMoney(order.subtotal, order.currency))}
            </p>

            <p>
                Shipping:
                ${escapeHtml(formatMoney(order.shippingCost, order.currency))}
            </p>

            <p>
                Tax:
                ${escapeHtml(formatMoney(order.tax, order.currency))}
            </p>

            <h2>
                Total Paid:
                ${escapeHtml(formatMoney(order.total, order.currency))}
            </h2>

            <p>
                Fulfillment status: Unfulfilled
            </p>

        </div>
    `;

    const emailPayload = {
        from: fromEmail,
        to: [toEmail],
        subject: `Brielle New ${order.environment === "test" ? "TEST " : ""}Order`,
        html
    };

    const response = await fetch(
        "https://api.resend.com/emails",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",

                // Same key for the same order
                "Idempotency-Key":
                    `brielle-order/${order.orderId}`
            },
            body: JSON.stringify(emailPayload)
        }
    );

    const responseText = await response.text();

    if (!response.ok) {

        console.error(
            "Resend email error:",
            response.status,
            responseText
        );

        throw new Error(
            "Brielle order email could not be sent."
        );
    }

    let result;

    try {
        result = JSON.parse(responseText);
    } catch {
        throw new Error(
            "Resend returned an invalid response."
        );
    }

    // Record that Resend accepted this notification
    await notificationStore.setJSON(
        notificationId,
        {
            orderId: order.orderId,
            emailId: result.id,
            sentAt: new Date().toISOString()
        },
        { onlyIfNew: true }
    );

    console.log(
        "Brielle order email sent:",
        order.orderId
    );
}


/*
    Stripe Webhook Handler

    Verifies the signed request before
    recording or emailing an order.
*/

export default async function handler(request) {

    if (request.method !== "POST") {
        return jsonResponse(
            { error: "Method not allowed." },
            405
        );
    }

    const secretKey =
        Netlify.env.get("STRIPE_SECRET_KEY");

    const webhookSecret =
        Netlify.env.get("STRIPE_WEBHOOK_SECRET");

    if (!secretKey || !webhookSecret) {
        return jsonResponse(
            { error: "Webhook not configured." },
            500
        );
    }

    const signature =
        request.headers.get("stripe-signature");

    if (!signature) {
        return jsonResponse(
            { error: "Missing Stripe signature." },
            400
        );
    }

    const stripe = new Stripe(secretKey);
    let event;

    try {

        const rawBody = await request.text();

        event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            webhookSecret
        );

    } catch (error) {

        console.error(
            "Brielle webhook signature error:",
            error.message
        );

        return jsonResponse(
            { error: "Invalid webhook signature." },
            400
        );
    }

    try {

        switch (event.type) {

            case "checkout.session.completed": {

                const session = event.data.object;

                if (session.payment_status === "paid") {

                    const order = await savePaidOrder(
                        stripe,
                        session.id
                    );

                    if (order) {
                        await notifyBrielle(order);
                    }
                }

                break;
            }

            case "checkout.session.async_payment_succeeded": {

                const order = await savePaidOrder(
                    stripe,
                    event.data.object.id
                );

                if (order) {
                    await notifyBrielle(order);
                }

                break;
            }

            case "checkout.session.async_payment_failed": {

                console.log(
                    "Brielle payment failed:",
                    event.data.object.id
                );

                break;
            }

            default:
                break;
        }

        return jsonResponse({ received: true });

    } catch (error) {

        console.error(
            "Brielle webhook processing error:",
            error
        );

        // Stripe may retry this event
        return jsonResponse(
            { error: "Order processing failed." },
            500
        );
    }
}

export const config = {
    path: "/api/stripe-webhook"
};
