
/*
    BRIELLE SKINCARE WEBSITE

    File: App.jsx
    Author: Brianna Graham

    Description:
    This file contains the main React component
    responsible for displaying the Brielle website.

    The App component connects the loading screen,
    navigation bar, homepage, product collection,
    product details, scent collection, brand story,
    contact section, and footer.
*/

import { useState } from "react";

import "./App.css";

// Import the website components
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetails";
import Scents from "./components/Scents";


/*
    App Component

    Organizes the website and manages which
    product is currently selected.

    @returns JSX elements that React will render
*/

function App() {

    /*
        Selected Product State

        Stores the ID of the product currently
        selected by the customer.

        Body Crème is displayed by default.
    */

    const [selectedProductId, setSelectedProductId] =
        useState("body-creme");


    /*
        Handle Product Selection

        Called whenever a customer clicks
        VIEW PRODUCT inside the Shop section.

        Updates the selected product and scrolls
        the customer to its details.
    */

    function handleSelectProduct(productId) {

        // Update the currently selected product
        setSelectedProductId(productId);

        // Scroll to the product details section
        document
            .getElementById("product-details")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    }


    return (
        <div className="website">

            {/* Introductory loading screen */}
            <LoadingScreen />


            {/*
                Navigation Bar

                Provides links to the main
                sections of the website.
            */}

            <nav className="navbar">

                <a href="#home" className="logo">
                    BRIELLE
                </a>

                <div className="nav-links">

                    <a href="#home">Home</a>

                    <a href="#shop">Shop</a>

                    <a href="#scents">Explore Our Scents</a>

                    <a href="#about">Our Story</a>

                    <a href="#contact">Contact</a>

                </div>

                {/* Shopping bag will be implemented later */}
                <button
                    className="cart-button"
                    type="button"
                    disabled
                >
                    Bag (0)
                </button>

            </nav>


            {/*
                Main Website Content
            */}

            <main>

                {/* Homepage */}
                <Hero />


                {/*
                    Shop Section

                    Sends the selected product ID
                    back to the App component.
                */}

                <Shop
                    onSelectProduct={handleSelectProduct}
                />


                {/*
                    Product Details

                    Displays the product selected
                    inside the Shop section.

                    The key resets product selections
                    when switching between products.
                */}

                <ProductDetails
                    key={selectedProductId}
                    productId={selectedProductId}
                />


                {/* Signature fragrance collection */}
                <Scents />


                {/*
                    Our Story

                    Introduces Brielle and its
                    approach to body care.
                */}

                <section
                    id="about"
                    className="content-section"
                >

                    <h2>Our Story</h2>

                    <p>
                        Thoughtfully crafted body care,
                        made in Brooklyn.
                    </p>

                </section>


                {/*
                    Contact Section

                    Allows customers to contact
                    Brielle through email.
                */}

                <section
                    id="contact"
                    className="contact-section"
                >

                    <div className="contact-content">

                        <p className="contact-subtitle">
                            WE WOULD LOVE TO HEAR FROM YOU
                        </p>

                        <h2>Let's Connect.</h2>

                        <p className="contact-description">
                            Have a question about your order,
                            our products, or finding your
                            perfect scent? We're here to help.
                        </p>

                        <a
                            href="mailto:briellebybri@gmail.com"
                            className="contact-button"
                        >
                            GET IN TOUCH →
                        </a>

                    </div>

                </section>

            </main>


            {/*
                Footer

                Displays Brielle's brand information.
            */}

            <footer className="footer">

                <p>BRIELLE</p>

                <p>Made with care in Brooklyn, NY.</p>

                <p>
                    © {new Date().getFullYear()} Brielle.
                    All rights reserved.
                </p>

            </footer>

        </div>
    );
}


// Allows main.jsx to import the App component
export default App;
