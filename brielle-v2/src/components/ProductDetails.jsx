
/*
    BRIELLE SKINCARE WEBSITE

    File: ProductDetails.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's individual product pages.

    Allows customers to select a fragrance,
    size, and quantity before adding an item
    to their shopping bag.

    The shopping bag manages Stripe Checkout.
*/

import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

import "./ProductDetails.css";


function ProductDetails() {

    // Get the product ID from the URL
    const { productId } = useParams();

    // Navigate between website pages
    const navigate = useNavigate();

    // Access Brielle's shared shopping bag
    const { addToCart } = useCart();

    // Find the selected product
    const product = products.find(
        (item) => item.id === productId
    );

    // Track the selected fragrance
    const [selectedScent, setSelectedScent] = useState(
        product?.scents?.[0] ?? ""
    );

    // Track the selected product size
    const [selectedSize, setSelectedSize] = useState(0);

    // Track the quantity
    const [quantity, setQuantity] = useState(1);


    /*
        Reset customer selections when they
        navigate to a different product.
    */

    useEffect(() => {

        setSelectedScent(
            product?.scents?.[0] ?? ""
        );

        setSelectedSize(0);

        setQuantity(1);

    }, [productId, product]);


    // Display a message if the product doesn't exist
    if (!product) {

        return (
            <section className="product-details">

                <div className="details-content">

                    <h2>Product Not Found</h2>

                    <p>
                        We couldn't find that Brielle product.
                    </p>

                    <Link
                        to="/shop"
                        className="details-back"
                    >
                        Return to Shop
                    </Link>

                </div>

            </section>
        );
    }


    // The sampler includes all four fragrances
    const isSampler = product.id === "sampler";

    // Find the selected product size
    const size =
        product.sizes[selectedSize] ??
        product.sizes[0];

    // Calculate the displayed total
    const total = size.price * quantity;


    /*
        Decrease Quantity

        Customers must select at least one item.
    */

    function decreaseQuantity() {

        setQuantity((current) =>
            Math.max(1, current - 1)
        );

    }


    /*
        Increase Quantity

        Maximum of 10 per product selection.
    */

    function increaseQuantity() {

        setQuantity((current) =>
            Math.min(10, current + 1)
        );

    }


    /*
        Add To Bag

        Saves the customer's selected product
        in the shared CartContext.

        Navigates to the shopping bag page
        without opening Stripe immediately.
    */

    function handleAddToBag() {

        addToCart(
            product,
            isSampler ? null : selectedScent,
            size,
            quantity
        );

        navigate("/bag");

    }


    return (

        <section className="product-details">

            {/* Product presentation */}
            <div className="details-image">

                <div className="details-image-placeholder">

                    <span>BRIELLE</span>

                    <p>
                        {product.name.toUpperCase()}
                    </p>

                </div>

            </div>


            {/* Product information and selections */}
            <div className="details-content">

                <Link
                    to="/shop"
                    className="details-back"
                >
                    ← Back to Collection
                </Link>


                <p className="details-eyebrow">
                    THE BRIELLE COLLECTION
                </p>


                {/* Product name */}
                <h2>{product.name}</h2>


                {/* Product total */}
                <p className="details-price">
                    ${total.toFixed(2)}
                </p>


                {/* Product description */}
                <p className="details-description">
                    {product.description}
                </p>


                {/*
                    Fragrance Selection

                    Individual body care products have
                    fragrance options.

                    The four-tin sampler includes
                    all fragrances automatically.
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
                                setSelectedScent(
                                    event.target.value
                                )
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


                {/* Four-Tin Sampler fragrances */}
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
                    Product Size Selection

                    Sizes and prices are read from
                    the existing products.js file.
                */}

                <div className="details-option">

                    <p>Size</p>

                    <div className="size-options">

                        {product.sizes.map(
                            (option, index) => (

                                <button
                                    key={option.label}
                                    type="button"
                                    className={
                                        selectedSize === index
                                            ? "size-button selected"
                                            : "size-button"
                                    }
                                    aria-pressed={
                                        selectedSize === index
                                    }
                                    onClick={() =>
                                        setSelectedSize(index)
                                    }
                                >
                                    {option.label}
                                </button>

                            )
                        )}

                    </div>

                </div>


                {/* Quantity selection */}
                <div className="details-option">

                    <p>Quantity</p>

                    <div className="quantity-selector">

                        {/* Decrease quantity */}
                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={quantity === 1}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        {/* Display selected quantity */}
                        <span>{quantity}</span>


                        {/* Increase quantity */}
                        <button
                            type="button"
                            onClick={increaseQuantity}
                            disabled={quantity === 10}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                {/* Summary of customer selections */}
                <p className="details-summary">

                    {quantity} × {product.name}

                    {" · "}

                    {isSampler
                        ? "All Four Scents"
                        : selectedScent}

                    {" · "}

                    {size.label}

                </p>


                {/*
                    Add To Bag Button

                    Adds the selected product
                    to Brielle's shopping bag.
                */}

                <button
                    className="details-add-button"
                    type="button"
                    onClick={handleAddToBag}
                >
                    ADD TO BAG
                </button>


                {/* Continue shopping link */}
                <p className="details-note">
                    Your selections will be saved
                    in your shopping bag.
                </p>

                <Link
                    to="/bag"
                    className="details-back"
                >
                    VIEW SHOPPING BAG
                </Link>

            </div>

        </section>

    );
}


// Export the component to App.jsx
export default ProductDetails;
