
/*
    BRIELLE SKINCARE WEBSITE

    File: App.jsx
    Author: Brianna Graham

    Description:
    This file contains the main React component
    responsible for displaying the Brielle website.

    The App component connects the loading screen,
    navigation bar, homepage, shop, scent collection,
    brand story, contact section, and footer.

    Future implementations will include individual
    product pages, a shopping cart, and checkout.
*/

import "./App.css";

// Import the website components
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Shop from "./components/Shop";


/*
    App Component

    This function organizes the website into sections
    that customers can access through the navigation bar.

    @returns JSX elements that React will render
*/

function App() {

    return (
        <div className="website">

            {/* Displays Brielle's introductory loading screen */}
            <LoadingScreen />

            {/*
                Navigation Bar

                Remains fixed at the top of the website.

                Each link connects to a section using
                its corresponding ID.
            */}

            <nav className="navbar">

                {/* Brielle logo links to the homepage */}
                <a href="#home" className="logo">
                    BRIELLE
                </a>

                {/* Navigation links */}
                <div className="nav-links">

                    <a href="#home">Home</a>

                    <a href="#shop">Shop</a>

                    <a href="#scents">Explore Our Scents</a>

                    <a href="#about">Our Story</a>

                    <a href="#contact">Contact</a>

                </div>

                {/* Shopping bag placeholder */}
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

                Contains all of Brielle's main sections.
            */}

            <main>

                {/*
                    Homepage

                    Displays the main Brielle introduction
                    and featured product presentation.
                */}

                <Hero />


                {/*
                    Shop

                    Displays Brielle's skincare collection
                    with product descriptions and prices.
                */}

                <Shop />


                {/*
                    Scents Section

                    Introduces Brielle's four fragrances.
                    Each scent will eventually have its
                    own product details and imagery.
                */}

                <section
                    id="scents"
                    className="content-section"
                >

                    <h2>Explore Our Scents</h2>

                    <p>
                        Find the fragrance that feels like you.
                    </p>

                </section>


                {/*
                    Our Story

                    Introduces Brielle's brand identity
                    and the inspiration behind the products.
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

                    Provides customers with a way to
                    contact Brielle about products,
                    orders, and general questions.
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

                Displays Brielle's brand information
                at the bottom of the website.
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
