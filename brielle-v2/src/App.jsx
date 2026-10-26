
/*
    BRIELLE SKINCARE WEBSITE

    File: App.jsx
    Author: Brianna Graham

    This file contains the main React component
    responsible for displaying the Brielle website.

    The App component connects the loading screen,
    navigation bar, homepage, and contact section.

    Future implementations will include product pages,
    scent collections, a shopping cart, and 3D animations.
*/


// Import the CSS file used to style the website
import "./App.css";

// Import the introductory loading screen component
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";


/*
    App Component

    This function represents the main Brielle website.

    It organizes the website into sections that
    customers can access using the navigation bar.

    @returns JSX elements that React will render
*/

function App() {

    return (

        // Main container holding the website
        <div className="website">

            {/* Displays the introductory loading screen */}
            <LoadingScreen />


            {/*
                Navigation Bar

                Remains visible at the top of the screen.

                Each link points to a section on the
                homepage using its corresponding ID.
            */}

            <nav className="navbar">

                {/* Brielle logo */}
                <h1 className="logo">BRIELLE</h1>

                {/* Navigation links */}
                <div className="nav-links">

                    <a href="#home">Home</a>

                    <a href="#shop">Shop</a>

                    <a href="#scents">Explore Our Scents</a>

                    <a href="#about">Our Story</a>

                    <a href="#contact">Contact</a>

                </div>

                {/* Shopping bag placeholder */}
                <button className="cart-button" type="button">
                    Bag (0)
                </button>

            </nav>


            {/*
                Main Website Content

                The main element contains the primary
                sections of the Brielle website.
            */}

            <main>

                {/*
                    Homepage Section

                    This will eventually contain the
                    cinematic 3D body crème experience.
                */}

                <Hero />
                {/*
                    Shop Section

                    This section will eventually display
                    Brielle's individual skincare products.
                */}

                <section id="shop" className="content-section">

                    <h2>Our Collection</h2>

                    <p>
                        Discover skincare made with intention.
                    </p>

                </section>


                {/*
                    Scents Section

                    Customers will eventually explore
                    the different fragrances available.
                */}

                <section id="scents" className="content-section">

                    <h2>Explore Our Scents</h2>

                    <p>
                        Find the fragrance that feels like you.
                    </p>

                </section>


                {/*
                    About Section

                    This section will introduce Brielle's
                    story and the inspiration behind the brand.
                */}

                <section id="about" className="content-section">

                    <h2>Our Story</h2>

                    <p>
                        Thoughtfully crafted body care,
                        made in Brooklyn.
                    </p>

                </section>


                {/*
                    Contact Section

                    Provides customers with a way to contact
                    Brielle about products, orders, and questions.

                    The email link opens the customer's
                    default email application.
                */}

                <section id="contact" className="contact-section">

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
                            href="mailto:YOUR_EMAIL@example.com"
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

                <p>© {new Date().getFullYear()} Brielle. All rights reserved.</p>

            </footer>

        </div>

    );

}


// Allows main.jsx to import the App component
export default App;
