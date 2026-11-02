
/*
    BRIELLE SKINCARE WEBSITE

    File: ContactForm.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's customer contact form.

    Customers can submit their name, email,
    inquiry category, and message.

    The form sends customer inquiries to Formspree
    and displays a success or error message.
*/

import { useState } from "react";
import "./ContactForm.css";


// Brielle's Formspree endpoint
const FORM_ENDPOINT = "https://formspree.io/f/maeeddvp";


/*
    ContactForm Component

    Manages form submission and provides feedback
    when a customer sends an inquiry.
*/

function ContactForm() {

    // Tracks the status of the submission
    const [status, setStatus] = useState("idle");


    /*
        Handle Form Submission

        Prevents a page refresh and sends
        customer information to Formspree.

        Shows a confirmation only when
        Formspree accepts the submission.
    */

    async function handleSubmit(event) {

        event.preventDefault();

        // Prevent duplicate submissions
        if (status === "sending") {
            return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);

        setStatus("sending");

        try {

            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Unable to send message.");
            }

            // Clear the fields after successful submission
            form.reset();

            // Display the confirmation
            setStatus("success");

        } catch (error) {

            console.error("Brielle contact form error:", error);

            // Allow the customer to try again
            setStatus("error");
        }
    }


    return (
        <section className="brielle-contact">

            {/* Contact page introduction */}
            <div className="brielle-contact-heading">

                <p className="page-eyebrow">
                    BRIELLE CUSTOMER CARE
                </p>

                <h1>Let's Connect.</h1>

                <p>
                    Questions about your order, our products,
                    or finding your perfect scent?
                    We'd love to hear from you.
                </p>

            </div>


            {/*
                Show confirmation after a successful submission.

                Otherwise, display the customer inquiry form.
            */}

            {status === "success" ? (

                <div
                    className="contact-feedback"
                    role="status"
                >

                    <h2>Thank you for reaching out.</h2>

                    <p>
                        Your message has been received.
                        We'll get back to you as soon as possible.
                    </p>

                    <button
                        type="button"
                        onClick={() => setStatus("idle")}
                    >
                        SEND ANOTHER MESSAGE
                    </button>

                </div>

            ) : (

                <form
                    className="brielle-contact-form"
                    onSubmit={handleSubmit}
                >

                    {/* Customer name */}
                    <label htmlFor="contact-name">
                        Your Name
                    </label>

                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Full name"
                        autoComplete="name"
                        required
                    />


                    {/* Customer email */}
                    <label htmlFor="contact-email">
                        Email Address
                    </label>

                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />


                    {/* Inquiry category */}
                    <label htmlFor="contact-topic">
                        What can we help with?
                    </label>

                    <select
                        id="contact-topic"
                        name="topic"
                        defaultValue=""
                        required
                    >

                        <option value="" disabled>
                            Select a topic
                        </option>

                        <option value="Product Question">
                            Product Question
                        </option>

                        <option value="Order Inquiry">
                            Order Inquiry
                        </option>

                        <option value="Fragrance Recommendation">
                            Fragrance Recommendation
                        </option>

                        <option value="Wholesale or Collaboration">
                            Wholesale or Collaboration
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>


                    {/* Customer message */}
                    <label htmlFor="contact-message">
                        Your Message
                    </label>

                    <textarea
                        id="contact-message"
                        name="message"
                        rows={6}
                        placeholder="Tell us how we can help..."
                        required
                    />


                    {/* Submission error */}
                    {status === "error" && (

                        <p
                            className="contact-error"
                            role="alert"
                        >
                            We couldn't send your message.
                            Please try again or email
                            {" "}
                            <a href="mailto:briellebybri@gmail.com">
                                briellebybri@gmail.com
                            </a>.
                        </p>

                    )}


                    {/* Submit customer inquiry */}
                    <button
                        type="submit"
                        disabled={status === "sending"}
                    >
                        {status === "sending"
                            ? "SENDING..."
                            : "SEND MESSAGE"}
                    </button>

                </form>

            )}


            {/* Alternative way to contact Brielle */}
            <p className="contact-direct-email">

                Or email us directly at{" "}

                <a href="mailto:briellebybri@gmail.com">
                    briellebybri@gmail.com
                </a>

            </p>

        </section>
    );
}


// Makes the ContactForm available to App.jsx
export default ContactForm;
