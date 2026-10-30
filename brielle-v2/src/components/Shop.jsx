
/*
    BRIELLE SKINCARE WEBSITE

    File: Shop.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's skincare collection.

    Each product card has a button that
    opens the selected product's details.
*/

import { products } from "../data/products";
import "./Shop.css";

function Shop({ onSelectProduct }) {

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
                            {product.sizes.length > 1 ? "From " : ""}
                            ${product.sizes[0].price.toFixed(2)}
                        </p>

                        <button
                            type="button"
                            className="shop-view-button"
                            onClick={() =>
                                onSelectProduct(product.id)
                            }
                        >
                            VIEW PRODUCT
                        </button>

                    </article>

                ))}

            </div>

        </section>
    );
}

export default Shop;
