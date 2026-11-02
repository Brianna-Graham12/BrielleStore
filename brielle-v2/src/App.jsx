
/*
    BRIELLE SKINCARE WEBSITE

    File: App.jsx
    Author: Brianna Graham

    Description:
    Manages Brielle's website navigation,
    homepage, product pages, shopping bag,
    Our Story page, contact, and checkout.

    Includes the homepage loading animation.
*/

import { useEffect, useState } from "react";

import {
    Routes,
    Route,
    Link,
    useLocation
} from "react-router";

import { useCart } from "./context/CartContext";

import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Scents from "./components/Scents";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetails";
import ContactForm from "./components/ContactForm";
import ShoppingBag from "./components/ShoppingBag";
import OrderConfirmation from "./components/OrderConfirmation";
import OurStory from "./components/OurStory";

import "./App.css";


/*
    ScrollToTop

    Scrolls to the beginning of a new page,
    or to a specific section when a link
    contains a URL hash.
*/

function ScrollToTop() {

    const location = useLocation();

    useEffect(() => {

        if (location.hash) {

            const sectionId = location.hash.slice(1);

            const timeout = setTimeout(() => {

                const section = document.getElementById(
                    sectionId
                );

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }

            }, 100);

            return () => clearTimeout(timeout);
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, [location.pathname, location.hash]);

    return null;
}


/*
    HomePage

    Displays the homepage and introduces
    Brielle's products and story.
*/

function HomePage() {

    return (
        <main>

            <Hero />

            <section id="scents">
                <Scents />
            </section>

            <section id="about" className="home-about">

                <p className="section-eyebrow">
                    THE BRIELLE STORY
                </p>

                <h2>
                    Skincare Made for Your Everyday Ritual
                </h2>

                <p>
                    Brielle creates thoughtfully crafted
                    body care designed to leave your skin
                    feeling soft, nourished, and
                    beautifully moisturized.
                </p>

                <Link to="/our-story">
                    DISCOVER OUR STORY
                </Link>

            </section>

            <section id="contact" className="home-contact">

                <h2>Let's Stay Connected</h2>

                <p>
                    Have a question about our products?
                    We'd love to hear from you.
                </p>

                <Link to="/contact">
                    GET IN TOUCH
                </Link>

            </section>

        </main>
    );
}


/*
    App

    Displays the site navigation,
    routes, and footer.

    Uses CartContext for the bag count.
*/

function App() {

    const location = useLocation();

    const { cartCount } = useCart();

    // Only show loading once per browser session
    const [showLoading, setShowLoading] = useState(
        () =>
            window.sessionStorage.getItem(
                "brielle-loading-seen"
            ) !== "true"
    );

    function finishLoading() {

        window.sessionStorage.setItem(
            "brielle-loading-seen",
            "true"
        );

        setShowLoading(false);
    }

    const isHomePage = location.pathname === "/";

    return (
        <>

            <ScrollToTop />

            {/* Homepage loading animation */}
            {isHomePage && showLoading && (

                <LoadingScreen
                    onComplete={finishLoading}
                />

            )}


            {/* Main website navigation */}
            <header className="site-header">

                <nav className="navbar">

                    <Link
                        to="/"
                        className="nav-logo"
                        aria-label="Brielle homepage"
                    >
                        BRIELLE
                    </Link>

                    <div className="nav-links">

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/shop">
                            Shop
                        </Link>

                        <Link to="/#scents">
                            Explore Our Scents
                        </Link>

                        <Link to="/our-story">
                            Our Story
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                        <Link
                            to="/bag"
                            className="nav-bag-link"
                            aria-label={
                                `Shopping bag with ${cartCount} items`
                            }
                        >
                            BAG ({cartCount})
                        </Link>

                    </div>

                </nav>

            </header>


            {/* Website routes */}
            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/shop"
                    element={<Shop />}
                />

                <Route
                    path="/shop/:productId"
                    element={<ProductDetails />}
                />

                <Route
                    path="/bag"
                    element={<ShoppingBag />}
                />

                {/*
                    Dedicated editorial Our Story page
                    using Cormorant Infant and Inter.
                */}

                <Route
                    path="/our-story"
                    element={<OurStory />}
                />

                <Route
                    path="/contact"
                    element={
                        <main className="contact-page">
                            <ContactForm />
                        </main>
                    }
                />

                <Route
                    path="/checkout/success"
                    element={<OrderConfirmation />}
                />

                <Route
                    path="*"
                    element={
                        <main className="story-page">

                            <section className="story-content">

                                <h1>Page Not Found</h1>

                                <p>
                                    The page you're looking
                                    for doesn't exist.
                                </p>

                                <Link to="/">
                                    RETURN HOME
                                </Link>

                            </section>

                        </main>
                    }
                />

            </Routes>


            {/* Website footer */}
            <footer className="site-footer">

                <div className="footer-content">

                    <Link to="/">
                        BRIELLE
                    </Link>

                    <p>
                        Thoughtfully crafted body care
                        for your everyday ritual.
                    </p>

                    <div className="footer-links">

                        <Link to="/shop">
                            Shop
                        </Link>

                        <Link to="/our-story">
                            Our Story
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                        <Link to="/bag">
                            Shopping Bag
                        </Link>

                    </div>

                    <p>
                        © {new Date().getFullYear()}
                        {" "}Brielle Skin Ventures LLC.
                    </p>

                </div>

            </footer>

        </>
    );
}

export default App;
