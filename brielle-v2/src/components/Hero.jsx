
/*
    BRIELLE SKINCARE WEBSITE

    File: Hero.jsx
    Author: Brianna Graham

    Description:
    Displays the cinematic homepage introduction
    featuring Brielle's signature Body Crème.

    The hero section introduces the brand and
    provides a link to the product collection.

    Future Implementation:
    Add a 3D product model and scroll animations.
*/


/*
    Hero Component

    Displays the main heading, brand description,
    and featured product area.

    @returns JSX elements for the homepage hero
*/

function Hero() {

    return (

        <section id="home" className="hero">

            {/* Small introductory text */}
            <p className="hero-eyebrow">
                THE ART OF BODY CARE
            </p>

            {/* Main brand heading */}
            <h1 className="hero-title">
                Beyond the Surface
            </h1>

            {/* Description of the Brielle experience */}
            <p className="hero-description">
                Discover a world of indulgent skincare,
                thoughtfully crafted for your daily ritual.
            </p>

            {/* Featured product display */}
            <div className="hero-product">

                <img
                    src="/images/brielle-creme.png"
                    alt="Brielle Body Crème in an amber-brown jar"
                    className="hero-product-image"
                />

            </div>

            {/* Link to the product collection */}
            <a href="#shop" className="hero-button">
                EXPLORE THE COLLECTION →
            </a>

            {/* Encourages visitors to scroll */}
            <p className="hero-scroll">
                SCROLL TO EXPLORE ↓
            </p>

        </section>

    );

}


// Allows App.jsx to import the hero component
export default Hero;
