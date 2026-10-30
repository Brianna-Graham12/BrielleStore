
/*
    BRIELLE SKINCARE WEBSITE

    File: Shop.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's skincare collection using
    reusable product information and product cards.

    Customers can view product names, sizes,
    descriptions, and prices.

    Future Implementation:
    Product pages, scent selection, and checkout.
*/

import "./Shop.css";


// Stores the products displayed in the shop
const products = [
    {
        id: 1,
        name: "Body Crème",
        size: "8 oz",
        price: 25,
        description: "Rich, indulgent moisture.",
        image: "/images/body-creme.jpg"
    },
    {
        id: 2,
        name: "Body Lotion",
        size: "8 oz",
        price: 22,
        description: "Lightweight everyday hydration.",
        image: "/images/body-lotion.jpg"
    },
    {
        id: 3,
        name: "Hand Cream",
        size: "3 oz",
        price: 15,
        description: "Silky care for your hands.",
        image: "/images/hand-cream.jpg"
    },
    {
        id: 4,
        name: "Discovery Set",
        size: "4 tins",
        price: 38,
        description: "Discover your signature scent.",
        image: "/images/discovery-set.jpg"
    }
];


/*
    Shop Component

    Uses the map function to display each
    product from the products array.

    @returns JSX elements for the shop
*/

function Shop() {

    return (
        <section id="shop" className="shop-section">

            <p className="shop-eyebrow">
                THE BRIELLE COLLECTION
            </p>

            <h2>Our Essentials</h2>

            <p className="shop-intro">
                Everyday care, made extraordinary.
            </p>

            <div className="shop-grid">

                {products.map((product) => (

                    <article
                        key={product.id}
                        className="product-card"
                    >

                        <div className="product-image">
                            <img
                                src={product.image}
                                alt={product.name}
                                onError={(event) => {
                                    event.currentTarget.style.display =
                                        "none";
                                }}
                            />
                        </div>

                        <h3>{product.name}</h3>

                        <p className="product-description">
                            {product.description}
                        </p>

                        <p className="product-size">
                            {product.size}
                        </p>

                        <p className="product-price">
                            ${product.price.toFixed(2)}
                        </p>

                        <span className="product-status">
                            DETAILS COMING SOON
                        </span>

                    </article>

                ))}

            </div>

        </section>
    );
}

export default Shop;
