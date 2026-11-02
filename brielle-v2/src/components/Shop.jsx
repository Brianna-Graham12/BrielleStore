
/*
    BRIELLE SKINCARE WEBSITE

    File: Shop.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's product collection.

    Each product links to its own page
    using React Router.
*/

import { Link } from "react-router";
import { products } from "../data/products";
import "./Shop.css";


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

                        {/* Temporary product visual */}
                        <div className="product-image">
                            <span className="shop-image-label">
                                BRIELLE
                            </span>
                        </div>

                        <h3>{product.name}</h3>

                        <p className="product-description">
                            {product.description}
                        </p>

                        <p className="product-size">
                            {product.sizes[0].label}
                        </p>

                        <p className="product-price">
                            ${product.sizes[0].price.toFixed(2)}
                        </p>

                        {/* Opens the product's own page */}
                        <Link
                            to={`/shop/${product.id}`}
                            className="shop-view-button"
                        >
                            VIEW PRODUCT
                        </Link>

                    </article>

                ))}

            </div>

        </section>
    );
}

export default Shop;
