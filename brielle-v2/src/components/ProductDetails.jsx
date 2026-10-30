
/*
    BRIELLE SKINCARE WEBSITE

    File: ProductDetails.jsx
    Author: Brianna Graham

    Description:
    Displays interactive product details for
    every product in Brielle's collection.

    Customers can select available fragrances,
    view product sizes, adjust quantities,
    and see updated prices.

    Future Implementation:
    Connect selected products to the shopping bag.
*/

import { useState } from "react";
import { products } from "../data/products";
import "./ProductDetails.css";


/*
    ProductDetails Component

    Receives the selected product ID from App.jsx.

    React state tracks the customer's selected
    fragrance, size, and quantity.

    @returns JSX elements for the product details
*/

function ProductDetails({ productId = "body-creme" }) {

    // Find the product selected from the Shop section
    const product = products.find(
        (item) => item.id === productId
    );

    // Track the selected fragrance
    const [selectedScent, setSelectedScent] = useState(
        product?.scents?.[0] ?? ""
    );

    // Track the selected size
    const [selectedSize, setSelectedSize] = useState(0);

    // Track the quantity selected
    const [quantity, setQuantity] = useState(1);

    // Avoid displaying a broken page for an invalid product ID
    if (!product) {
        return (
            <section id="product-details" className="product-details">
                <p>Product not found.</p>
            </section>
        );
    }

    // Determine whether the product is the four-tin sampler
    const isSampler = product.id === "sampler";

    // Get the selected product size
    const size = product.sizes[selectedSize] ?? product.sizes[0];

    // Calculate the total before tax and shipping
    const total = size.price * quantity;


    /*
        Decrease Quantity

        Prevents customers from selecting
        fewer than one item.
    */

    function decreaseQuantity() {
        setQuantity((current) => Math.max(1, current - 1));
    }


    /*
        Increase Quantity

        Adds one to the selected quantity.
    */

    function increaseQuantity() {
        setQuantity((current) => current + 1);
    }


    return (
        <section
            id="product-details"
            className="product-details"
        >

            {/* Left side: Product presentation */}
            <div className="details-image">

                <div className="details-image-placeholder">

                    <span>BRIELLE</span>

                    <p>{product.name.toUpperCase()}</p>

                </div>

            </div>


            {/* Right side: Product information */}
            <div className="details-content">

                <p className="details-eyebrow">
                    THE BRIELLE COLLECTION
                </p>

                <h2>{product.name}</h2>

                <p className="details-price">
                    ${total.toFixed(2)}
                </p>

                <p className="details-description">
                    {product.description}
                </p>


                {/*
                    Fragrance Selection

                    Individual products have a scent selector.

                    The four-tin sampler includes all four
                    fragrances, so it doesn't need a dropdown.
                */}

                {!isSampler && (
                    <div className="details-option">

                        <label htmlFor="product-scent">
                            Select Your Scent
                        </label>

                        <select
                            id="product-scent"
                            value={selectedScent}
                            onChange={(event) =>
                                setSelectedScent(event.target.value)
                            }
                        >

                            {product.scents.map((scent) => (

                                <option
                                    key={scent}
                                    value={scent}
                                >
                                    {scent}
                                </option>

                            ))}

                        </select>

                    </div>
                )}


                {/* Display the included sampler fragrances */}
                {isSampler && (
                    <div className="details-option">

                        <p>Included Fragrances</p>

                        <p className="details-description">
                            Golden Vanilla, Lavender Fields,
                            Midnight Ember, and Soft Bloom.
                        </p>

                    </div>
                )}


                {/*
                    Size Selection

                    Displays only the sizes currently
                    available for the selected product.
                */}

                <div className="details-option">

                    <p>Select Your Size</p>

                    <div className="size-options">

                        {product.sizes.map((option, index) => (

                            <button
                                key={option.label}
                                type="button"
                                className={
                                    selectedSize === index
                                        ? "size-button selected"
                                        : "size-button"
                                }
                                aria-pressed={selectedSize === index}
                                onClick={() =>
                                    setSelectedSize(index)
                                }
                            >
                                {option.label}
                            </button>

                        ))}

                    </div>

                </div>


                {/* Quantity selection */}
                <div className="details-option">

                    <p>Quantity</p>

                    <div className="quantity-selector">

                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={quantity === 1}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>{quantity}</span>

                        <button
                            type="button"
                            onClick={increaseQuantity}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                {/* Selected product summary */}
                <p className="details-summary">

                    {quantity} × {product.name}

                    {" · "}

                    {isSampler
                        ? "All Four Scents"
                        : selectedScent}

                    {" · "}

                    {size.label}

                </p>


                {/* Shopping bag functionality will be added later */}
                <button
                    className="details-add-button"
                    type="button"
                    disabled
                >
                    ADD TO BAG — COMING SOON
                </button>

                <p className="details-note">
                    Online purchasing is coming soon.
                </p>

            </div>

        </section>
    );
}


// Makes ProductDetails available to App.jsx
export default ProductDetails;
